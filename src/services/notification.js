import Noty from "noty";
// import notysound from "../notysound/slow-spring-board.mp3";

export default class NotificationsService {
  success(message) {
    new Noty({
      type: "success",
      layout: "topRight",
      theme: "sunset",
      text: message,
      timeout: 3000,
      progressBar: true
      // sounds: {
      //   sources: ["../notysound/notysound.wav"],
      //   volume: 1
      // }
    }).show();
  }

  error(message) {
    new Noty({
      text: message,
      layout: "topRight",
      theme: "sunset",
      type: "error",
      timeout: 3000,
      progressBar: true
      // sounds: {
      //   sources: ["../notysound/notysound.wav"],
      //   volume: 1
      // }
    }).show();
  }
}
