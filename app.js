import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import path from "path";


const PORT = process.env.PORT || 8000;
dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html')),
  function(err){
    res.status(500).send(err);
  }
})


mongoose
  .connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`Connected To Database and listening at PORT ${PORT}`)
  )
  .catch((err) => console.log(err));
