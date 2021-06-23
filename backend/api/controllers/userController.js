const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Tutorial = mongoose.model('Tutorials');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_users = (req, res) => {

  var query = User.find();

  if (req.params.fields) {
    const wantedFields = req.params.fields.replace(/-/g, ' ');
    query.select(wantedFields + ' -_id');
  }

  query.exec((err, users) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!users) {
      res.status(404).send();
      return;
    }
    else {
      res.json(users);
    }
  })
};

exports.create_a_user = async (req, res) => {

  if (req.params.fields) { throw new Error('No fields expected.'); }

  var userFound = await findByEmailUsername(req.body.username, req.body.email);
  console.log("userFound = " + userFound);
  if (!userFound || userFound.length === 0) {
    var hashedPassword = '';
    var userSalt = '';
    userSalt = await bcrypt.genSaltSync(10);
    userPassword = await req.body.password;
    console.log("userPassword = " + userPassword);
    hashedPassword = bcrypt.hashSync(userPassword, userSalt);
    console.log("hashedPassword = " + hashedPassword);
    let userToCreate = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword,
      courses_of_study: req.body.courses_of_study,
      salt: userSalt,
      email: req.body.email,
      credits: 0,
      expert_of_lectures: req.body.expert_of_lectures,
      friends: [],
      tutor_in: [],
      img_path: req.file ? req.file.path : ""
    });
    userToCreate.save()
      .then((user) => {
        const userDTO = {
          userID: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        };
        var jwt_token = jwt.sign(userDTO, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
        res.status(200).send({
          message: "User successufily registered!",
          jwt_token,
          userID: user._id,
          first_name: user.first_name,
          img_path: user.img_path
        })
      })
      .catch(error => {
        res.status(400).send({
          message: "An error occured!",
          error: error.message
        })
        if (req.file) fs.unlink(req.file.path, () => { })
      })
  } else {
    res.status(400).send();
    if (req.file) fs.unlink(req.file.path, () => { })
  }
};

function findByEmailUsername(username, email) {
  return User.find({ $or: [{ username }, { email }] });
}

exports.read_a_user = (req, res) => {

  if (req.params.id) {
    var query = User.findById(req.params.id);
  }
  else res.send(err);

  if (req.params.fields) {

    const wantedFields = req.params.fields.replace(/-/g, ' ');

    query.select(wantedFields + ' -_id');

    if (!wantedFields.includes(' ')) {
      //single field is wanted
      if (wantedFields === 'courses_of_study' || wantedFields === 'expert_of_lectures') {
        query.populate(wantedFields, ['verbose_name']); //here can be changed
      }
    }
    else {
      //multiple fields are wanted
      if (wantedFields.includes('courses_of_study')) {
        query.populate('courses_of_study', ['verbose_name']);
      }
      if (wantedFields.includes('expert_of_lectures')) {
        query.populate('expert_of_lectures', ['verbose_name']);
      }
    }

  }
  else {
    query.populate('expert_of_lectures', ['verbose_name']);
    query.populate('courses_of_study', ['verbose_name']);
  }

  query.exec((err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!user) {
      res.status(404).send();
      return;
    }
    else {
      res.json(user);
    }
  })

};

exports.update_a_user = (req, res) => {
  var userInToken = req.user.userID;
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!user) {
      res.status(404).send();
      return;
    }
    if (user._id != userInToken) {
      res.status(401).send({ message: "Unauthorized access" })
      return;
    }
    if (req.file) req.body.img_path = req.file.path;
    console.log(req.file);
    req.body.expert_of_lectures ? req.body.expert_of_lectures = req.body.expert_of_lectures.split(',') : [];
    if (req.body.password) {
      let salt = bcrypt.genSaltSync(10);
      let password = bcrypt.hashSync(req.body.password, salt);
      req.body.salt = salt;
      req.body.password = password;
    }
    if (req.file) req.body.img_path = req.file.path;
    if (req.body.img_path === '') { //Remove PP
      fs.unlink(user.img_path, () => { })
    }
    User.findOneAndUpdate(
      { _id: user._id },
      req.body,
      { new: true },
      (err, user) => {
        if (err) res.send(err);
        else res.json(user);
      }
    );
  })
};

exports.delete_a_user = (req, res) => {
  //var userInToken = req.user.userID;
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!user) {
      res.status(404).send();
      return;
    }
    if (user._id != userInToken) {
      res.status(401).send({ message: "Unauthorized access" })
      return;
    }
    User.deleteOne({ _id: user._id }, err => {
      if (err) res.send(err);
      else {
        let refErr = removeRefTut(user._id)
        if (refErr) {
          res.send(errrefErr);
          return;
        }
        res.json({
          message: 'user successfully deleted.',
          _id: req.params.id
        });
      }
    });
  })
};

exports.search_users = (req, res) => {
  
  const query = req.params.query;

  if (!query) { next(); }
  else {
    User.find({ $text: { $search: query } }).exec((err, users) => {
      if (err) {
        res.send(err);
        return;
      }
      else if (!users) {
        res.status(404).send();
        return;
      }
      else {
        console.log(users);
        res.json(users);
      }
    })
  }
}


function removeRefTut(userID) {
  Tutorial.find({ tutor: userID }, (err, tutorials) => {
    if (!err) {
      tutorials.forEach(tutorial => {
        Tutorial.deleteOne({ _id: tutorial._id }, (err) => {
          if (!err) {
            let refUser = removeRefUsers(tutorial._id)
            if (refUser) return refUser
          }
          else return err
        })
      });
    }
  })
}

function removeRefUsers(tutID) {
  User.updateMany({ student_in: tutID }, { $pullAll: { student_in: [tutID] } }, err => {
    if (err) {
      return err
    }
    else return false
  });
}
