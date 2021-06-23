const mongoose = require('mongoose');
const Lecture = mongoose.model('Lectures');

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_lectures = (req, res) => {
  var query = Lecture.find();

  if (req.params.fields) {
    const wantedFields = req.params.fields.replace(/-/g, ' ');
    query.select(wantedFields + ' -_id');
    if (wantedFields.includes('courses_of_study')) {
      query.populate('courses_of_study', ['name', 'verbose_name']);
    }
  }
  else {
    query.populate('courses_of_study', ['name', 'verbose_name']);
  }

  query.exec((err, lectures) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!lectures) {
      res.status(404).send();
      return;
    }
    else {
      console.log(lectures);
      res.json(lectures);
    }
  })
};


exports.read_a_lecture = (req, res) => {
  
  Lecture.findById(req.params.lectureId).exec((err, lecture) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!lecture) {
      res.status(404).send();
      return;
    }
    // else if (user._id != userInToken) {
    //   res.status(401).send({ message: "Unauthorized access" })
    //   return;
    // }
    else{
      res.json(lecture);
    } 
  });
};