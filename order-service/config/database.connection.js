const dotenv =  require("dotenv").config()
const { Client } = require('pg');


// Create a new client instance
const conn = new Client({
  user: process.env.DB_USERNAME,      
  host: process.env.DB_HOSTNAME,           
  database: process.env.DB_NAME,   
  password: process.env.DB_PASSWORD,       
  port: process.env.DB_PORT,                 
});


// Connect to the PostgreSQL server
conn.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error',err.stack));



module.exports = { conn };
