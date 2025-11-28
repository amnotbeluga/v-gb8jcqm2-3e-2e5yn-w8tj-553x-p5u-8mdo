const mongoose = require("mongoose");
const Culture = require("./models/cultureModel");
const dotenv = require('dotenv');

dotenv.config();

async function seedCultures() {
  try {
    const mongoURL = process.env.MONGO_URL;
    await mongoose.connect(mongoURL);

    console.log("🌱 Connected to MongoDB for seeding cultures");

    // 1. Remove old data (optional)
    await Culture.deleteMany({});
    console.log("🧹 Old cultures cleared");

    // 2. New cultures insert
    const cultures = await Culture.insertMany([
      {
        id: 1,
        name: "Santhal Community",
        description:
          "The Santhal are one of the largest tribal communities in Jharkhand, known for their vibrant festivals, traditional dances like the Santhali dance, and unique customs.",
        image:
          "https://th-thumbnailer.cdn-si-edu.com/b2oWqzrJ8sOOZihxTaM5ap7idkA=/fit-in/1072x0/https://tf-cmsv2-photocontest-smithsonianmag-prod-approved.s3.amazonaws.com/bd03f374-ce76-4477-922b-c970e034cea1.jpg",
        wekia: "https://en.wikipedia.org/wiki/Santal_people",
        category: "Tribal Culture",
      },
      {
        id: 2,
        name: "Munda Community",
        description:
          "The Munda tribe has a rich cultural heritage with traditional music, dance forms like the Munda dance, and festivals such as Mage Parab that celebrate their connection to nature.",
        image:
          "https://mundariversity.com/wp-content/uploads/2025/03/6035572bd61c39300c308878_12pcKEBGASNEER7lsebTXQvNQg54yRRFv521zg4BIBj0ZDbUgwRwxORYxlAxcvHgE4Mo_qgR8RnfSYe3N18JYAOwloy-U_0jsR0fGYPIAVoTvwH7RA2dhA7bUL9jvBKWjdcpCJrS-1-1024x576.jpeg",
        wekia: "https://en.wikipedia.org/wiki/Munda_people",
        category: "Tribal Culture",
      },
      {
        id: 3,
        name: "Oraon Community",
        description:
          "The Oraon tribe is known for their traditional dances, music, and festivals like Sarhul that celebrate nature and community.",
        image:
          "https://3.bp.blogspot.com/-gTGeW60HYig/WQQWC11jQfI/AAAAAAAAACM/t59SfkYMx_w293bIdxa3_9Enna4cNMdDwCLcB/w1200-h630-p-k-no-nu/Oraon%2BCommunity%2B%25282%2529.jpg",
        wekia: "https://en.wikipedia.org/wiki/Oraon_people",
        category: "Tribal Culture",
      },
      {
        id: 4,
        name: "Chhau Dance",
        description:
          "The Chhau dance is a traditional dance form of Jharkhand that combines martial arts, storytelling, and vibrant costumes.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chhau_Nritya_%281%29.jpg/1920px-Chhau_Nritya_%281%29.jpg",
        wekia: "https://en.wikipedia.org/wiki/Chhau_dance",
        category: "Folk Dance",
      },
      {
        id: 5,
        name: "Jharkhand Cuisine",
        description:
          "Jharkhand cuisine features traditional dishes like Litti Chokha, Dhuska, and Thekua, reflecting the region's agricultural heritage.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQunAjeSCuPzGDDU4MOs2CutdkdWrDCna3lfg&s",
        wekia: "https://en.wikipedia.org/wiki/Jharkhandi_cuisine",
        category: "Cuisine",
      },
      {
        id: 6,
        name: "Paika Dance",
        description:
          "Paika dance is a traditional martial dance form of Jharkhand, performed by the Paika community.",
        image:
          "https://i.pinimg.com/736x/2d/af/0b/2daf0bba6b5bbb7be02f19d09986e423.jpg",
        wekia: "https://en.wikipedia.org/wiki/Paika_dance",
        category: "Folk Dance",
      },
    ]);

    console.log("✅ Cultures inserted successfully");

    // 3. Finish
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedCultures();
