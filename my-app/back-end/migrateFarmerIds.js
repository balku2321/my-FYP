const mongoose = require('mongoose');
const Product = require('./models/Product');
const Farmer = require('./models/Farmer');

const migrateFarmerIds = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Harvest_Harmony', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const products = await Product.find();
    for (const product of products) {
      const farmer = await Farmer.findOne({ _id: product.farmerId });
      if (farmer) {
        product.farmerId = farmer._id;
        await product.save();
      }
    }
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
  }
};

migrateFarmerIds();
