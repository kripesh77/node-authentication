const express = require("express");
const app = express();

const users = [];

app.use(express.json());

//returns a random string
function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

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
  const token = generateToken();
  user.token = token;
  res.json({ message: token });
  console.log(users);
});

app.get("/me", (req, res) => {
  const token = req.headers.token;

  const user = users.find((u) => u.token === token);

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
