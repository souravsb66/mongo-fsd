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

try {
    (async function () {
        await connection;
    })()
    console.log("Connected to DB");
}
catch(err) {
    console.log(err);
}

app.listen(process.env.PORT, async () => {
    try {
        console.log(`listening on port ${process.env.PORT}`);
    }
    catch(err) {
        console.log(err);
    }
})