"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _index = _interopRequireDefault(require("./models/index.js"));

var _index2 = _interopRequireDefault(require("./routes/index.js"));

if (process.env.NODE_ENV !== 'production') {
  _dotenv["default"].config();
}

var json = _express["default"].json,
    urlencoded = _express["default"].urlencoded;
var mongoose = _index["default"].mongoose,
    url = _index["default"].url;
var app = (0, _express["default"])();
var corsOptions = {
  origin: 'http://localhost:3000'
};
app.use((0, _cors["default"])(corsOptions)); // parse requests of content-type - application/json

app.use(json({
  limit: '30mb',
  extended: true
})); // parse requests of content-type - application/x-www-form-urlencoded

app.use(urlencoded({
  limit: '30mb',
  extended: true
}));
app.use(_passport["default"].initialize());
app.use('/api', _index2["default"]);
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Connected to the database!');
})["catch"](function (err) {
  console.log('Cannot connect to the database!', err);
  process.exit();
});
mongoose.set('useFindAndModify', false); // set port, listen for requests

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT, "."));
});