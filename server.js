const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const cors = require('cors');

const { MongoURI } = require("./config/database");

PORT = process.env.PORT;
HOST = process.env.HOST;

mongoose.connect(MongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.json());
app.use('/uploads', express.static('uploads'));

app.use(cors());


app.get("/home", (req, res) => {
  
  res.send("Welcome to hotel manager home page")
});


app.use("/users", require("./routes/userRoute"));
app.use("/", require("./routes/hotelRoute"));
app.use("/", require("./routes/roomRoute"));
app.use("/", require("./routes/bookingRoute"));
app.use("/", require("./management/hotels"));


app.listen(PORT, 
  () => console.log
    (`${HOST} is running on ${PORT}`));
