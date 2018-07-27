import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

require('./routes/entries-user.js')(apiRoutes);
require('./routes/entry-post.js')(apiRoutes);

app.use('/api', apiRoutes);

app.listen(port);
console.log(`🎧 App listening on port ${port}`);