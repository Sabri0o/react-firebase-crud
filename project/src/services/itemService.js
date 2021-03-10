// exports itemDataService that uses firebase‘s Database Reference to interact with Firebase Database.
// There are 3 components that uses ItemDataService:

// addItem for creating new item
// Itemlist contains list of items
// item shows item details

import firebase from "../firebase";

const db = firebase.ref("/items");

class ItemDataService {
  getAll() {
    return db;
  }

  create(item) {
    return db.push(item);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ItemDataService();