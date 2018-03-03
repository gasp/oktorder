// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Current,
} from './';

export default {
  path: 'order',
  name: 'Order',
  childRoutes: [
    { path: 'current', name: 'Current', component: Current, isIndex: true },
  ],
};
