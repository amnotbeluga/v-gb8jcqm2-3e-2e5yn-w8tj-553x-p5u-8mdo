// server.mjs

import "dotenv/config";
import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ---------------- ENV CONFIG ----------------

const RPC_URL = process.env.RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PORT = process.env.PORT || 4000;
const API_KEY = (process.env.API_KEY || "").toString().trim();
const CONTRACT_ADDRESS = (process.env.CONTRACT_ADDRESS || "").toString().trim();

if (!RPC_URL || !PRIVATE_KEY) {
  console.error("❌ Missing RPC_URL or PRIVATE_KEY in .env");
  process.exit(1);
}

if (!CONTRACT_ADDRESS) {
  console.error("❌ Missing CONTRACT_ADDRESS in .env");
  console.error("   -> Run deploy script, then paste the printed address into CONTRACT_ADDRESS");
  process.exit(1);
}

if (!API_KEY) {
  console.warn("⚠️ No API_KEY set in .env – admin routes will reject all calls");
}

// ---------------- PATH HELPERS ----------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- ABI FROM ARTIFACTS ----------------

const artifactPath = path.join(
  __dirname,
  "artifacts",
  "contracts",
  "TourismGuide.sol",
  "TourismGuide.json"
);

let contractAbi;

try {
  const artifactRaw = fs.readFileSync(artifactPath, "utf8");
  const artifactJson = JSON.parse(artifactRaw);
  contractAbi = artifactJson.abi;
  console.log("📘 Loaded ABI from:", artifactPath);
} catch (err) {
  console.error("❌ Could not load ABI from artifacts. Did you run `npx hardhat compile`?");
  console.error(err);
  process.exit(1);
}

// ---------------- ETHERS SETUP ----------------

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
console.log("👤 Admin signer address:", wallet.address);

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, wallet);
console.log("📦 Using contract address:", CONTRACT_ADDRESS);

// Helper to hash IDs consistently
function guideHash(guideId) {
  return ethers.keccak256(ethers.toUtf8Bytes(`guide-${guideId}`));
}

function userHash(userId) {
  return ethers.keccak256(ethers.toUtf8Bytes(`user-${userId}`));
}

// ---------------- EXPRESS APP ----------------

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// API key middleware for admin routes
function requireApiKey(req, res, next) {
  const headerKey = (req.headers["x-api-key"] || "").toString().trim();

  if (!API_KEY) {
    return res
      .status(500)
      .json({ error: "API key not configured on server (missing API_KEY in .env)" });
  }

  if (!headerKey || headerKey !== API_KEY) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  next();
}

// ---------------- ROUTES ----------------

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Tourism blockchain API running",
    contract: CONTRACT_ADDRESS,
  });
});

// Get owner (public)
app.get("/owner", async (req, res) => {
  try {
    const owner = await contract.owner();
    res.json({ owner, contract: CONTRACT_ADDRESS });
  } catch (err) {
    console.error("Error /owner:", err);
    res.status(500).json({ error: err.message });
  }
});

// Verify / unverify guide (admin)
app.post("/admin/guides/verify", requireApiKey, async (req, res) => {
  try {
    const body = req.body || {};
    const { guideId, isVerified, metadataURI } = body;

    if (guideId === undefined || guideId === null || guideId === "") {
      return res.status(400).json({ error: "guideId is required" });
    }

    const gh = guideHash(guideId.toString());
    const verifiedFlag = !!isVerified;
    const meta = metadataURI || "";

    const tx = await contract.setGuide(gh, verifiedFlag, meta);
    const receipt = await tx.wait();

    res.json({
      success: true,
      guideId,
      isVerified: verifiedFlag,
      txHash: receipt.hash ?? receipt.transactionHash ?? tx.hash,
    });
  } catch (err) {
    console.error("Error /admin/guides/verify:", err);
    res.status(500).json({ error: err.reason || err.message });
  }
});

// Check guide status (public)
app.get("/guides/:id", async (req, res) => {
  try {
    const guideId = req.params.id;
    const gh = guideHash(guideId.toString());
    const verified = await contract.isGuideVerified(gh);

    res.json({ guideId, verified });
  } catch (err) {
    console.error("Error /guides/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create booking (admin)
app.post("/orders", requireApiKey, async (req, res) => {
  try {
    const body = req.body || {};
    const { orderId, userId, guideId, amount, currency, paymentRef } = body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }
    if (userId === undefined || userId === null || userId === "") {
      return res.status(400).json({ error: "userId is required" });
    }
    if (guideId === undefined || guideId === null || guideId === "") {
      return res.status(400).json({ error: "guideId is required" });
    }
    if (amount === undefined || amount === null || amount === "") {
      return res.status(400).json({ error: "amount is required" });
    }

    const gh = guideHash(guideId.toString());
    const uh = userHash(userId.toString());
    const amt = BigInt(amount);
    const curr = currency || "INR";
    const ref = paymentRef || "";

    const tx = await contract.recordBooking(
      orderId.toString(),
      gh,
      uh,
      amt,
      curr,
      ref
    );
    const receipt = await tx.wait();

    res.json({
      success: true,
      orderId,
      txHash: receipt.hash ?? receipt.transactionHash ?? tx.hash,
    });
  } catch (err) {
    console.error("Error /orders (POST):", err);
    res.status(500).json({ error: err.reason || err.message });
  }
});

// Get booking (public)
app.get("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const key = ethers.keccak256(ethers.toUtf8Bytes(orderId.toString()));

    const booking = await contract.bookings(key);

    const [
      exists,
      guideHashValue,
      userHashValue,
      amount,
      currency,
      offchainRef,
      timestamp,
    ] = booking;

    if (!exists) {
      return res.status(404).json({ error: "Booking not found on-chain" });
    }

    res.json({
      orderId,
      exists,
      guideHash: guideHashValue,
      userHash: userHashValue,
      amount: amount.toString(),
      currency,
      paymentRef: offchainRef,
      timestamp: Number(timestamp),
    });
  } catch (err) {
    console.error("Error /orders/:id (GET):", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
  console.log(`🚀 API server listening on http://localhost:${PORT}`);
});
