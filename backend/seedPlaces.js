// seed.js
const mongoose = require("mongoose");
const Place = require("./models/placeModel");
const dotenv = require('dotenv');
 dotenv.config();
async function seed() {
 try {
 const mongoURL = process.env.MONGO_URL;
 await mongoose.connect(mongoURL)
     console.log("Connected to MongoDB for seeding places")
    console.log("✅ MongoDB connected");

    // 2. Purane places clean (optional)
    await Place.deleteMany({});
    console.log("🧹 Old places cleared");

    // 3. Naye places insert karo (with images + videos placeholders)
    const places = await Place.insertMany([
      {
        name: "Netarhat",
        description:
          "Netarhat is known as the Queen of Chotanagpur, famous for sunrise and sunset views. Surrounded by dense forests, it offers peaceful nature views and clean air.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiCPzrKKzQigpZhGKMqW2p2Uh6dUomJy71A&s",
        image1:
          "https://live.staticflickr.com/65535/49103421641_2ccea275d7_b.jpg",
        image2:
          "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/08/9ffc869f0419cc62a4e18896dc9b388b_1000x1000.jpg",
        image3:
          "https://i.redd.it/v7myyec9ja7b1.jpg",
        image4:
          "https://1.bp.blogspot.com/-2nwsInI_Kck/YOdDnyb7T9I/AAAAAAAACjw/dNoffJJhCa4GyM-8Ejc7cdhqlTsuZcDDwCLcBGAsYHQ/s1080/Ram_s%2BInstagram%2Bphoto_%2B_Biggest%2Bwater%2Bfalls%2Bin%2BJharkhand%2B_%2BLodh%2Bwater%2BFalls.__CIf23BrHEaE%2528JPG%2529.jpg",
        // Demo YouTube URLs – tum baad me apne real vlog/shorts daal sakte ho
        video1: "https://www.youtube.com/watch?v=5RJNr-YsEBs",
        video2: "https://www.youtube.com/watch?v=NwrqCPpYFio",
        category: "Hill Station",
        location: "Netarhat, Jharkhand",
        bestTimeToVisit: "October to March",
        about: "Netarhat is known for its cool climate, pine-covered hills, and breathtaking sunrise and sunset points. Surrounded by dense forests, it offers peaceful nature views and clean air. The calm environment makes it a perfect hill station for relaxation. Popular spots include the Sunrise Point, Sunset Point, and Lodh Falls. Visitors can also explore nearby attractions like the Betla National Park and the Upper Ghaghri Falls. Netarhat is ideal for trekking, nature walks, and photography.",
        readmore: "https://en.wikipedia.org/wiki/Netarhat",
        arembed: "<iframe src=\"https://www.google.com/maps/embed?pb=!4v1763786274191!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHE3ZWUxVUE.!2m2!1d23.48685016379272!2d84.27738783926442!3f264.0868827957266!4f1.9208946111411649!5f0.7820865974627469\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        nearbyPlaces: [],
      },
      {
        name: "Patratu Valley",
        description: "A scenic valley with winding roads and breathtaking views. It is a haven for nature lovers and adventure enthusiasts.",
        image:
          "https://img.freepik.com/premium-photo/patratu-valley-ranchi-beautiful-place-jharkhand_459244-239.jpg",
        image1:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4gh9yrRHWQmUT2fZZZ7Xcw37EeIOZH4zzcA&s",
        image2:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4gh9yrRHWQmUT2fZZZ7Xcw37EeIOZH4zzcA&s",
        image3:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4gh9yrRHWQmUT2fZZZ7Xcw37EeIOZH4zzcA&s",
        image4:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4gh9yrRHWQmUT2fZZZ7Xcw37EeIOZH4zzcA&s",
        video1: "https://www.youtube.com/watch?v=Lxb4lwTqjBQ",
        video2: "https://www.youtube.com/watch?v=EvK0M01whno",
        category: "Valley",
        location: "Patratu, Jharkhand",
        bestTimeToVisit: "September to February",
        about: "Patratu Valley is renowned for its picturesque landscapes, winding roads, and stunning views of the surrounding hills. The valley is a haven for nature lovers and adventure enthusiasts, offering opportunities for trekking, photography, and exploring the serene environment. The lush greenery and tranquil atmosphere make it an ideal destination for those looking to escape the hustle and bustle of city life. Visitors can also enjoy local cuisine and experience the culture of the nearby villages.",
        readmore: "https://en.wikipedia.org/wiki/Patratu",
        arembed:"<iframe src=\"https://www.google.com/maps/embed?pb=!4v1763639811929!6m8!1m7!1sZapLruriFj2to0MqaJf3jQ!2m2!1d23.57553605075096!2d85.27428164299113!3f265.5649793747999!4f1.7036746297907825!5f0.7820865974627469\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        nearbyPlaces: [],
      },
      {
        name: "Betla National Park",
        description: "Home to tigers, elephants and rich wildlife. Offers jeep safaris and nature walks. Also has historical sites like Betla Fort.",
        image:
          "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2025/07/23111157/In-Which-State-is-Betla-National-Park-Located.png",
        image1:
          "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2025/07/23111157/In-Which-State-is-Betla-National-Park-Located.png",
        image2:
          "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2025/07/23111157/In-Which-State-is-Betla-National-Park-Located.png",
        image3:
          "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2025/07/23111157/In-Which-State-is-Betla-National-Park-Located.png",
        image4:
          "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2025/07/23111157/In-Which-State-is-Betla-National-Park-Located.png",
        video1: "https://www.youtube.com/watch?v=2mxYKgPVqAY",
        video2: "https://www.youtube.com/watch?v=n_BQ9XcUGgM",
        category: "National Park",
        location: "Betla, Jharkhand",
        bestTimeToVisit: "November to February",
        about: "Betla National Park is a prominent wildlife sanctuary located in Jharkhand, India. It is part of the Palamu Tiger Reserve and is known for its rich biodiversity, including Bengal tigers, elephants, leopards, and various bird species. The park features dense forests, grasslands, and rocky terrains, providing a natural habitat for its diverse fauna. Visitors can enjoy jeep safaris, nature walks, and bird watching while exploring the park's scenic beauty. Betla National Park is also home to historical sites like the Betla Fort and ancient caves, adding cultural significance to its natural allure.",
        readmore:"https://en.wikipedia.org/wiki/Betla_National_Park",
        arembed:"<iframe src=\"https://www.google.com/maps/embed?pb=!4v1763637628356!6m8!1m7!1s0jJHFRsZKgF06uUtKUes4w!2m2!1d23.8856697847423!2d84.19286665999137!3f195.30879573652027!4f-3.1350743945799593!5f0.7820865974627469\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        nearbyPlaces: [],
      },
      {
        name: "Hundru Falls",
        description:
          "One of the highest waterfalls in Jharkhand, dropping 98 meters. A popular picnic spot surrounded by rocky terrain and greenery.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPIpeKYb0D96CQxBI_auqrPleye1fbN5yMw&s",
        image1:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPIpeKYb0D96CQxBI_auqrPleye1fbN5yMw&s",
        image2:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPIpeKYb0D96CQxBI_auqrPleye1fbN5yMw&s",
        image3:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPIpeKYb0D96CQxBI_auqrPleye1fbN5yMw&s",
        image4:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPIpeKYb0D96CQxBI_auqrPleye1fbN5yMw&s",
        video1: "https://www.youtube.com/watch?v=3mlJVTxIYBw",
        video2: "https://www.youtube.com/watch?v=32FEVhBFq38",
        category: "Waterfall",
        location: "Ranchi, Jharkhand",
        bestTimeToVisit: "June to October",
        about: "Hundru Falls is one of the highest waterfalls in Jharkhand, India, with a majestic drop of 98 meters. Located near Ranchi, it is formed by the Subarnarekha River and is a popular destination for nature lovers and adventure enthusiasts. The falls are surrounded by lush greenery and rocky terrain, creating a picturesque setting. Visitors can enjoy trekking to the base of the falls, picnicking, and photography. The best time to visit Hundru Falls is during the monsoon season when the water flow is at its peak, offering a spectacular view.",
        readmore: "https://en.wikipedia.org/wiki/Hundru_Falls",
        arembed:"<iframe src=\"https://www.google.com/maps/embed?pb=!4v1763640970709!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRHlqczJMeGdF!2m2!1d23.45053148881071!2d85.66807062854642!3f270.60558488041096!4f7.201672999379667!5f0.7820865974627469\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        nearbyPlaces: [],
      },
      {
        name: "Deoghar",
        description:
          "Famous for Baidyanath Temple, one of the 12 Jyotirlingas. A major pilgrimage site attracting millions of devotees annually.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgGAjVH-goHge4m-eVQG_wMn951Li3ijy2A&s",
        image1:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgGAjVH-goHge4m-eVQG_wMn951Li3ijy2A&s",
        image2:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgGAjVH-goHge4m-eVQG_wMn951Li3ijy2A&s",
        image3:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgGAjVH-goHge4m-eVQG_wMn951Li3ijy2A&s",
        image4:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgGAjVH-goHge4m-eVQG_wMn951Li3ijy2A&s",
        video1: "https://www.youtube.com/watch?v=KVd-3yQBmXE",
        video2: "https://www.youtube.com/watch?v=ZkQBsopZHY8",
        category: "Pilgrimage",
        location: "Deoghar, Jharkhand",
        bestTimeToVisit: "October to March",
        about: "Deoghar, also known as Baidyanath Dham, is a significant pilgrimage destination in Jharkhand, India. It is renowned for the Baidyanath Temple, one of the twelve Jyotirlingas dedicated to Lord Shiva. The temple attracts millions of devotees, especially during the month of Shravan (July-August) when the Kanwar Yatra takes place. Deoghar is also home to several other temples and religious sites, making it a spiritual hub. The town offers a serene atmosphere with its blend of religious fervor and natural beauty, including nearby attractions like Trikuta Hills and Naulakha Mandir.",
        readmore: "https://en.wikipedia.org/wiki/Deoghar",
        arembed:"<iframe src=\"https://www.google.com/maps/embed?pb=!4v1763638871385!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGVfdU9rZEE.!2m2!1d24.49254229419991!2d86.70031737954947!3f250.8768737901766!4f5.480075414918801!5f0.7820865974627469\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        nearbyPlaces: [],
      },
      {
        name: "Prashnath Hills",
        description:
          "Parasnath is the highest peak in Jharkhand and an important pilgrimage site for Jains. The hill offers a scenic trekking route with cool winds and forest paths.",
        image:
          "https://as1.ftcdn.net/v2/jpg/08/05/75/42/1000_F_805754246_wddhiIzivz80pZAVSi0gs9vqqkzZSH2c.jpg",
        image1:
          "https://2.bp.blogspot.com/-SZQZVu2KzNg/WVidce8DtII/AAAAAAAAAQw/T12Dw7NPtLw6Ex1lHab6UzcXo7Yw7yxaQCLcBGAs/s1600/parasnath-hills.jpg",
        image2:
          "https://as1.ftcdn.net/v2/jpg/08/05/75/42/1000_F_805754246_wddhiIzivz80pZAVSi0gs9vqqkzZSH2c.jpg",
        image3:
          "https://www.mytourplans.com/storage/ck/010623120318-parasnath-01.jpg",
        image4:
          "https://2.bp.blogspot.com/-SZQZVu2KzNg/WVidce8DtII/AAAAAAAAAQw/T12Dw7NPtLw6Ex1lHab6UzcXo7Yw7yxaQCLcBGAs/s1600/parasnath-hills.jpg",
        video1: "https://www.youtube.com/watch?v=example1",
        video2: "https://www.youtube.com/watch?v=example2",
        category: "Hill Station",
        location: "Giridih, Jharkhand",
        bestTimeToVisit: "October to March",
        about: "Parasnath Hills, also known as Shikharji, is the highest peak in Jharkhand and a revered pilgrimage site for Jains. The hill stands at an elevation of 1,365 meters and is dotted with numerous Jain temples and shrines. It is believed that twenty of the twenty-four Tirthankaras attained nirvana here. The trekking route to the summit is popular among devotees and adventure enthusiasts alike, offering scenic views, cool winds, and forested paths. The area is also rich in biodiversity, making it a serene destination for nature lovers.",
        readmore: "https://en.wikipedia.org/wiki/Parasnath_Hills",
        arembed:"<iframe src=\"https://www.google.com/maps/embed?pb=!4v1763639357356!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGNzOGlFRGc.!2m2!1d23.96182263802135!2d86.13621370880239!3f249.67445716835238!4f5.337221287623862!5f0.7820865974627469\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        reviews: [
          { user: "Alice", rating: 5, comment: "A spiritual and serene experience!", date: new Date() },
          { user: "Bob", rating: 4, comment: "Beautiful trekking route with great views.", date: new Date() },
        ],
        nearbyPlaces: [],
      }
    ]);

    console.log("✅ Places inserted");

    // 4. Ab nearbyPlaces ke ObjectId set karte hain

    // Helper: name se place find karo
    const byName = (name) => places.find((p) => p.name === name);

    const netarhat = byName("Netarhat");
    const patratu = byName("Patratu Valley");
    const betla = byName("Betla National Park");
    const hundru = byName("Hundru Falls");
    const deoghar = byName("Deoghar");
    const parasnath = byName("Prashnath Hills");

    // Logical nearby mapping:
    // Netarhat <-> Betla (same belt)
    // Patratu <-> Hundru (Ranchi side)
    // Hundru also connects to Netarhat (longer trip combo)
    // Deoghar: abhi standalone

    await Place.bulkWrite([
      {
        updateOne: {
          filter: { _id: netarhat._id },
          update: {
            $set: {
              nearbyPlaces: [betla._id, hundru._id],
            },
          },
        },
      },
      {
        updateOne: {
          filter: { _id: patratu._id },
          update: {
            $set: {
              nearbyPlaces: [hundru._id, parasnath._id],
            },
          },
        },
      },
      {
        updateOne: {
          filter: { _id: betla._id },
          update: {
            $set: {
              nearbyPlaces: [netarhat._id, parasnath._id],
            },
          },
        },
      },
      {
        updateOne: {
          filter: { _id: hundru._id },
          update: {
            $set: {
              nearbyPlaces: [patratu._id, netarhat._id],
            },
          },
        },
      },
      {
        updateOne: {
          filter: { _id: deoghar._id },
          update: {
            $set: {
              nearbyPlaces: [hundru._id,deoghar._id],
            },
          },
        },
      },
    ]);

    console.log("✅ nearbyPlaces linked successfully");

    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
