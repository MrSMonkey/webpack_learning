document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click.js/index.js').then(({default: handleClick}) => {
    handleClick();
  });
})
