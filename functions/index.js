import express from "express";
import cors from "cors";
import functions from "firebase-functions";
import { getAllDoc, postDoc } from "./src/functions.js";

const app = express();
app.use(cors());

//GET: Get All
app.get("/series", getAllDoc);

//POST: Post Doc 
app.post("/post", postDoc);

//Testing cloud functions 
app.get('/test', (req, res) => {
    res.send('Hello, this actually works!')
});

app.get('/test2', (req, res) => {
    res.send('This also works, I cant believe it')
});

export const api = functions.https.onRequest(app);