#! /usr/bin/env node

const
  path = require('path'),
  ansi = require('./api/ansi'),
  config = require('./config'),
  express = require('express'),
  uploadRouts = require('./routs/upload'),
  previewRouts = require('./routs/preview'),
  downloadRouts = require('./routs/download'),
  sendDirDetails = require('./routs/sendDirDetails'),
  getIP4Address = require('./api/ipAddress').getIP4Address;

function startServer(address) {
  const app = express();
  app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    express.static(path.join(__dirname, 'static')),
    previewRouts.route,
    downloadRouts.route,
    uploadRouts.route,
    sendDirDetails.route
  );

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  const QRCode = require('qrcode');
  const opts = {
    errorCorrectionLevel: 'H',
    type: 'terminal',
    quality: 1,
  };

  app.listen(config.port, function () {
    console.log(`   ${ansi.FgYellow}${address}${ansi.Reset}`);
    QRCode.toString(address, opts).then(t => console.log(t));
  });
}

getIP4Address('Wi-Fi').then(address => {
  startServer(`http://${address}:${config.port}/`);
}).catch(() => {
  console.log(
    `\n\t${ansi.BgRed}Please Connect to Wi-Fi and Restart App${ansi.Reset}\n`
  );
  process.exit();
})