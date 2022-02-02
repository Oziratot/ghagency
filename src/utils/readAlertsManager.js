export const ReadAlertsManager = {
  get: (key) => {
    if (!process.browser) return {};
    try {
      const readItems = window.localStorage.getItem(key);

      if (!readItems) {
        return {};
      }

      return JSON.parse(readItems);
    } catch (e) {
      console.warn(e);
      return {};
    }
  },
  set: (key, id) => {
    try {
      const readItems = ReadAlertsManager.get(key);

      readItems[id] = true;
      window.localStorage.setItem(key, JSON.stringify(readItems));
    } catch (e) {
      console.warn(e);
    }
  },
  clear: () => {
    try {
      ['readAlerts', 'readModals'].forEach(key => window.localStorage.removeItem(key));
    } catch (e) {
      console.warn(e);
    }
  },
};
