const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
const app = express()
const port = 3000
var cors = require('cors')


var bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const username = "gayan";
const password = "172022";
const cluster = "cluster0";
const dbname = "project";

const dburi = "mongodb+srv://gayan:172022@cluster0.xg1kn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
  dburi ,
  {

    useUnifiedTopology: true
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(port, () => {
  console.log("Server is running at port 3000");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
app.use((req, res, next) => {
  res.status(404).send({msg : "not valid request"});
  next();
})




module.exports = app;