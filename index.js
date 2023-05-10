require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// Configuration of CORS
app.use( cors() );

// Read and parse of the body
app.use( express.json() );

// Database
dbConnection();

// Public Directory
app.use( express.static('public') );

// Routes
app.use( '/api/residents', require('./routes/residents') );
// app.use( '/api/relative', require('./routes/relatives') );
// app.use( '/api/nurse', require('./routes/nurses') );
// app.use( '/api/doctor', require('./routes/doctors') );
app.use( '/api/users', require('./routes/users') );
app.use( '/api/login', require('./routes/auth') );

app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});

app.listen( process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT );
});