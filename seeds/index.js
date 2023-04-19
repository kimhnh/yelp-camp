const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log('mongo connection open');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    // const c = new Campground({title: 'purple field'});
    // await c.save();
    for (let i = 0; i < 50; i++){ //loop 50 times
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collection/483251`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore facere veritatis commodi, qui dolore dicta. Harum facilis cumque voluptates explicabo molestiae necessitatibus deserunt repudiandae dignissimos!',
            price
        })
        await camp.save();
    }
}

seedDB();