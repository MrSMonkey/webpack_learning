// import './style.css';

// const btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);
// btn.onclick=() => {
//   const item = document.createElement('div');
//   item.innerHTML = 'item';
//   document.body.appendChild(item);
// }


import number from './number';
import counter from './counter';

counter();
number();

if (module.hot) { // 热更新监听回调
  console.log(111111);
  module.hot.accept('./number', () => {
    console.log(222);
    document.body.removeChild(document.getElementById('number'));
    number();
  });
}