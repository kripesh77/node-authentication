const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "blabla";

const app = express();

const users = [];

app.use(express.json());

function auth(req, res, next) {
  const { token } = req.headers;

  //If there is no token in user's header
  if (token) {
    //using built-in callback function of "jwt.verify" function
    jwt.verify(token, JWT_SECRET, (err, decodedInfo) => {
      // this decodedInfo and the one from above code is same
      if (err) {
        res.status(401).json({ message: "Token isn't valid" });
      } else {
        //modifying req so that routes using this middleware can have access to this "username" property as well
        req.username = decodedInfo.username; //routes(i.e., /me) using this middleware also now has access to username property.
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Please signin first to get access to this site" });
    return;
  }
}

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    res.json({ message: "User already exists" });
    return;
  }

  users.push({
    username,
    password,
  });

  res.json({ message: "You're signed in" });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    res.json({ message: "Please signup first" });
    return;
  }

  if (user.password !== password) {
    res.json({ message: "Password is incorrect" });
  } else {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({ token });
  }
});

app.get("/me", auth, (req, res) => {
  const username = req.username;

  const user = users.find((u) => u.username === username);

  if (user) {
    const { username, password } = user;
    res.json({
      username,
      password,
    });
  } else {
    res.status(401).json({
      message: "Not Authorized, Token invalid",
    });
  }
});

app.listen(2000, () => {
  console.log("Server is listening at port 2000");
});
