export default class KeyQueue {
  constructor(ws) {
    this.queue = [];
    this.ws = ws;
  }

  emptyQueue() {
    while (this.queue.length > 0) {
      this.ws.send(JSON.stringify({
        type: "KEY_CHANGE",
        text: this.queue.shift()
      }))
    }
  }

  push(key) {
    this.queue.push(key);
    this.emptyQueue();
  }
}