import express from "express"; //need to add "type" module in package.json
// const express = require("express"); no need to add "type" module in package.json
//directory to backend and run node app.js to check
const app = express();
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

//Handle Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncought exception");
});

dotenv.config({ path: "backend/config/config.env"})

//Connecting to database
connectDatabase();
app.use(express.json());


// Import All Routes
import productRoutes from './routes/products.js'


app.use("/api/v1", productRoutes);


//Using error middleware
app.use(errorMiddleware);



const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})


//Handle Unhandled Promise Reejction
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});