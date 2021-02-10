const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/index");
const cors = require("cors");

app.use(cors());
const app = express();

const uri =
  "mongodb+srv://M_Mustafa:m3523m1998@cluster0.kr8bd.mongodb.net/BloggerDB";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

app.use(express.json());
// app.use("/images", express.static(path.join("images")));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );

//   next();
// });

app.use("/", route);

app.use("*", (req, res, next) => {
  res.status(404).json({ err: "NOT_FOUND" });
});

app.use((err, req, res, next) => {
  // Map the error and send it to user
  // instanceof
  // Check if this err is a mongoose err using instanceof
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    console.log("from first if");
    return res.status(422).json(err.errors);
  }

  if (err.code === 11000) {
    console.log("from Second If");
    res
      .status(422)
      .json({ statusCode: "ValidationError", property: err.keyValue });
  }

  if (err.status === 400) {
    res.status(400).json({ type: err.type });
  }

  if (err.message === "UN_AUTHENTICATED") {
    res.status(401).json({ statusCode: err.message });
  }

  res.send(err);
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log("listen to port", PORT);
});
