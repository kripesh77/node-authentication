//This is just to check how jwt works

const jwt = require("jsonwebtoken");
const JWT_SECRET = "asfasfasf";

const username = "john";

const token = jwt.sign({ username }, JWT_SECRET);
console.log(token);
const decodedInfo = jwt.verify(token, JWT_SECRET);
console.log(decodedInfo);

//first run
/* 
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE3NDk3MTUzOTl9.VlQ-Uq2SLjEvHoKYiFA1dWiiju8D5fQ6OGciL_4eXHg
   { username: 'john', iat: 1749715399 }
*/

//second run
/* 
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE3NDk3MTU0NDF9.2ApaaarhBoPhi1_uP6nhwUxDGVIBFVwOp4chQEZe1Zw
   { username: 'john', iat: 1749715441 }
*/
