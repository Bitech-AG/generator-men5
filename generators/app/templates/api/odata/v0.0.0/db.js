module.exports = async () => {
  try {
    const mongoose = require('mongoose');
    
    return await mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/<%= id.replaceAll('.', '_') %>');

  }catch(err) {
    console.error(err.message);
    console.error('Failed to connect to database on startup.');
    process.exit();
  }
}