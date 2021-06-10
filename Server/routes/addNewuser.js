const router = require("express").Router();
let User = require("../models/user");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const nuser = new User({
    name,
    email,
    password,
  });
  // console.log(req.body);
  User.find({ email }).then((filteredusers) => {
    // console.log(filteredusers);
    if (filteredusers.length != 0) {
      res.send("AccountExists");
      return;
    }
    nuser
      .save()
      .then(() => {
        console.log("Successfully added!!");
        User.find({ email, password }).then((filtereduser) => {
          console.log(filtereduser);
          if (filtereduser.length === 1) res.send(filtereduser[0]._id);
          else res.send("notValid");
        });
      })
      .catch((e) => {
        console.log(e);
        res.send("Error");
      });
  });
});

router.route("/validate").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  User.find({ email, password }).then((filtereduser) => {
    console.log(filtereduser);
    if (filtereduser.length === 1) res.send(filtereduser[0]._id);
    else res.send("notValid");
  });
});

module.exports = router;
