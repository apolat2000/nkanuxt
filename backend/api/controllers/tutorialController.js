const mongoose = require('mongoose');
const Tutorial = mongoose.model('Tutorials');
const User = mongoose.model('Users');

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.client_scope = (req, res) => {

  const userInToken = req.user.userID;
  const tutId = req.params.id;
  let header = "";


  if (tutId) {
    Tutorial.findOne({ _id: tutId }).exec((err, tut) => {
      if (err) {
        res.send(err);
        return;
      }

      if ("" + tut.tutor === userInToken) {
        header = 'tutor';
      }
      else if (tut.students.includes(userInToken)) {
        header = 'student';
      }
      else {
        header = 'visitor';
      }
      res.setHeader('Client_Scope', header);
      res.end();
    });
  }

}

exports.list_all_tutorials = (req, res) => {
  var query = Tutorial.find();

  if (req.params.fields) {
    const wantedFields = req.params.fields.replace(/-/g, ' ');
    query.select(wantedFields + ' -_id');
  }
  else {
    query.populate('lecture', ['name', 'verbose_name']);
    query.populate('tutor', ['first_name', 'last_name', 'username', 'bio', 'img_path']);
  }

  query.exec((err, tutorials) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!tutorials) {
      res.status(404).send();
      return;
    }
    else {
      res.json(tutorials);
    }
  })
};

exports.create_a_tutorial = (req, res) => {

  if (req.params.fields) { throw new Error('No fields expected.'); }

  const newtutorial = new Tutorial({
    class_size: req.body.class_size,
    tutor: req.body.tutor,
    lecture: req.body.lecture,
    title: req.body.title,
    creation_date: req.body.creation_date,
    students: req.body.students,
    first_date: req.body.first_date,
    frequency: req.body.frequency,
    description: req.body.description,
    is_active: req.body.is_active
  });

  newtutorial.save();

  res.send(newtutorial._id);
};

exports.read_a_tutorial = (req, res) => {

  if (req.params.id) {
    var query = Tutorial.findById(req.params.id);
  }
  else res.send(err);

  if (req.params.fields) {

    const wantedFields = req.params.fields.replace(/-/g, ' ');

    query.select(wantedFields + ' -_id');

    if (!wantedFields.includes(' ')) {
      //single field is wanted
      if (wantedFields === 'tutor' || wantedFields === 'students') {
        query.populate(wantedFields, 'username'); //here can be changed
      }
      if (wantedFields === 'lecture') {
        query.populate(wantedFields, 'verbose_name'); //here can be changed
      }
    }
    else {
      //multiple fields are wanted
      if (wantedFields.includes('lecture')) {
        query.populate('lecture verbose_name'); //here can be changed
      }
      if (wantedFields.includes('tutor')) {
        query.populate('tutor username'); //here can be changed
      }
      if (wantedFields.includes('students')) {
        query.populate('students username'); //here can be changed
      }
    }

  }
  else {
    query.populate('lecture', 'verbose_name');
    query.populate('tutor', ['first_name', 'last_name', 'username', 'bio', 'img_path']);
    query.populate('students username');
  }

  query.exec((err, tutorial) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!tutorial) {
      res.status(404).send();
      return;
    }
    else {
      res.json(tutorial);
    }
  })

  //whole => .populate('lecture', 'title').populate('tutor', ['first_name', 'last_name', 'img_path', 'username'])
  //description => .select('description -_id')

  // let wanted = req.headers['wanted'];
  // if (wanted === 'description') {
  //   Tutorial.findById(req.params.id).select('description -_id').exec((err, description) => {
  //     if (err) {
  //       res.send(err);
  //     }
  //     else {
  //       res.json(description);
  //     }
  //   });
  // }

  // let client_id = req.headers['whats_my_scope'];

  // Tutorial.findById(req.params.id).select('tutor students -_id').exec((err, tutorial) => {
  //   let tutorId = tutorial.tutor.toString();
  //   if (tutorId === client_id) {
  //     if (wanted === "whole") {
  //       Tutorial.findById(req.params.id).populate('lecture', 'title').populate('tutor', ['first_name', 'last_name', 'img_path', 'username']).exec((err, tutorial) => {
  //         if (err) {
  //           res.send(err);
  //         }
  //         else {
  //           res.append('Client_Scope', 'tutor');
  //           res.json(tutorial);
  //         }
  //       });
  //     }
  //     else {
  //       res.send('Invalid wanted header.');
  //     }
  //   } else if (tutorial.students.includes(client_id)) {
  //     if (wanted === 'whole') {
  //       Tutorial.findById(req.params.id).populate('lecture', 'title').populate('tutor', ['first_name', 'last_name', 'img_path', 'username']).exec((err, tutorial) => {
  //         if (err) {
  //           res.send(err);
  //         }
  //         else {
  //           res.append('Client_Scope', 'student');
  //           res.json(tutorial);
  //         }
  //       });
  //     }
  //     else {
  //       res.send('Invalid wanted header.');
  //     }
  //   } else {
  //     if (wanted === 'whole') {
  //       Tutorial.findById(req.params.id).populate('lecture', 'title').populate('tutor', ['first_name', 'last_name', 'img_path', 'username']).exec((err, tutorial) => {
  //         if (err) {
  //           res.send(err);
  //         }
  //         else {
  //           res.append('Client_Scope', 'visitor');
  //           res.json(tutorial);
  //         }
  //       });
  //     }
  //     else {
  //       res.send('Invalid wanted header.');
  //     }
  //   }
  // });
};

