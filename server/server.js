const express = require('express');
const app = express();
const cors = require('cors');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(parser.json());
app.use(cors());


MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('groupProject');
  const dungeonCollection = db.collection('dungeon');
  const dungeonRouter = createRouter(dungeonCollection);
  app.use('/api/dungeon', dungeonRouter);
})
.catch(console.err);

app.listen(3000, function () {
  console.log(`listening on port ${ this.address().port}`);
});
