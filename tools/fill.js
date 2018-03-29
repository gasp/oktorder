const NodeCouchDb = require('node-couchdb');
const productContent = require('./fixtures/product');

const dbName = 'oktorder';

const couch = new NodeCouchDb({
  host: 'pi.local',
  protocol: 'http',
  port: 5984
});

function cleanup() {
  console.log('cleanup');
  // this may be all coped by promise if chainable
  return couch.listDatabases()
    .then((dbs) => {
      const theDb = dbs.filter(db => (db === dbName));
      if (theDb.length !== 1) throw new Error('the db was not found');
      return theDb;
    }).then(db => (
      couch.dropDatabase(db)
    )).then(() => {
      console.log(`db: ${dbName} was dropped`);
      return true;
    })
    .catch(err => console.log(err));
}

function create() {
  console.log('create');
  return new Promise((resolve, reject) => {
    couch.createDatabase(dbName).then(() => {
      console.log(`${dbName} was recreated`);
      return resolve();
    }, err => (
      reject(new Error(`unable to create db ${dbName}, ${err}`))
    ));
  });
}

async function fill() {
  const ids = [];
  for (let i = 0; i < productContent.length; i += 1) {
    // this loop inserting successfully each element in intentionnal
    // there is no rush, let's play it gentle with the server and keep order
    // eslint-disable-next-line no-await-in-loop
    const response = await couch.insert(dbName, productContent[i]);
    if (response.data.ok) productContent[i].id = response.data.id;
    ids.push(response.data.id);
  }
  return ids;
}

cleanup().then(create).then(fill).catch(err => console.log('errrror', err));
