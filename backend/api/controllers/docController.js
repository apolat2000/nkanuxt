const mongoose = require('mongoose');
const Tutorial = mongoose.model('Tutorials');
const Doc = mongoose.model('Docs');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.create_a_doc = async (req, res) => {

    var userInToken = req.user.userID;
    let myTutId = req.params.tutorialId;

    if(req.file) {
        let docToCreate = new Doc({
            title: req.body.title,
            description: req.body.description,
            tut: myTutId,
            created_by: userInToken,
            visibility: req.body.visibility,
            doc_path: req.file.path
        });
        docToCreate.save((err, doc) => {
            if (err) {
                console.log(err);
                fs.unlink(req.file.path, ()=>{});
            }
            else {
                res.json(doc);
            }
        });
    }
    else {
        res.send('no file found')
    }
};

exports.update_a_doc = (req, res) => {
    var userInToken = req.user.userID;
    if(req.file) req.body.doc_path = req.file.path;
    else throw new Error('no file found');
    Doc.findById(req.body.docId, (err, doc) => {
      if (err) {
        res.send(err);
        return;
      }
      else if (!doc) {
        res.status(404).send();
        return;
      }
      else if (doc.created_by != userInToken) {
        res.status(401).send({ message: "Unauthorized access" })
        return;
      }
      Discussion.findOneAndUpdate(
        { _id: doc._id },
        req.body,
        { new: true },
        (err, doc) => {
          if (err) res.send(err);
          else if (doc.created_by != userInToken) res.status(401).send({ message: "Unauthorized access" })
          res.json(doc);
        }
      );
    })
  };

exports.list_all_docs = (req, res) => {
    let myScope = req.headers['scope'];
    let myTutId = req.params.tutorialId;
  
    if (myScope === 'global') {
      Doc.find({ tut: myTutId, visibility: 'ALL'}).exec((err, doc) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json(doc);
        }
      });
    } else if (myScope === 'student') {
      Doc.find({ tut: myTutId }).or([{visibility: {$in: ['ALL', 'CLASS']}}, {userId: req.user.userID}]).exec((err, doc) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json(doc);
        }
      });
    } else if (myScope === 'tutor') {
      Doc.find({ tut: myTutId }).or([{visibility: {$in: ['ALL', 'CLASS', 'TUTOR']}}, {userId: req.user.userID}]).exec((err, doc) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json(doc);
        }
      });
    }
  
  };