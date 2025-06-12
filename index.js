//JWT(JSON Web Token) is a stateless tokenization system
//i.e., we do not need to store the token of the user anywhere
//when server receives JWT token, server itself can decode the credentials used for encoding.
//If server can decode the valid credential (initially used to encode), then server can ensure that the request is from valid user.

const express = require("express");
const jwt = require("jsonwebtoken");

//We need this secret to encode and obtain our JWT token
const JWT_SECRET = "blablabla";

const app = express();

const users = [];

//to parse request body into json
app.use(express.json());

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((u) => u.username === username)) {
    res.json({
      message: "Username already exists",
    });
    return;
  }

  users.push({
    username,
    password,
  });

  res.json({ message: "You're signed in" });

  console.log(users);
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //"find" method returns first user having that username
  const user = users.find((u) => u.username === username);
  //if there's no user, they've to first sign up
  if (!user) {
    res.status(403).json({ message: "Please signup first" });
    return;
  }

  //If we find user of that username but the password donot match, we do the following
  if (user.password !== password) {
    res.status(403).json({ message: "Password donot match, please try again" });
    return;
  }

  //Now, if username is registered and password is also correct for that username
  //then we assign a token to that user
  const token = jwt.sign({ username }, JWT_SECRET); //converting username into a JWT using JWT_SECRET

  //Now we don't need this line of code to store the token as we don't need to store it
  //user.token = token;

  res.json({ message: token });
  console.log(users);
});

app.get("/me", (req, res) => {
  //user still sends token, but this time it's JWT
  const token = req.headers.token; //JWT

  //in "/signin", just how we converted "username" object to JWT
  //this line of code converts back the "username" object using JWT and JWT_SECRET
  const decodedInformation = jwt.verify(token, JWT_SECRET); //gives: {username: "user's-name"}
  const username = decodedInformation.username;

  const user = users.find((u) => u.username === username);

  if (user) {
    res.json({
      username: user.username,
      password: user.password,
    });
  } else {
    res.json({ message: "Not Authorized, Token Invalid" });
  }
});

app.listen(2000, () => {
  console.log("Server is running in port 2000");
});
