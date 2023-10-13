const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log('mongo connection open');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  // const c = new Campground({title: 'purple field'});
  // await c.save();
  for (let i = 0; i < 300; i++) {
    //loop 50 times
    const random1000 = Math.floor(Math.random() * 1000 + 1);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // user id
      author: '64db6b0fbac48d9205f710a1',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore facere veritatis commodi, qui dolore dicta. Harum facilis cumque voluptates explicabo molestiae necessitatibus deserunt repudiandae dignissimos!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dhow6slo2/image/upload/v1694402568/YelpCamp/ugrljkqkfpwpq00y7jq7.png',
          filename: 'YelpCamp/ugrljkqkfpwpq00y7jq7',
        },
        {
          url: 'https://res.cloudinary.com/dhow6slo2/image/upload/v1696002547/YelpCamp/vguyeikunhayderagbtr.png',
          filename: 'YelpCamp/vguyeikunhayderagbtr.png',
        },
      ],
    });
    await camp.save();
  }
};

seedDB();
