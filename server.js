const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => res.send("hello world!"));

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// regex route
app.get("^/$|/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// redirect route
app.get("/redirect.html", (req, res) => {
  res.redirect("index.html");
});

// chain multiple call backs
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const threee = (req, res, next) => {
  console.log("threee");
  res.send("Finished.!");
};

app.get("/chain", [one, two, threee]);

// to handle unknown route
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "404.html"))
);
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
