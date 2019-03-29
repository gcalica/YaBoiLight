import Yeelight from '../Yeelight';

export default class Bulb {
  constructor(info) {
    // Set object variables
    this.msgId = 1;
    for (const key in info) {
      this[key] = info[key];
    }

    this.yeelight = new Yeelight();
  }

  togglePower(callback) {
    // Callback return success of action
    this.yeelight.togglePower(
      this.ip,
      this.port,
      (this.msgId = this.msgId + 1),
      success => {
        callback(success);
      },
    );
  }

  setName(newName, callback) {
    // Callback return success of action
    this.yeelight.setName(this.ip, this.port, this.msgId, newName, success => {
      callback(success);
    });
    this.msgId = this.msgId + 1;
  }

  setBrightness(brightnessValue, callback) {
    // Callback return success of action
    this.yeelight.setBrightness(
      this.ip,
      this.port,
      (this.msgId = this.msgId + 1),
      brightnessValue,
      success => {
        callback(success);
      },
    );
  }

  setColourTemperature(ctValue, callback) {
    // Callback return success of action
    this.yeelight.setColourTemperature(
      this.ip,
      this.port,
      (this.msgId = this.msgId + 1),
      ctValue,
      success => {
        callback(success);
      },
    );
  }

  setRgbColour(rgbInt, callback) {
    // Callback return success of action
    this.yeelight.setRgbColour(
      this.ip,
      this.port,
      (this.msgId = this.msgId + 1),
      rgbInt,
      success => {
        callback(success);
      },
    );
  }
}
