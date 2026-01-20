require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set in .env');
  process.exit(1);
}

(async () => {
  console.log('Attempting MongoDB connection...');
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log('✅ Database connected successfully');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed');
    if (err && err.message) console.error('Error:', err.message);
    if (err && err.code) console.error('Code:', err.code);
    if (err && err.name) console.error('Name:', err.name);
    console.error(err);
    process.exit(2);
  }
})();
