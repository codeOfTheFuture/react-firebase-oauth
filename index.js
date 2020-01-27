const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const posts = require("./posts");

const serviceAccount = require("./react-firebase-oauth-4104f-firebase-adminsdk-lnmwc-f0488e45b8.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-firebase-oauth-4104f.firebaseio.com"
});

const app = express();

app.use(cors());
app.use(express.json());

console.log("posts>>>>", posts);
// Create authentication middleware
const isAuthenticated = (req, res, next) => {
  // check if user is logged in
  // if they are, attach them to the request object
  // if they are not, send them to the login page
  // with a message saying: 'login!'
  console.log("middleware req obj", req.headers.authorization);
  let idToken = req.headers.authorization;
  console.log("req idToken on server", idToken);
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      let uid = decodedToken.uid;
      console.log("uid from server>>>", uid);

      req.uid = uid;
      next();
    })
    .catch(error => {
      res.status(401).json(error);
    });
};

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.get("/posts", isAuthenticated, (req, res) => {
  console.log("uid from get req>>>", req.uid);

  try {
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(8000, () => {
  console.log("server Started....");
});
