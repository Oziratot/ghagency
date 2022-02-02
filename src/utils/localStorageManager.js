function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

const localStorageManager = {
  supported: supportsLocalStorage(),
  getItem(key) {
    try {
      if (this.supported) {
        const data = JSON.parse(localStorage.getItem(key));
        return data;
      }
      console.warn('localStorage missing or disabled in your browser');
      return null;
    } catch (e) {
      console.warn(e);
      return null;
    }
  },
  setItem(key, value) {
    try {
      if (this.supported) {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        console.warn('localStorage missing or disabled in your browser');
      }
    } catch (e) {
      console.warn(e);
    }
  },
};


export default localStorageManager;
