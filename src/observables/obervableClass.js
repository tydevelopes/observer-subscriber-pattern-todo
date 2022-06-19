class Observable {
  static observables = [];

  constructor() {
    this.observers = [];
    Observable.observables.push(this);
  }
  subscribe(observer) {
    if (!this.observers.find((item) => item === observer)) {
      this.observers.push(observer);
    }
  }
  unsubscribe(observer) {
    if (this.observers.find((item) => item === observer)) {
      this.observers = this.observers.filter((item) => item !== observer);
    }
  }
  notify(data) {
    this.observers.forEach((observer) => {
      observer(data);
    });
  }
}

export default Observable;
