const { networkInterfaces } = require('os');

const net = networkInterfaces();

function getIP4Address(interFaceName) {
  return new Promise((resolve, reject) => {
    if (net.hasOwnProperty(interFaceName)) {
      resolve(net[interFaceName].filter(obj => {
        return obj.family == 'IPv4';
      })[0].address);
    } else
      reject();
  })
}

exports.getIP4Address = getIP4Address;