/* globals emit */
/* eslint-disable func-names, prefer-arrow-callback, no-var, vars-on-top, camelcase, no-restricted-syntax, no-underscore-dangle  */

/*
 * the above encoded js for mapreduce is tighted to couchdb js interpreter version
 * so let's be kind and write es5 to ensure compatibility with couchdb 1.3
 */

module.exports = [
  {
    _id: '_design/order',
    views: {
      // http://pi.local:5984/oktorder/_design/orders/_view/my?key=%22Nina%22
      all: {
        map: function (doc) {
          if (doc.type === 'order') {
            var a;
            for (var item in doc.items) {
              a.push(item);
            }
            emit(doc._id, doc.items);
          }
        }.toString()
      },
      // http://pi.local:5984/oktorder/_design/orders/_view/my?key=%22Nina%22
      my: {
        map: function (doc) {
          if (doc.type === 'order' && doc.waiter) {
            emit(doc.waiter, doc);
          }
        }.toString()
      },
      // get order items by orderid
      // http://pi.local:5984/oktorder/_design/order/_view/items?key=%22sampleorderid%22
      items: {
        map: function (doc) {
          if (doc.type === 'orderitem' && doc.orderid) {
            emit(doc.orderid, doc);
          }
        }.toString()
      },
      // get order and details
      // http://pi.local:5984/oktorder/_design/order/_view/order?key=%22sampleorderid%22
      order: {
        map: function (doc) {
          if (doc.type === 'order') {
            emit(doc._id, doc);
          }
          if (doc.type === 'orderitem' && doc.orderid) {
            emit(doc.orderid, doc);
          }
        }.toString()
      },
      // join
      // http://docs.couchdb.org/en/2.0.0/couchapp/views/joins.html
      // http://localhost:5984/oktorder/_design/order/_view/orderanditems?startkey=[%220f6c1424e646dfe3eab7d2c8dbe9645d%22]&endkey;=[%220f6c1424e646dfe3eab7d2c8dbe9645d%22,%202]
      orderanditems: {
        map: function (doc) {
          if (doc.type === 'order') {
            emit([doc._id, 0], doc);
          } else if (doc.type === 'orderitem') {
            emit([doc.orderid, 1], doc);
          }
        }.toString()
      },
    },
  },
  // orders
  {
    _id: 'order1_table1',
    created: new Date().toString(),
    type: 'order',
    waiter: 'Nina',
    table: 'table1',
    opened: true,
    ready: false,
  },
  {
    _id: 'order1_table2',
    created: new Date().toString(),
    type: 'order',
    waiter: 'Nina',
    table: 'table2',
    opened: true,
    ready: true,
  },
  {
    _id: 'order2_table1',
    table: 'table1',
    type: 'order',
    waiter: 'Nina',
    created: new Date().toString(),
    updated: new Date().toString(),
    open: true,
    ready: false,
  },

  // orderitems is a specific document type
  // this little trick allows linkin stuff together
  {
    _id: 'order1_table1_beer_1',
    created: new Date().toString(),
    type: 'orderitem',
    orderid: 'order1',
    productid: 'paulaner',
    qty: 1,
  },
  {
    _id: 'order1_table1_brezel_2',
    created: new Date().toString(),
    type: 'orderitem',
    orderid: 'order1',
    productid: 'brezel',
    qty: 2,
  },
];
