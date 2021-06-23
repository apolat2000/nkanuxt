const mongoose = require('mongoose');
const C_o_S = mongoose.model('CoursesOfStudy');

exports.read_a_cos = (req, res) => {

  const query = req.params.query;

  C_o_S.find({ $text: { $search: query } })

};

exports.list_all_cos = (req, res) => {

  var query = C_o_S.find();

  if (req.params.fields) {
    const wantedFields = req.params.fields.replace(/-/g, ' ');
    query.select(wantedFields);
  }

  query.exec((err, coses) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!coses) {
      res.status(404).send();
      return;
    }
    else {
      console.log(coses);
      res.json(coses);
    }
  })
};