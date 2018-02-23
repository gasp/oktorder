// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Home,
  Category,
} from './';

export default {
  path: 'menu',
  name: 'Menu',
  childRoutes: [
    { path: 'home', name: 'Home', component: Home },
    { path: 'category/:cat', name: 'Category', component: Category },
  ],
};
