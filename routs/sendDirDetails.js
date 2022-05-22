const { Router } = require('express'),
  { readDirDetails } = require('../api/readDir'),
  { normalize: normalizePath } = require('path');

const route = Router();

route.get('/get-dir-details', (req, res) => {
  let folderPath = normalizePath(req.headers['get-folder-path']);
  readDirDetails(folderPath, (err, files) => {
    if (err) {
      res.json({ path: folderPath, error: err });
    } else {
      res.json(files);
    }
  });
});

exports.route = route;
