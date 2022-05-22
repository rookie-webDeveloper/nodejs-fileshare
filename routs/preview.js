const { Router } = require('express'),
  { lstat: fsLstat, createReadStream: fsCreateReadStream } = require('fs'),
  { join: joinPath, normalize: normalizePath } = require('path'),
  { contentType: fileContentType } = require('mime-types');

const route = Router();

const videoExt = ['.mp4'];

const baseDir = process.cwd();

/**
 * 
 * @param {Path} filePath file path
 * @param {string} fileExt file extension
 * @param {Request} req express request object
 * @param {Response} res express respose object 
 */
function setHeadersForFile(filePath, fileExt, req, res) {
  fsLstat(filePath, (err, stats) => {
    if (err) {
      res.json({ path: filePath, error: err });
    } else {
      if (videoExt.indexOf(fileExt) > -1) {
        const contentType = fileContentType(fileExt),
          range = req.headers.range,
          chuck = 20 ** 6,
          fileSize = stats.size,
          start = Number(range.replace(/\D/g, '')), //remove all chars
          end = Math.min(start + chuck, fileSize - 1),
          contentLength = end - start + 1;
        headers = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Content-Length': contentLength,
          'Accept-Ranges': 'bytes',
          'Content-Type': contentType,
        };
        res.writeHead(206, headers);
        fsCreateReadStream(filePath, { start, end }).pipe(res);
      } else {
        res.sendFile(filePath);
      }
    }
  });
}

route.get('/stream-file-preview/*.:ext', (req, res, next) => {
  let fileExt = '.' + req.params.ext,
    filePath = joinPath(baseDir, normalizePath(req.params[0] + fileExt));
  setHeadersForFile(filePath, fileExt, req, res);
});

exports.route = route;
