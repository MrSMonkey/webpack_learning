import photo from './img1.jpg';
import './index.scss';

var img = new Image();
img.src = photo;
img.classList.add('photo');

var root = document.getElementById('root');
root.append(img);