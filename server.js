var express = require("express");
var cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(fileUpload());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  const f = req.files.upfile;
  const file = {
    name: f.name,
    type: f.mimetype,
    size: f.size,
  };

  res.json(file);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
