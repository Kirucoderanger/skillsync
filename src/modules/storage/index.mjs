export const StorageManager = {
  get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  add(key, item) {
    const data = StorageManager.get(key);
    data.push(item);
    StorageManager.set(key, data);
  },
  remove(key, index) {
    const data = StorageManager.get(key);
    data.splice(index, 1);
    StorageManager.set(key, data);
  }
};
