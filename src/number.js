export default function () {
  const div = document.createElement('div');
  div.setAttribute('id', 'number');
  div.innerHTML = 8000;
  document.body.appendChild(div);
}