const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
const url =
  "mongodb+srv://user:Index-123@cluster0.uhijm.mongodb.net/sub_db?retryWrites=true&w=majority";

const app = express();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

mongoose.connect(url, { useNewUrlParser: true });

const con = mongoose.connection;
app.use(express.json());

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "logged in" : "logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

con.on("open", () => {
  console.log("mongo cluster connected...");
});
app.listen(9000, () => {
  console.log("server connected");
});
