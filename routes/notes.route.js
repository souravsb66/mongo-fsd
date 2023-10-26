const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middlewares/auth.middleware");

const noteRouter = express.Router();
noteRouter.use(auth);

//Add route
noteRouter.post("/create", async (req,res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({"message": "New note added", "newNote": note});
    }
    catch (err) {
        res.status(400).send({"err": err});
    }
})

//Get route
noteRouter.get("/", async (req,res) => {
    try {
        const notes = await NoteModel.find({username: req.body.username});
        res.status(200).send(notes);
    }
    catch(err) {
        res.status(400).send({"error": err});
    }
})

//Update route
noteRouter.patch("/update/:noteID", async (req, res) => {

    const { noteID } = req.params;
    const note = await NoteModel.findOne({_id: noteID})

    // console.log(noteID, note);

    try {
        if(req.body.userID === note.userID) {
            await NoteModel.findByIdAndUpdate({_id: noteID}, req.body);
            res.status(200).send({"message": `Note with id ${noteID} has been updated.`});
        }
        else {
            res.status(200).send({"message": "Not authorized!"});
        }
    }
    catch(err) {
        res.status(400).send({"error": err});
    }
})

//Delete route
noteRouter.delete("/delete/:noteID", async (req, res) => {
    
    const { noteID } = req.params;
    const note = await NoteModel.findOne({_id: noteID})

    // console.log(noteID, note);

    try {
        if(req.body.userID === note.userID) {
            await NoteModel.findByIdAndDelete({_id: noteID});
            res.status(200).send({"message": `Note with id ${noteID} has been deleted.`});
        }
        else {
            res.status(200).send({"message": "Not authorized!"});
        }
    }
    catch(err) {
        res.status(400).send({"error": err});
    }
})

module.exports = {
    noteRouter
}