const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/productModel.js');
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL)
  .then(async () => {
    console.log("Connected to MongoDB for seeding products");})
  .catch((err) => console.log(err));

  const demoProducts = [
  {
      name: 'Tribal Wooden Mask',
      description: 'Hand-carved wooden mask by local artisans',
      price: 1200,
      image: 'https://i.ytimg.com/vi/JP9uwwND1WM/maxresdefault.jpg',
      category: 'handicraft',
      verified: true,
    },
    {
      name: 'Dokra Art Piece',
      description: 'Traditional metal casting craft from Jharkhand',
      price: 2500,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_KgfFzm0lkoD2p7lKhmNXFucXwPBUri8Ng&s',
      category: 'handicraft',
      verified: true,
    },
    {
      name: 'Tribal Homestay Experience',
      description: '2-night stay with a local tribal family',
      price: 3500,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBpXXjSf9YgqiaS_ymJa3QLTzbnhBoRitILA&s',
      category: 'homestay',
      verified: true,
    },
    {
      name: 'Sohrai Painting',
      description: 'Traditional wall art from Hazaribagh region',
      price: 1800,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrU1F56d1m5p6jyxHIIE3GYAkuEvTa9kFd6w&s',
      category: 'handicraft',
      verified: false,
    },
    {
      name: 'Sarhul Festival Tour',
      description: 'Experience the spring festival celebration',
      price: 2000,
      image: 'https://www.newsbharati.com/Encyc/2018/3/21/2_03_34_38_Sarhul-Festival_1_H@@IGHT_435_W@@IDTH_800.jpg',
      category: 'event',
      verified: true,
    },
    {
      name: 'Bamboo Handicraft',
      description: 'Eco-friendly bamboo products made by local artisans',
      price: 800,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0TN-k2p6ToEoyRB5e8tFG_kSe8jV4uqGJ-Q&s',
      category: 'handicraft',
      verified: true,
    },
];

const seed = async () => {
  await Product.deleteMany();
  await Product.insertMany(demoProducts);
  console.log("Products inserted!");
  process.exit();
};

seed();