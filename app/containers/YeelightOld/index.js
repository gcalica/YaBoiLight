// import { Buffer } from 'buffer';
// // import WebSocket from 'ws';
// import Bulb from '../Bulb';
// const buffer = Buffer;
// const net = require('net');
// // const app = require('../../../server/index');
// function b64Encode(str) {
//   return Buffer.from(str).toString('base64');
// }
//
// function b64Decode(encodedStr) {
//   return Buffer.from(encodedStr, 'base64').toString();
// }
//
// export default class Yeelight {
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
//     // Yeelight discover message
//     const message = buffer.from(
//       'M-SEARCH * HTTP/1.1\r\n' +
//         'HOST: 239.255.255.250:1982\r\n' +
//         'MAN: "ssdp:discover"\r\n' +
//         'ST: wifi_bulb\r\n',
//     );
//
//     // const wss = new WebSocket.Server({ server });
//
//     // const wss = new WebSocket.Server({ port: this.config.multicastPort });
//
//     // app.ws('/', (ws, req) => {
//     //   ws.on('open', () => {
//     //     ws.send(message);
//     //   });
//     //
//     //   ws.on('message', msg => {
//     //     clearTimeout(discoveryTimeout);
//     //     const newBulbInfo = {};
//     //
//     //     const splitMsg = msg.toString().split('\r\n');
//     //     const newMessage = splitMsg.slice(1, msg.length - 1);
//     //
//     //     // Message to object
//     //     newMessage.forEach(line => {
//     //       const key = line.substr(0, line.indexOf(':')).trim();
//     //       const value = line.substr(line.indexOf(':') + 1).trim();
//     //
//     //       if (intKeys.includes(key)) {
//     //         newBulbInfo[key] = parseInt(value, 10);
//     //       } else if (key === 'name') {
//     //         newBulbInfo[key] = b64Decode(value);
//     //       } else if (key === 'support') {
//     //         newBulbInfo[key] = value.split(' ');
//     //       } else {
//     //         newBulbInfo[key] = value;
//     //       }
//     //
//     //       // Put additional ip and port info
//     //       if (key === 'Location') {
//     //         const bulbUrl = value.replace('yeelight://', '');
//     //         const [bulbIp, bulbPort] = bulbUrl.split(':');
//     //         newBulbInfo.ip = bulbIp.trim();
//     //         newBulbInfo.port = parseInt(bulbPort.trim(), 10);
//     //       }
//     //     });
//     //
//     //     bulbs.push(new Bulb(newBulbInfo));
//     //     callback(bulbs);
//     //   });
//     //
//     //   ws.on('close', () => {
//     //     console.log('WebSocket was closed');
//     //   });
//     // });
//
//     const socketProtocol =
//       window.location.protocol === 'https:' ? 'wss:' : 'ws:';
//     const echoSocketUrl = `${socketProtocol}//${
//       window.location.hostname
//     }:3000/`;
//     const socket = new WebSocket(echoSocketUrl);
//
//     const discoveryTimeout = setTimeout(() => {
//       socket.close(3000, 'closing');
//       callback(null);
//     }, 10000);
//
//     socket.onopen = () => {
//       socket.send(message);
//     };
//
//     socket.onmessage = msg => {
//       // socket.close();
//       clearTimeout(discoveryTimeout);
//       const newBulbInfo = {};
//
//       const splitMsg = msg.toString().split('\r\n');
//       const newMessage = splitMsg.slice(1, msg.length - 1);
//
//       // Message to object
//       newMessage.forEach(line => {
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
//     };
//
//     socket.onclose = () => {
//       console.log('websocket closed');
//     };
//
//     // let client = dgram.createSocket('udp4');
//     // client.on('error', err => {
//     //   console.log(`Server Error:\n${err.stack}`);
//     //   client.close();
//     // });
//
//     // client.on('message', (msg, rinfo) => {
//     //   // clearTimeout(discoveryTimeout);
//     //   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
//     //
//     //   const newBulbInfo = {};
//     //
//     //   const splitMsg = msg.toString().split('\r\n');
//     //   const newMessage = splitMsg.slice(1, msg.length - 1);
//     //
//     //   // Message to object
//     //   newMessage.forEach(line => {
//     //     const key = line.substr(0, line.indexOf(':')).trim();
//     //     const value = line.substr(line.indexOf(':') + 1).trim();
//     //
//     //     if (intKeys.includes(key)) {
//     //       newBulbInfo[key] = parseInt(value, 10);
//     //     } else if (key === 'name') {
//     //       newBulbInfo[key] = b64Decode(value);
//     //     } else if (key === 'support') {
//     //       newBulbInfo[key] = value.split(' ');
//     //     } else {
//     //       newBulbInfo[key] = value;
//     //     }
//     //
//     //     // Put additional ip and port info
//     //     if (key === 'Location') {
//     //       const bulbUrl = value.replace('yeelight://', '');
//     //       const [bulbIp, bulbPort] = bulbUrl.split(':');
//     //       newBulbInfo.ip = bulbIp.trim();
//     //       newBulbInfo.port = parseInt(bulbPort.trim(), 10);
//     //     }
//     //   });
//     //
//     //   bulbs.push(new Bulb(newBulbInfo));
//     //   callback(bulbs);
//     // });
//
//     // client.on('listening', () => {
//     //   const address = client.address();
//     //   console.log(`server listening ${address.address}:${address.port}`);
//     // });
//
//     // client.bind(this.config.multicastPort);
//
//     // Send multicast udp
//     // client.send(
//     //   message,
//     //   0,
//     //   message.length,
//     //   this.config.multicastPort,
//     //   this.config.multicastHost,
//     //   (err, bytes) => {
//     //     if (err) {
//     //       client.close();
//     //       clearTimeout(discoveryTimeout);
//     //       callback(null);
//     //     }
//     //   },
//     // );
//   }
//
//   sendCommand(ip, port, command, callback) {
//     // Callback returns success:boolean
//
//     const client = net.createConnection(port, ip, () => {
//       client.write(`${JSON.stringify(command)}\r\n`);
//     });
//
//     client.setTimeout(3000, () => {
//       client.destroy();
//       callback(false);
//     });
//
//     client.on('data', data => {
//       client.destroy();
//
//       const response = JSON.parse(data.toString());
//
//       if (response.result !== undefined) {
//         const success = response.result[0] === 'ok';
//         callback(success);
//       } else if (response.error !== undefined) {
//         callback(false);
//       }
//     });
//
//     client.on('error', error => {
//       client.destroy();
//       callback(false);
//     });
//   }
//
//   togglePower(ip, port, msgId, callback) {
//     // Callback returns success:boolean
//
//     const command = {
//       id: msgId,
//       method: 'toggle',
//       params: [],
//     };
//
//     this.sendCommand(ip, port, command, callback);
//   }
//
//   setName(ip, port, msgId, name, callback) {
//     // Callback returns success:boolean
//
//     const command = {
//       id: msgId,
//       method: 'set_name',
//       params: [b64Encode(name)],
//     };
//
//     this.sendCommand(ip, port, command, callback);
//   }
//
//   setBrightness(ip, port, msgId, brightnessValue, callback) {
//     // Callback returns success:boolean
//
//     const command = {
//       id: msgId,
//       method: 'set_bright',
//       params: [brightnessValue, 'smooth', 500],
//     };
//
//     this.sendCommand(ip, port, command, callback);
//   }
//
//   setColourTemperature(ip, port, msgId, ctValue, callback) {
//     // Callback returns success:boolean
//
//     const command = {
//       id: msgId,
//       method: 'set_ct_abx',
//       params: [ctValue, 'smooth', 500],
//     };
//
//     this.sendCommand(ip, port, command, callback);
//   }
//
//   setRgbColour(ip, port, msgId, rgbInt, callback) {
//     const command = {
//       id: msgId,
//       method: 'set_rgb',
//       params: [rgbInt, 'smooth', 500],
//     };
//
//     this.sendCommand(ip, port, command, callback);
//   }
// }
