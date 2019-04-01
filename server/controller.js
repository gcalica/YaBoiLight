/* eslint-disable no-console */
const dgram = require('dgram');
// const Bulb = require('../app/containers/Bulb/index');

const config = {
  multicastHost: '239.255.255.250',
  multicastPort: 1982,
};

const message = Buffer.from(
  'M-SEARCH * HTTP/1.1\r\n' +
    'HOST: 239.255.255.250:1982\r\n' +
    'MAN: "ssdp:discover"\r\n' +
    'ST: wifi_bulb\r\n',
);

const bulbs = [];
const intKeys = ['bright', 'color_mode', 'ct', 'fw_ver', 'hue', 'rgb', 'sat'];

function b64Decode(encodedStr) {
  return Buffer.from(encodedStr, 'base64').toString();
}

function initServer() {
  const udp4Server = dgram.createSocket('udp4');

  udp4Server.on('listening', () => {
    const address = udp4Server.address();
    console.log(`UDP4 Server Listening on ${address.address}:${address.port}`);
  });
  udp4Server.on('error', err => {
    console.error(`UDP4 Server Error: ${err.stack}`);
  });
  udp4Server.on('message', (msg, rinfo) => {
    console.log(`Server ${rinfo.address}:${rinfo.port}:\n ${msg}`);
  });
  udp4Server.bind(config.multicastPort, () => {
    udp4Server.addMembership(config.multicastHost);
  });
}

function initClient() {
  const udp4Client = dgram.createSocket('udp4');
  const clientTimeout = setTimeout(() => {
    udp4Client.close();
  }, 10000);

  udp4Client.on('message', (msg, rinfo) => {
    console.log(`Client ${rinfo.address}:${rinfo.port}:\n ${msg}`);
    udp4Client.close();
    clearTimeout(clientTimeout);

    const newBulbInfo = {};
    const splitMsg = msg.toString().split('\r\n');
    const slicedMsg = splitMsg.slice(1, msg.length - 1);

    // Message to object
    slicedMsg.forEach(line => {
      const key = line.substr(0, line.indexOf(':')).trim();
      const value = line.substr(line.indexOf(':') + 1).trim();

      if (intKeys.includes(key)) {
        newBulbInfo[key] = parseInt(value, 10);
      } else if (key === 'name') {
        newBulbInfo[key] = b64Decode(value);
      } else if (key === 'support') {
        newBulbInfo[key] = value.split(' ');
      } else {
        newBulbInfo[key] = value;
      }

      // Put additional ip and port info
      if (key === 'Location') {
        const bulbUrl = value.replace('yeelight://', '');
        const [bulbIp, bulbPort] = bulbUrl.split(':');
        newBulbInfo.ip = bulbIp.trim();
        newBulbInfo.port = parseInt(bulbPort.trim(), 10);
      }
    });
    // bulbs.push(new Bulb(newBulbInfo));
  });

  udp4Client.send(
    message,
    0,
    message.length,
    config.multicastPort,
    config.multicastHost,
    err => {
      if (err) {
        udp4Client.close();
        clearTimeout(clientTimeout);
      }
    },
  );
}

module.exports = {
  initServer,
  initClient,
};
