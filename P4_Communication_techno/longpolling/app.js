const express = require("express");

const app = express();
let data = "Initial Data";
const waitingClients = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
    if (data !== req.query.lastdata) {
        res.json({ data });
    } else {
        waitingClients.push(res);
    }
});

app.get("/updateData", (req, res) => {
    data = req.query.data;
    while (waitingClients.length > 0) {
        const client = waitingClients.pop();
        client.json({ data });
    }
    res.send({ success: "Data updated successfully" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});