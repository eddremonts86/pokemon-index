class localStorageHandler {
  static createJsonLocalStore(name, initialValue) {
    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, JSON.stringify(initialValue));
    }
  }

  static setJsonLocalStore(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  static getJsonLocalStore(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  static setLocalStore(name, value) {
    localStorage.setItem(name, value);
  }

  static getLocalStore(name) {
    return localStorage.getItem(name);
  }
}

export default localStorageHandler;
