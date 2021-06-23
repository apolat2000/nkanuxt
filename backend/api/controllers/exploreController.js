const mongoose = require('mongoose');
const strsim = require('string-similarity')

const C_o_S = mongoose.model('CoursesOfStudy');
const Lecture = mongoose.model('Lectures');
const Discussion = mongoose.model('Discussions');
const Doc = mongoose.model('Docs');
const Announcement = mongoose.model('Announcements');
const Tutorial = mongoose.model('Tutorials');
const User = mongoose.model('Users');

const isSameCoS = (cosInDocument) => "" + cosInDocument._id === cos;

function someFunction(externalParameter, element) {
    return ("" + element._id === externalParameter)
}

exports.list_search_results = (req, res) => {
    const query = req.params.query;
    const cos = "" + req.params.cos;
    if (req.params.filters) {
        var wantedFields = req.params.filters.split('-');
    }

    //console.log(wantedFields);
    var promisedArray = [];

    if (wantedFields.includes("tutorials")) {
        promisedArray.push(Tutorial.find({ $text: { $search: query } }).select('class_size tutor students lecture title first_date frequency description join_freely').populate('lecture', ['name', 'courses_of_study']).populate('tutor', ['img_path', 'first_name', 'last_name', 'username']))
    } else {
        promisedArray.push([])
    }
    if (wantedFields.includes("users")) {
        promisedArray.push(User.find({ $text: { $search: query } }).select('courses_of_study bio expert_of_lectures img_path first_name last_name username email').populate({path:"courses_of_study", model:"CoursesOfStudy"}).populate({path: 'expert_of_lectures', model: 'Lectures'}))
    } else {
        promisedArray.push([])
    }
    if (wantedFields.includes("lectures")) {
        promisedArray.push(Lecture.find({ $text: { $search: query } }))
    } else {
        promisedArray.push([])
    }
    if (wantedFields.includes("coses")) {
        promisedArray.push(C_o_S.find({ $text: { $search: query } }))
    } else {
        promisedArray.push([])
    }

    Promise.all(promisedArray)
        .then(results => {

            //console.log(results);
            var [tuts, usrs, coses, lecs] = results;

            if (cos === "all") {
                //...
            }
            else {

                tuts = tuts.filter(t => t.lecture.courses_of_study.some(someFunction.bind(null, cos))); //see if one of the cos'es of the lecture of the tutorial is the queried cos.

                usrs = usrs.filter(u => u.courses_of_study.some(function (c) {
                    return "" + c._id === cos
                })); //see if one of the cos'es of the user is the queried cos.)

                coses = coses.filter(c => "" + c._id === cos);

                console.log(lecs); // IS EMPTY!!!

                lecs = lecs.filter(l => "" + l.courses_of_study.some(someFunction.bind(null, cos))); //see if one of the cos'es of the lecture of the tutorial is the queried cos.

            }

            var resObj = {
                tuts: tuts,
                usrs: usrs,
                coses: coses,
                lecs: lecs
            }

            //console.log(resObj);

            res.json(resObj);


        })
        .catch(err => {
            console.error("Something went wrong", err);
        })
}