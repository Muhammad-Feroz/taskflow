import mongoose from "mongoose";

const url:string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskflow.nzzpevi.mongodb.net/?retryWrites=true&w=majority&appName=taskflow`;

mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error(err);
});