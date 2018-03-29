/* globals emit */
/* eslint-disable func-names, prefer-arrow-callback, no-var, vars-on-top, camelcase */
/*
 * the above encoded js for mapreduce is tighted to couchdb js interpreter version
 * so let's be kind and write es5
 */

module.exports = [
  {
    _id: '_design/product',
    views: {
      // http://pi.local:5984/oktorder/_design/product/_view/prime
      prime: {
        map: function (doc) {
          if (doc.type === 'product' && doc.categories.indexOf('prime') > -1 && doc.name && doc.price && typeof (doc.stock) !== 'undefined') {
            emit(doc.name, { name: doc.name, price: doc.price, stock: doc.stock });
          }
        }.toString()
      },
      // http://pi.local:5984/oktober-menu/_design/prime/_view/category?key="beer"
      // http://pi.local:5984/oktober-menu/_design/prime/_view/category?key=%22beer%22
      category: {
        map: function (doc) {
          if (doc.type === 'product' && doc.categories && doc.name) {
            doc.categories.forEach(function (cat) {
              emit(cat, doc);
            });
          }
        }.toString()
      },
      // see https://gist.github.com/amedeo/820412
      // still buggy
      // http://pi.local:5984/oktober-menu/_design/prime/_view/categories?key=%22[\%22beer\%22,\%22snack\%22]%22
      categories: {
        map: function (doc) {
          if (doc.categories === []) return;
          var emit_sequence = function (base, disp) {
            if (disp.length > 1) {
              emit(base.concat(disp[0]), 1);
              emit_sequence(base.concat(disp[0]), disp.slice(1, disp.length));
              emit_sequence(base, disp.slice(1, disp.length));
            } else if (disp.length === 1) {
              emit(base.concat(disp[0]), 1);
            }
          };
          emit_sequence([], doc.categories);
        }.toString()
      }
    }
  },
  {
    name: 'Paulaner — Weiß - Maß',
    type: 'product',
    categories: ['prime', 'beer', '1l'],
    price: 1000, // in euro cents
    stock: 100000,
  },
  {
    name: 'Augustiner — Wiesn Edelstoff - Maß',
    type: 'product',
    categories: ['prime', 'beer', '1l'],
    price: 1000, // in euro cents
    stock: 100000,
  },
  {
    name: 'Radler - Maß',
    type: 'product',
    categories: ['prime', 'beer', '1l'],
    price: 800, // in euro cents
    stock: 100000,
  },
  {
    name: 'Brezel',
    type: 'product',
    categories: ['prime', 'snack'],
    price: 200, // in euro cents
    stock: 9,
  },

  {
    name: 'Jagermeister - Shot',
    type: 'product',
    categories: ['drink'],
    price: 300, // in euro cents
    stock: 100000,
  },
  // http://www.fischer-vroni.de/speisekarte.html
  {
    name: 'Frische Weißwürste',
    type: 'product',
    categories: ['snack'],
    price: 340,
    stock: 30,
  },
  {
    name: 'Schweinebraten mit Krusterin',
    type: 'product',
    categories: ['food'],
    price: 1550, // in euro cents
    stock: 100,
  },
  {
    name: 'Eisbein',
    type: 'product',
    categories: ['food'],
    price: 1500, // in euro cents
    stock: 100,
  },
  {
    name: 'Sauerbraten',
    type: 'product',
    categories: ['food'],
    price: 1400, // in euro cents
    stock: 10,
  },
  {
    name: 'Sauerkraut',
    type: 'product',
    categories: ['food'],
    price: 1350, // in euro cents
    stock: 1,
  },
  {
    name: 'Bratwurst',
    type: 'product',
    categories: ['food'],
    price: 1150, // in euro cents
    stock: 5,
  },
  {
    name: 'Coca Cola',
    type: 'product',
    categories: ['drink'],
    price: 550, // in euro cents
    stock: 5000,
  },
  {
    name: 'Mezzo Mix',
    type: 'product',
    categories: ['drink'],
    price: 550, // in euro cents
    stock: 5,
  },
  {
    name: 'Pepsi',
    type: 'product',
    categories: ['drink'],
    price: 550, // in euro cents
    stock: 0,
  },
  {
    name: ' Sprudelwasser – 1l',
    type: 'product',
    categories: ['drink', '1l'],
    price: 950, // in euro cents
    stock: 500,
  },
  {
    name: 'Mineralwasser - 1l',
    type: 'product',
    categories: ['drink', '1l'],
    price: 900, // in euro cents
    stock: 500,
  },
];
