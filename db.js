const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sumankumarbisoi:suman123@cluster0.m3h7k0x.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});