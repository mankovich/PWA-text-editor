import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('put to the database');

  //create connection to the database and version
  const jateDb = await openDB('jate', 1);

  //create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  //open the desired object store
  const store = tx.objectStore('jate');

  //use the FIXME:
  const request = store.add(content);

  //get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');

  //create connection to the database and version
  const jateDb = await openDB('jate', 1);

  //create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //open the desired object store
  const store = tx.objectStore('jate');

  //use FIXME: method to get one and then pass the record trying to get
  const request = store.getAll();

  //get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
