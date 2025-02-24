import express from "express"; //need to add "type" module in package.json
// const express = require("express"); no need to add "type" module in package.json
//directory to backend and run node app.js to check
const app = express();
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";

dotenv.config({ path: "backend/config/config.env"})

//Connecting to database
connectDatabase();

// Import All Routes
import productRoutes from './routes/products.js'

app.use("/api/v1", productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})