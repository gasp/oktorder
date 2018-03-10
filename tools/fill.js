const NodeCouchDb = require('node-couchdb');
const productContent = require('./product-db');

const dbName = 'oktorder';

const couch = new NodeCouchDb({
  host: 'pi.local',
  protocol: 'http',
  port: 5984
});

function cleanup() {
  console.log('cleanup');
  // this may be all coped by promise if chainable
  return new Promise((resolve, reject) => {
    return couch.listDatabases().then(dbs => {
      return Promise.all(dbs.map(db => {
        if(db === dbName) {
          couch.dropDatabase(dbName).then(() => {
            console.log(`db: ${dbName} was dropped`);
            return resolve()
          }, err => {
            reject(`db: unable to drop ${dbName}`)
          });
        }
      }));
      console.log(`no database "${dbName}" to drop`);
      resolve();
    }, err => {
        console.log(err)
    });
  });
}
function create() {
  console.log('create');
  return new Promise(function(resolve, reject) {
    couch.createDatabase(dbName).then(() => {
      console.log(`${dbName} was recreated`)
      return resolve();
    }, err => {
      reject(`unable to create db ${dbName}`)
    });
  })
}
function fill() {
  console.log('fill');
  return new Promise((resolve, reject) => {
    productContent.map((dish) => {
      couch.insert(dbName, dish).then(({data, headers, status}) => {
        // data is json response
        console.log('ok')
        console.log(headers, data)
        // headers is an object with all response headers
        // status is statusCode number
      }, err => {
        console.log('error', err);
        // ...or err.code=EDOCCONFLICT if document with the same id already exists
      });
    })
  });
}

cleanup().then(create).then(fill).catch(err => console.log('errrror', err))
