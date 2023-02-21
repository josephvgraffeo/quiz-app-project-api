import { ObjectId } from "mongodb";
import { dbConnect } from "./dbConnect.js";

//GET: All Series
export async function getAllDoc(req, res) {
    const db = dbConnect();
    const collection = await db.collection("series").find({}).limit(10).toArray();
    
    console.table(collection);
    res.send(collection);
}

//GET: All Questions
export async function getAllQuestions(req, res) {
    const db = dbConnect();
    const collection = await db.collection("questions").find({}).toArray();
    
    console.table(collection);
    res.send(collection);
}

//GET: All Questions with EASY difficulty
export async function getEasyQuestions(req, res) {
    const db = dbConnect();
    const collection = await db.collection("questions").find({ diffID: "diffEASY" }).toArray();
    
    console.table(collection);
    res.send(collection);
}

//GET: Single question using questionID
export async function getTargetedQuestion(req, res) {
    const db = dbConnect();
    const questionID = req.params.questionID
    const collection = await db.collection("questions").where({ questionID: questionID }).toArray();
    
    res.send(collection);
}

//GET: Easy OP questions (targeted query test)
export async function easyOPQuestions(req, res) {
    
}

//Post: Doc
export async function postDoc(req, res) {
    const newDoc = req.body

    const db = dbConnect();
    await db.collection("series").insertOne(newDoc)
        .catch(err => {
            res.status(500).send(err)
            return
        })
        res.status(201).send( {message: 'New Doc Inserted'} );
}