exports.update_a_tutorial = (req, res) => {
  var userInToken = req.user.userID;
  let action = req.headers['action'];
  console.log(action);
  console.log(userInToken);

  var query = Tutorial.findById(req.params.id);

  query.exec((err, tutorial) => {
    if (err) {
      res.send(err);
    }
    else if (!tutorial) {
      res.status(404).send();
    }
    else {
      switch (action) {
        case "join":
          if (
            tutorial.class_size > tutorial.students.length
          ) {
            Tutorial.findOneAndUpdate(
              { _id: tutorial._id },
              { $addToSet: { students: [userInToken] } },
              { new: false },
              (err) => {
                if (err) res.send(err);
              }
            );
            res.status(200).send();
          }
          else {
            res.json({ message: "Sorry, the tutorial is full." });
          }
          break;
        case "quit":
          Tutorial.findOneAndUpdate(
            { _id: tutorial._id },
            { $pullAll: { students: [userInToken] } },
            { new: false },
            (err, tutorial) => {
              if (err) res.send(err);
              //else if (tutorial.tutor != userInToken) res.status(401).send({ message: "Unauthorized access" });
            }
          );
          res.status(200).send();
          break;
        default:
          if (tutorial.tutor != userInToken) res.status(401).send({ message: "Unauthorized access" });
          else {
            Tutorial.findOneAndUpdate(
              { _id: tutorial._id },
              req.body,
              { new: true },
              (err, tutorial) => {
                if (err) res.send(err);
                res.json(tutorial);
              }
            );
          }
          break;
      }
    }
  })

  // Tutorial.findById(req.params.id, (err, tutorial) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   else if (!tutorial) {
  //     res.status(404).send();
  //   }
  //   else if (action === "join") {
  //     Tutorial.findOneAndUpdate(
  //       { _id: tutorial._id },
  //       { $addToSet: { students: [userInToken] } },
  //       { new: false },
  //       (err) => {
  //         if (err) res.send(err);
  //       }
  //     );
  //     res.status(200).send();
  //   }
  //   else if (action === "quit") {
  //     Tutorial.findOneAndUpdate(
  //       { _id: tutorial._id },
  //       { $pullAll: { students: [userInToken] } },
  //       { new: false },
  //       (err, tutorial) => {
  //         if (err) res.send(err);
  //         else if (tutorial.tutor != userInToken) res.status(401).send({ message: "Unauthorized access" });
  //       }
  //     );
  //     res.status(200).send();
  //   }
  //   else if (tutorial.tutor != userInToken) {
  //     res.status(401).send({ message: "Unauthorized access" })
  //   }
  //   Tutorial.findOneAndUpdate(
  //     { _id: tutorial._id },
  //     req.body,
  //     { new: true },
  //     (err, tutorial) => {
  //       if (err) res.send(err);
  //       else if (tutorial.tutor != userInToken) res.status(401).send({ message: "Unauthorized access" });
  //     }
  //   );
  // })
};

exports.delete_a_tutorial = (req, res) => {
  var userInToken = req.user.userID;
  Tutorial.findById(req.params.id, (err, tutorial) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!tutorial) {
      res.status(404).send();
      return;
    }
    if (tutorial.tutor != userInToken) {
      res.status(401).send({ message: "Unauthorized access" })
      return;
    }
    Tutorial.deleteOne({ _id: tutorial._id }, err => {
      if (err) res.send(err);
      else {
        let errRef = removeRefUsers(tutorial._id)
        if (errRef) {
          res.send(err);
          return
        }
        res.json({
          message: 'tutorial successfully deleted.',
          _id: req.params.id
        });
      }
    });
  })
};

exports.search_tutorials = (req, res) => {

  const query = req.params.query;

  if (!query) { next(); }
  else {
    Tutorial.find({ $text: { $search: query } }).populate('lecture', ['name']).populate('tutor', ['img_path', 'first_name', 'last_name', 'username']).exec((err, tutorials) => {
      if (err) {
        res.send(err);
        return;
      }
      else if (!tutorials) {
        res.status(404).send();
        return;
      }
      else {
        res.json(tutorials);
      }
    })
  }
}