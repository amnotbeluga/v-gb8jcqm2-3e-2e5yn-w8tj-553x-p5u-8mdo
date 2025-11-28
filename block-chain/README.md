# SIH-2025-The-Team-Ananta
AI Powered Digital Tourism Platform
---

## 📌 Blockchain Tourism – Full Project Setup Guide

A complete end-to-end blockchain-based tourism guide dApp built using **Hardhat**, **Node.js (Express server)**, and a **frontend (HTML/JS)**.
This README includes **installation steps**, **dependencies**, **environment setup**, **deployment commands**, and **running instructions**.

---

# 🚀 Features

* Smart contract deployed on local Hardhat blockchain
* Node.js backend API for interacting with the contract
* Admin-protected API routes using API_KEY
* Simple frontend to call the backend functions
* Fully local development setup

---

# 📁 Folder Structure

```
root/
 ├── contracts/
 │    └── TourismGuide.sol
 ├── scripts/
 │    └── deploy.ts
 ├── server.mjs
 ├── frontend/
 │    ├── index.html
 │    ├── app.js
 ├── .env
 ├── package.json
 ├── hardhat.config.js / ts
```

---

# 📦 Dependencies (All Listed—No “etc.”)

### **Backend**

* express
* dotenv
* ethers
* cors

### **Hardhat**

* hardhat
* @nomicfoundation/hardhat-toolbox
* @nomiclabs/hardhat-ethers
* typescript
* ts-node

### **Frontend**

* axios
* ethers (CDN)

---

# 🔧 Installation Steps

### 1️⃣ Install Node.js (LTS recommended)

### 2️⃣ Install project dependencies

```sh
npm install express cors dotenv ethers
```

### 3️⃣ Install Hardhat dependencies

```sh
npm install --save-dev hardhat typescript ts-node @nomicfoundation/hardhat-ethers @nomicfoundation/hardhat-toolbox @types/node @types/express @types/cors
```

---

# 🛠️ Hardhat – Local Blockchain Setup

### Start local Hardhat blockchain:
compile only for first setup
```sh
npx hardhat compile
npx hardhat node
```

Keep this terminal **running**.

### Deploy the smart contract:

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

This will output a deployed contract address.

---

# 🔐 Environment Variables (.env)

Use **exactly this block**

```
# RPC URL for local Hardhat node
RPC_URL=http://127.0.0.1:8545

# Private key of Account #0 from "npx hardhat node"
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

API_KEY=5GeCm669i4HxVnGN96D6smr8C5um5qfV5z7opKME

# API server port
PORT=4000

CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

---

# ▶️ Start Backend Server

```sh
node server.mjs
```

The API will run at:

```
http://localhost:4000
```

---

# 🌐 Frontend Setup

Open the frontend by:

simply open `index.html` in the browser.

---

# 🧪 Testing API (Example)

### Add Transaction (admin protected)
    POST https://example.com/orders
### Verify/Unverify Guides (admin protected)
    POST https://example.com/guide/:id
### Fetch Transcations
    GET https://example.com/orders/:id
### Fetch Guide Status
    GET https://example.com/guide/:id

---
