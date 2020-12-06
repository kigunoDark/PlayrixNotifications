const app = require("express")(),
  bodyParser = require("body-parser"),
  notificationRout = require("./routes/notificationRout"),
  cors = require("cors"),
  mongoose = require("mongoose");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(notificationRout);

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Db connecteed"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 3080, () => {
  console.log("App is running, Hello");
});
