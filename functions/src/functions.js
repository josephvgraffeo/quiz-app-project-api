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
    const diffID = req.params.diffID
    const collection = await db.collection("questions").find({ diffID: diffID }).toArray();
    
    res.send(collection);
}

//GET: Questions for a series and difficulty level
export async function getTargetedQuizQuestions(req, res) {
    const db = dbConnect();
    const seriesID = req.params.seriesID
    const diffID = req.params.diffID
    const collection = await db.collection("questions").find({ seriesID: seriesID, diffID: diffID }).toArray();
    
    res.send(collection);
}

//Post: Doc
export async function postDoc(req, res) {
    const newDoc = req.body

    const db = dbConnect();
    await db.collection("questions").insertOne(newDoc)
        .catch(err => {
            res.status(500).send(err)
            return
        })
        res.status(201).send( {message: 'New Doc Inserted'} );
}
