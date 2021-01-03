import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env" });
}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
const app = express();
import logger from "morgan";
import Query from "./queries.js";
import path from "path";

// import indexRouter from "./routes/index.js";
import studentRouter from "./routes/students.js";
import teacherRouter from "./routes/teachers.js";
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// app.use("/", indexRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);

Query();
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.send("error");
});
if (process.env.NODE_ENV !== "production") {
  //set static folders
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT);
