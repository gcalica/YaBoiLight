/* eslint-disable no-console */
// import Bulb from '../Bulb';
// const dgram = require('dgram');
// const net = require('net');
// import port from '../../../server/port';
// const WebSocket = require('isomorphic-ws');
// function b64Encode(str) {
//   return Buffer.from(str).toString('base64');
// }

// function b64Decode(encodedStr) {
//   return Buffer.from(encodedStr, 'base64').toString();
// }
//
export default class Yeelight {
  //   config = {
  //     multicastHost: '239.255.255.250',
  //     multicastPort: 1982,
  //   };
  //
  //   discoverBulbs(callback) {
  //     const bulbs = [];
  //
  //     const intKeys = [
  //       'bright',
  //       'color_mode',
  //       'ct',
  //       'fw_ver',
  //       'hue',
  //       'rgb',
  //       'sat',
  //     ];
  //
  //     const message = Buffer.from(
  //       'M-SEARCH * HTTP/1.1\r\n' +
  //         'HOST: 239.255.255.250:1982\r\n' +
  //         'MAN: "ssdp:discover"\r\n' +
  //         'ST: wifi_bulb\r\n',
  //     );
  //
  //     const pingTimeout = setTimeout(() => {
  //       client.close();
  //       callback(null);
  //     });
  //
  //     const client = dgram.createSocket('udp4');
  //     client.on('message', (msg, rinfo) => {
  //       console.log(`Client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  //       client.close();
  //       clearTimeout(pingTimeout);
  //
  //       const newBulbInfo = {};
  //
  //       const splitMsg = msg.toString().split('\r\n');
  //       const slicedMsg = splitMsg.slice(1, msg.length - 1);
  //
  //       // Message to object
  //       slicedMsg.forEach(line => {
  //         const key = line.substr(0, line.indexOf(':')).trim();
  //         const value = line.substr(line.indexOf(':') + 1).trim();
  //
  //         if (intKeys.includes(key)) {
  //           newBulbInfo[key] = parseInt(value, 10);
  //         } else if (key === 'name') {
  //           newBulbInfo[key] = b64Decode(value);
  //         } else if (key === 'support') {
  //           newBulbInfo[key] = value.split(' ');
  //         } else {
  //           newBulbInfo[key] = value;
  //         }
  //
  //         // Put additional ip and port info
  //         if (key === 'Location') {
  //           const bulbUrl = value.replace('yeelight://', '');
  //           const [bulbIp, bulbPort] = bulbUrl.split(':');
  //           newBulbInfo.ip = bulbIp.trim();
  //           newBulbInfo.port = parseInt(bulbPort.trim(), 10);
  //         }
  //       });
  //
  //       bulbs.push(new Bulb(newBulbInfo));
  //       callback(bulbs);
  //     });
  //
  //     client.send(
  //       message,
  //       0,
  //       message.length,
  //       this.config.multicastPort,
  //       this.config.multicastHost,
  //       err => {
  //         if (err) {
  //           client.close();
  //           clearTimeout(pingTimeout);
  //           callback(null);
  //         }
  //       },
  //     );
  // const socketProtocol =
  //   window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  // const socketPort = window.location.port !== '' ? port : '';
  // let echoSocketUrl;
  // if (socketPort !== '') {
  //   echoSocketUrl = `${socketProtocol}//${
  //     window.location.hostname
  //   }:${socketPort}/`;
  // } else {
  //   echoSocketUrl = `${socketProtocol}//${window.location.hostname}`;
  // }
  // console.log(echoSocketUrl);
  // const client = new WebSocket(echoSocketUrl);
  // const pingTimeout = setTimeout(() => {
  //   client.close();
  //   callback(null);
  // }, 10000 + 5000);
  //
  // client.onopen = () => {
  //   console.log('Websocket Client Connection Opened');
  //   client.send(message, Object.create({}), null);
  // };
  //
  // client.onmessage = msg => {
  //   console.log('Message received');
  //   console.log(msg);
  //   client.close();
  //   clearTimeout(pingTimeout);
  //
  //   const newBulbInfo = {};
  //
  //   const splitMsg = msg.toString().split('\r\n');
  //   const newMessage = splitMsg.slice(1, msg.length - 1);
  //
  //   // Message to object
  //   newMessage.forEach(line => {
  //     const key = line.substr(0, line.indexOf(':')).trim();
  //     const value = line.substr(line.indexOf(':') + 1).trim();
  //
  //     if (intKeys.includes(key)) {
  //       newBulbInfo[key] = parseInt(value, 10);
  //     } else if (key === 'name') {
  //       newBulbInfo[key] = b64Decode(value);
  //     } else if (key === 'support') {
  //       newBulbInfo[key] = value.split(' ');
  //     } else {
  //       newBulbInfo[key] = value;
  //     }
  //
  //     // Put additional ip and port info
  //     if (key === 'Location') {
  //       const bulbUrl = value.replace('yeelight://', '');
  //       const [bulbIp, bulbPort] = bulbUrl.split(':');
  //       newBulbInfo.ip = bulbIp.trim();
  //       newBulbInfo.port = parseInt(bulbPort.trim(), 10);
  //     }
  //   });
  //
  //   console.log(newBulbInfo);
  //   bulbs.push(new Bulb(newBulbInfo));
  //   callback(bulbs);
  // };
  //
  // client.onclose = () => {
  //   console.log('WebSocket Client Connection Closed');
  //   clearTimeout(pingTimeout);
  // };
  // const discoveryTimeout = setTimeout(() => {
  //   socket.close(3000, 'closing');
  //   callback(null);
  // }, 10000);
  // }
  //
  // sendCommand(ip, port, command, callback) {
  //   // Callback returns success:boolean
  //   const socketProtocol =
  //     window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  //   const socketPort = window.location.port !== '' ? port : '';
  //   let echoSocketUrl;
  //   if (socketPort !== '') {
  //     echoSocketUrl = `${socketProtocol}//${
  //       window.location.hostname
  //     }:${socketPort}/`;
  //   } else {
  //     echoSocketUrl = `${socketProtocol}//${window.location.hostname}`;
  //   }
  //
  //   const client = new WebSocket(echoSocketUrl);
  //   client.send(`${JSON.stringify(command)}\r\n`, Object.create({}), null);
  //   callback(false);
  // const client = net.createConnection(port, ip, () => {
  //   client.write(`${JSON.stringify(command)}\r\n`);
  // });
  // client.setTimeout(3000, () => {
  //   client.destroy();
  //   callback(false);
  // });
  //
  // client.on('data', data => {
  //   client.destroy();
  //
  //   const response = JSON.parse(data.toString());
  //
  //   if (response.result !== undefined) {
  //     const success = response.result[0] === 'ok';
  //     callback(success);
  //   } else if (response.error !== undefined) {
  //     callback(false);
  //   }
  // });
  //
  // client.on('error', error => {
  //   client.destroy();
  //   console.log(error);
  //   callback(false);
  // });
  // }
  //
  // togglePower(ip, port, msgId, callback) {
  //   // Callback returns success:boolean
  //
  //   const command = {
  //     id: msgId,
  //     method: 'toggle',
  //     params: [],
  //   };
  //
  //   this.sendCommand(ip, port, command, callback);
  // }
}
