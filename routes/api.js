const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   try {
//     res.send(req.oidc.isAuthenticated() ? "logged in" : "logged out");
//   } catch (error) {
//     res.status(409).send("Error" + error);
//   }
// });

module.exports = router;
