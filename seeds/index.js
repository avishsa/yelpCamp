
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const NUM_CAMPGROUNDS = 200;

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
    for (let i = 0; i < NUM_CAMPGROUNDS; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author: '5fe9da728668750a34d561d0',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,            
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum repellendus. Libero non explicabo voluptate porro optio, eius facere repudiandae exercitationem, in, eveniet nobis animi quidem nemo laborum vero vitae!",
            price,
            geometry: { "type" : "Point", "coordinates" : [ cities[rand1000].longitude, cities[rand1000].latitude ] },
            images:[
                {
            filename: 'YelpCamp/kpi86l158ynxqrwonay2',                                                                    
            url: 'https://res.cloudinary.com/avishag1/image/upload/v1609331980/YelpCamp/kpi86l158ynxqrwonay2.png'         
          },                                                                                                              
          {                                                                                                               
            filename: 'YelpCamp/knj2mloecsqbprogqpcm',                                                                    
            url: 'https://res.cloudinary.com/avishag1/image/upload/v1609331980/YelpCamp/knj2mloecsqbprogqpcm.png'         
          }]                                                                                                               
         ,                                                                                                                

        })
        await camp.save();
    }
}
seedDB();
