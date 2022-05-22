const multer = require('multer'),
  { join } = require('path'),
  { homedir } = require('os'),
  { Router } = require('express'),
  config = require('../config.json');

const route = Router();
if (config.destFolder) {
  destFolder = config.destFolder;
} else {
  destFolder = join(homedir(), 'Desktop', 'recived');
}

let storage = multer.diskStorage({
  destination: destFolder,
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).array('selected-files');

route.post('/upload-files', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      console.log(`files recived at ${destFolder}`);
      res.send('success');
    }
  });
});

exports.route = route;
