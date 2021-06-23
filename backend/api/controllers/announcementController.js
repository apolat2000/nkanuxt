const mongoose = require('mongoose');
const Announcement = mongoose.model('Announcements');
const Tutorial = mongoose.model('Tutorials');

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.create_an_announcement = (req, res) => {
    let userInToken = req.user.userID;
    let tutorialId = req.params.tutorialId;

    Tutorial.findById(tutorialId).select('tutor').exec((err, tutorial) => {
        if ("" + tutorial.tutor._id === userInToken) {
            var newAnnouncement = new Announcement(req.body);
            newAnnouncement.tutorialId = tutorialId;
            newAnnouncement.save((err, announcement) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(announcement);
                }
            });
        }
    })
};

exports.list_all_announcements = (req, res) => {

    let where = req.headers['page'];
    let myTutId = req.params.tutorialId;

    if (where === "summary") {

        Announcement.find({ tutorialId: myTutId }).sort({importance: -1}).limit(4).exec((err, announcement) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(announcement);
            }
        });

    } else if (where === "homepage") {

    } else if (where === "announcements") {
        Announcement.find({ tutorialId: myTutId }).sort({_id: -1}).exec((err, announcement) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(announcement);
            }
        });
    }

};

exports.update_an_announcement = (req, res) => {
    var userInToken = req.user.userID;
    Discussion.findById(req.body.announcementId, (err, announcement) => {
        if (err) {
            res.send(err);
            return;
        }
        else if (!announcement) {
            res.status(404).send();
            return;
        }
        else if (announcement.userId != userInToken) {
            res.status(401).send({ message: "Unauthorized access" })
            return;
        }
        Discussion.findOneAndUpdate(
            { _id: announcement._id },
            req.body,
            { new: true },
            (err, announcement) => {
                if (err) res.send(err);
                else if (announcement.userId != userInToken) res.status(401).send({ message: "Unauthorized access" })
                res.json(announcement);
            }
        );
    })
};

exports.delete_an_announcement = (req, res) => {
    var userInToken = req.user.userID;
    Discussion.findById(req.headers['announcementid'], (err, announcement) => {
        if (err) {
            res.send(err);
            return;
        }
        if (!announcement) {
            res.status(404).send();
            return;
        }
        if (announcement.userId != userInToken) {
            res.status(401).send({ message: "Unauthorized access" })
            return;
        }
        Discussion.deleteOne({ _id: announcement._id }, err => {
            if (err) res.send(err);
            else {
                res.json({
                    message: 'Comment successfully deleted.',
                });
            }
        });
    })
};
