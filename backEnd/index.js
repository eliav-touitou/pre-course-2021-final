//creating variables
const express = require("express");
const uuid = require("uuid");
const app = express();
const fs = require("fs");
app.use(express.json());

//pulling a specific bin content
app.get("/v3/b/:id", (req, res) => {
  const id = req.params.id;
  try {
    const binContent = fs.readFileSync(`./bins/${id}.json`);
    res.send(binContent);
  } catch (e) {
    res.status(422).json({ message: "Invalid Record ID" });
  }
});

//updating a specific bin content
app.put("/v3/b/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const binExist = fs.existsSync("./bins/${id}.json");

  if (!binExist) {
    res.status(404).json({
      message: "Bin not found",
      success: false,
    });
    return;
  }
  fs.writeFileSync(
    `${__dirname}bins/${id}.json`,
    JSON.stringify(body, null, 4)
  );
  const successMessage = {
    success: true,
    data: body,

    version: 1,
    parentId: id,
  };
  res.send(successMessage);
});

//adding a new nin to the list
app.post("/v3/b", (req, res) => {
  const { body } = req;
  const id = uuid.v4();
  body.id = id;
  try {
    fs.writeFileSync(
      `${__dirname}/bins/${id}.json`,
      JSON.stringify(body, null, 4)
    );
    res.send("awesome");
  } catch (err) {
    res.send("error");
  }
});
//deleting a specific bin out of bins
app.delete("/v3/b/:id", (req, res) => {
  const id = req.params.id;
  fs.unlink(`${__dirname}/bins/${id}.json`, (err) => {
    if (err) {
      res.status(404).send("BIN not found");
    } else {
      res.send("success");
    }
  });
});

//getting the entire bins saved
app.get("/v3/b/", (req, res) => {
  let files = [];
  const objects = fs.readdirSync(`${__dirname}/bins`);
  if (objects.length === 0) {
    res.send("you have no objects");
  } else {
    try {
      for (let object of objects) {
        files.push(JSON.parse(fs.readFileSync(`${__dirname}/bins/${object}`)));
      }
      res.status(200).send(files);
    } catch (error) {
      res.status(500).send("there is a problem with the server " + error);
    }
  }
});

app.listen(3000);
