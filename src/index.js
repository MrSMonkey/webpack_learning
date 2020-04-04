import photo from './img1.jpg';

var img = new Image();
img.src = photo;

var root = document.getElementById('root');
root.append(img);