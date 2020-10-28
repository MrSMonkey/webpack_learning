function getComponent() {
  return import('lodash').then(({ default: _ }) => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['a', 'b', 'c'], '***');
  });
}

getComponent().then(element => document.body.appendChild(element));