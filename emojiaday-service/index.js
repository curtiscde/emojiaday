const express = require("express");

const app = express();
const apiRoutes = express.Router();

const port = 8080;

console.log('🚀 App started');

require('./routes/user.js')(apiRoutes);

app.use('/api', apiRoutes);


app.listen(port);
console.log(`🎧 App listening on port ${port}`);