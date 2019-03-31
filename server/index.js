/* eslint consistent-return:0 import/order:0 */
/* eslint-disable no-console */
// const Bulb = require('../app/containers/Bulb');
const express = require('express');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

const app = express();
const router = require('./middlewares/api');
const bodyParser = require('body-parser');

/* API */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', router);

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://yaboiadmin:yaboi12345password@ds036069.mlab.com:36069/yaboilight',
);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

/* UDP Server */
const config = {
  multicastHost: '239.255.255.250',
  multicastPort: 1982,
};

const bulbs = [];
const intKeys = ['bright', 'color_mode', 'ct', 'fw_ver', 'hue', 'rgb', 'sat'];
const dgram = require('dgram');
const udp4Server = dgram.createSocket('udp4');

udp4Server.on('listening', () => {
  // udp4Server.addMembership(config.multicastHost);
  const address = udp4Server.address();
  console.log(`UDP4 Server Listening on ${address.address}:${address.port}`);
});
udp4Server.on('error', err => {
  console.error(`UDP4 Server Error: ${err.stack}`);
});
udp4Server.on('message', (msg, remote) => {
  console.log(`Server got: ${msg} from ${remote.address}:${remote.port}`);
});

function b64Decode(encodedStr) {
  return Buffer.from(encodedStr, 'base64').toString();
}

const message = Buffer.from(
  'M-SEARCH * HTTP/1.1\r\n' +
    'HOST: 239.255.255.250:1982\r\n' +
    'MAN: "ssdp:discover"\r\n' +
    'ST: wifi_bulb\r\n',
);

const pingTimeout = setTimeout(() => {
  udp4Server.close();
  // callback(null);
}, 10000);

const udp4Client = dgram.createSocket('udp4');
udp4Client.on('message', (msg, rinfo) => {
  console.log(`Client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  udp4Client.close();
  clearTimeout(pingTimeout);

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
  bulbs.push(newBulbInfo);

  // callback(bulbs);
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
      clearTimeout(pingTimeout);
      // callback(null);
    }
  },
);

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

udp4Server.bind(config.multicastPort, () => {
  udp4Server.addMembership(config.multicastHost);
});
