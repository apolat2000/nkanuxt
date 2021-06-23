const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
global.schemas = require('./api/models/schemas');
const routes = require('./api/routes/routes');
const auth = require('./api/middlewares/authentication');

const corsOptions = {
  exposedHeaders: 'Client_Scope',
};

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb+srv://aPolat:sTjcFxI1Yv1RPZJx@cluster0.rdxhc.mongodb.net/NKA?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//const port = process.env.PORT || 3000;
const port = 5000;
console.log("Port: " + port);
const app = express();

dotenv.config();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/profilepics', express.static('profilepics'))
routes(app,auth.authenticateToken);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);