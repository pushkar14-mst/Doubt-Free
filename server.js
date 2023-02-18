const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5173" }));

// const atlasUri = `mongodb+srv://admin:${process.env.ATLAS_PASSWORD}@firstcluster.4rc4s.mongodb.net/doubtsDB?retryWrites=true&w=majority`;
// mongoose.connect(
//   atlasUri,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => console.log(" Mongoose is connected")
// );
mongoose.connect("mongodb://localhost:27017/doubtsDB");
const doubtsSchema = new mongoose.Schema({
  name: { type: String },
  doubtTitle: { type: String },
  category: { type: String },
  doubt: { type: String },
  dateCreated: { type: Date },
});

const Doubts = mongoose.model("Doubts", doubtsSchema);

app.post("/add-doubt", async (req, res) => {
  const name = req.body.name;
  const title = req.body.title;
  const category = req.body.category;
  const doubt = req.body.doubt;

  try {
    const Doubt = new Doubts({
      name: name,
      doubtTitle: title,
      category: category,
      doubt: doubt,
      dateCreated: Date.now(),
    });

    const createdDoubt = await Doubt.save({ wtimeout: 35000 });
    console.log(createdDoubt);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-doubts", (req, res) => {
  Doubts.find({}, (err, doubts) => {
    if (err) throw err;
    res.json(doubts);
  });
});

app.get("/identify-doubt/:id", (req, res) => {
  const id = req.params.id;
  Doubts.find({ _id: id }, (err, doubt) => {
    if (err) throw err;
    res.json(doubt);
  });
});
app.listen(5000, () => {
  console.log("port started on 5000");
});
