const express = require("express");
const app = express();

let data = "Initial Data";

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
    res.send({ data });
})
app.get("/updateData", (req, res) => {
    data = "Updated data";
    res.send({ data });
})
app.listen(3000);