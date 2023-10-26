const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/notes.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`listening on port ${process.env.PORT}`);
    }
    catch(err) {
        console.log(err);
    }
})