
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author: '5fe9da728668750a34d561d0',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            image: "https://source.unsplash.com/collection/483251/1600x900",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum repellendus. Libero non explicabo voluptate porro optio, eius facere repudiandae exercitationem, in, eveniet nobis animi quidem nemo laborum vero vitae!",
            price

        })
        await camp.save();
    }
}
seedDB();
