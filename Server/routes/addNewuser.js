const router = require("express").Router();
let User = require("../models/user");

router.route("/add").get((req, res) => {
  const name = "hi";
  const phone = "23";
  const nuser = new User({
    name,
    phone,
  });

  nuser
    .save()
    .then(() => {
      console.log("Successfully added!!");
      res.send("Success");
    })
    .catch((e) => {
      console.log(e);
      res.send("ERROR");
    });
});

module.exports = router;
