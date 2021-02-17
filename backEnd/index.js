const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const PORT = 3000;

app.get("/b", (req, res) => {});

app.get("/b:id", (req, res) => {});
