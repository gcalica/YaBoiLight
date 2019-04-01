// /* eslint-disable no-console */
// const net = require('net');
//
// export default class Yeelight {
//   constructor(data) {
//     this.data = data;
//   }
//
//   sendCommand(ip, port, command, callback) {
//     // Callback returns success:boolean
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
//       console.log(error);
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
// }
