const { Router } = require('express'),
  { join, basename, normalize } = require('path'),
  zip = require('express-zip');

const route = Router();
const baseDir = process.cwd();

route.get('/download-single-file/*', (req, res) => {
  let t = normalize(req.params[0]),
    filepath = join(baseDir, t),
    filename = basename(filepath);
  res.download(t, filename);
});

route.post('/download-multiple-files', (req, res) => {
  res.zip(req.body);
});

exports.route = route;
