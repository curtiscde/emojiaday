const express = require("express");
const mongoose = require('mongoose');

const app = express();
const apiRoutes = express.Router();

const port = 8080;

console.log('🚀 App started');

if (!process.env.prod){
  require('./config/dev.js');
}

mongoose.connect(process.env.dbconn)
.then(function(r){
    console.log('💾 DB connected');
})
.catch(console.log);

require('./routes/emoji-day.js')(apiRoutes);

app.use('/api', apiRoutes);

app.listen(port);
console.log(`🎧 App listening on port ${port}`);