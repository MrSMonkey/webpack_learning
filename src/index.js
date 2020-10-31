import test from './test';

console.log(test.name);



// 同步代码
// import _ from 'lodash';

// const element = document.createElement('div');
// element.innerHTML = _.join(['a', 'b', 'c'], '***');
// document.body.appendChild(element);

// 异步代码
// function getComponent() {
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['a', 'b', 'c'], '***');
//   });
// }

// getComponent().then(element => document.body.appendChild(element));