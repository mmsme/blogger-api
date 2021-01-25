const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/index");
const path = require("path");
const app = express();

// const connection =
//   "mongodb+srv://M_Mustafa:m3523m1998@cluster0.kr8bd.mongodb.net/bloggerDB?retryWrites=true&w=majority";
// mongoose
//   .connect(connection, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("Database Connected Successfully"))
//   .catch((err) => console.log(err));

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
app.use("/images", express.static(path.join("images")));

app.use("/", route);

app.use("*", (req, res, next) => {
  res.status(404).json({ err: "NOT_FOUND" });
});

app.use((err, req, res, next) => {
  // Map the error and send it to user
  // instanceof
  // Check if this err is a mongoose err using instanceof

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res
      .status(422)
      .json({ statusCode: "ValidationError", property: err.keyValue });
  }
  if (err.message === "UN_AUTHENTICATED") {
    res.status(401).json({ statusCode: "UN_AUTHENTICATED" });
  }
  res.status(503).end();
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log("listen to port", PORT);
});
