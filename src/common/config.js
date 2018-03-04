export const couch = {
  // host: 'http://pi.local:5984/',
  db: 'http://192.168.0.31:5984/oktorder',
};

couch.design = `${couch.db}/_design/`;
couch.product = `${couch.design}/product`;
couch.order = `${couch.design}/order`;

export default {
  couch,
};
