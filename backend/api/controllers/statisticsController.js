const mongoose = require('mongoose');

const Correlations = mongoose.model('Correlations');
const UserStatistics = mongoose.model('UserStatistics');

exports.visit_update = (req, res) => {
    const what = req.params.what; // "user" or "tutorial"
    const id = req.params.id;
    const userInToken = req.user.userID;

    console.log(what);
    console.log(id);
    console.log(userInToken);

    const subObject = what === "user" ? { visited_users: [{ usr: id }] } : { visited_tutorials: [{ tut: id }] }

    UserStatistics.findOneAndUpdate(
        { _id: userInToken },
        { $addToSet: subObject },
        { new: true, upsert: true },
        (err, doc) => {
            if (err) res.send(err);
            console.log(doc);
        }
    );
}