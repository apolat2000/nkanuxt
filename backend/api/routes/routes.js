const auth = require('../controllers/authController');

const tutorialController = require('../controllers/tutorialController');
const discussionController = require('../controllers/discussionController');
const userController = require('../controllers/userController');
const lectureController = require('../controllers/lectureController');
const docController = require('../controllers/docController')
const announcementController = require('../controllers/announcementController');
const courseOfStudyBulder = require('../controllers/courseOfStudyController');
const exploreController = require('../controllers/exploreController');
const statisticsController = require('../controllers/statisticsController');

const multer = require('multer');

const ppFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
};

const ppStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './profilepics/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "_" + file.originalname.replace(/ +/g, ""))
  }
});

const uploadPp = multer({
  storage: ppStorage,
  limits: {
    fileSize: 1024 * 1024 * 5 //5mb
  },
  ppFilter
});

const docFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './docs/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "_" + file.originalname.replace(/ +/g, ""))
  }
});

const uploadDoc = multer({
  storage: docStorage,
  limits: {
    fileSize: 1024 * 1024 * 16 //16mb
  },
  docFilter
});

module.exports = (app, guard) => {  //Add guard to all get/post requests where the user has to be authenticated

  app
    .route('/user/:id/:fields*?')
    .get(guard, userController.read_a_user)
    .put(guard, uploadPp.single('img'), userController.update_a_user)
    .delete(userController.delete_a_user);

  app
    .route('/users/is-no-query/:fields*?')
    .get(userController.list_all_users)
    .post(uploadPp.single('img'), userController.create_a_user);

  app
    .route('/users/is-query/:query')
    .get(userController.search_users);


  app
    .route('/tutorial/:id/:fields*?')
    .get(guard, tutorialController.read_a_tutorial)
    .head(guard, tutorialController.client_scope)
    .put(guard, uploadPp.single('img'), tutorialController.update_a_tutorial)
    .delete(tutorialController.delete_a_tutorial);

  app
    .route('/tutorials/is-no-query/:fields*?')
    .get(guard, tutorialController.list_all_tutorials)
    .post(guard, uploadPp.single('img'), tutorialController.create_a_tutorial);

  app
    .route('/tutorials/is-query/:query')
    .get(guard, tutorialController.search_tutorials);


  app
    .route('/courses-of-study/is-no-query/:fields*?')
    .get(courseOfStudyBulder.list_all_cos);



  app
    .route('/docs/:tutorialId')
    .get(guard, docController.list_all_docs)
    .put(guard, uploadDoc.single('doc'), docController.update_a_doc)
    .post(guard, uploadDoc.single('doc'), docController.create_a_doc);

  app
    .route('/discussion/:tutorialId')
    .post(guard, discussionController.create_a_comment)
    .get(guard, discussionController.list_all_comments)
    .put(guard, discussionController.update_a_comment)
    .delete(guard, discussionController.delete_a_comment);

  // app
  //   .route('/courses-of-study/:query')
  //   .get(guard, courseOfStudyBulder.list_search_results);

  app
    .route('/announcement/:tutorialId')
    .post(guard, announcementController.create_an_announcement)
    .get(guard, announcementController.list_all_announcements);
  //   .put(guard, announcementController.update_an_announcement)
  //   .delete(guard, announcementController.delete_an_announcement);

  app
    .route('/lectures/is-no-query/:fields*?')
    .get(lectureController.list_all_lectures);

  app
    .route('/explore/search/:query/:cos/:filters')
    .get(exploreController.list_search_results);

  // app
  //   .route('/explore/recommendations')
  //   .get(exploreController.recommend);

  app
    .route('/statistics/visit/:what/:id')
    .put(guard, statisticsController.visit_update)

  app
    .route('/lecture/:lectureId')
    .get(lectureController.read_a_lecture)

  app
    .route('/login')
    .post(auth.login)

  app
    .route('/verifyRefreshToken')
    .post(auth.verifyRefreshToken)

  app
    .route('/verifyTokenSalt')
    .post(guard, auth.verifyTokenSalt)

  app
    .route('/updatePassword')
    .post(guard, auth.updatePassowrd)

  app
    .route('/forgotPassowrd')
    .post(auth.generatePassToken)

};