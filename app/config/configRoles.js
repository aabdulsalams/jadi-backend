require('dotenv').config();

module.exports = {
  secret: process.env.SECRET,
  ROLEs: ['USER', 'SUPERUSER'],
};
