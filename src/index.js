import photo from './img1.jpg';
import createPhoto from './createPhoto';
import styles from './index.scss';

createPhoto();


var img = new Image();
img.src = photo;
img.classList.add(styles.photo);

var root = document.getElementById('root');
root.append(img);

