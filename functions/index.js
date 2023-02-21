import express from "express";
import cors from "cors";
import functions from "firebase-functions";
import { getAllDoc, postDoc, getTargetedQuizQuestions, getAllQuestions, getEasyQuestions } from "./src/functions.js";
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

//GET: All questions for a given series and difficulty
app.get(`/questions/:seriesID/:diffID`, getTargetedQuizQuestions);

//POST: Doc 
app.post("/post", postDoc);

export const api = functions.https.onRequest(app);