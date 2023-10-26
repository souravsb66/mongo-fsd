const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/notes.route");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req,res) => {
    res.send({"message": "Home page"});
})

(async function () {
    await connection;
})()

app.listen(process.env.PORT, async () => {
    try {
        console.log("Connected to DB");
        console.log(`listening on port ${process.env.PORT}`);
    }
    catch(err) {
        console.log(err);
    }
})