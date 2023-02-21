import express from "express";
import cors from "cors";
import functions from "firebase-functions";
import { getAllDoc, postDoc, getTargetedQuestion, getAllQuestions, getEasyQuestions } from "./src/functions.js";
import { signup } from "./src/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// login and signup routes
app.post('/signup', signup);

//GET: All Series
app.get("/series", getAllDoc);

//GET: All Questions
app.get("/questions", getAllQuestions);

//GET: All EASY questions
app.get("/questions/:diffID", getEasyQuestions);

//GET: single question with questionID
app.get(`/questions/:questionID`, getTargetedQuestion);

//POST: Doc 
app.post("/post", postDoc);

app.get("/questions/:seriesID/:diffID", easyOPQuestions);

export const api = functions.https.onRequest(app);