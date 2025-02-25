import motoImage from '../assets/moto-moderne.jpg';
import avatar1 from '../assets/fakeUserAvatar/avatar1.png';
import avatar2 from '../assets/fakeUserAvatar/avatar2.png';
import avatar3 from '../assets/fakeUserAvatar/avatar3.png';
import avatar4 from '../assets/fakeUserAvatar/avatar4.png';
import avatar5 from '../assets/fakeUserAvatar/avatar5.png'; 
import avatar6 from '../assets/fakeUserAvatar/avatar6.png';

export const stories = [
  { id: '1', username: 'utilisateur1', image: avatar1 },
  { id: '2', username: 'utilisateur2', image: avatar2 },
  { id: '3', username: 'utilisateur3', image: avatar3 },
  { id: '4', username: 'utilisateur4', image: avatar4 },
  { id: '5', username: 'utilisateur5', image: avatar5 },
  { id: '6', username: 'utilisateur6', image: avatar6 },
];

export const posts = [
  {
    id: '1',
    username: 'utilisateurA',
    avatar: avatar1,
    image: motoImage,
    description: 'Superbe balade à moto aujourd\'hui !',
    likes: 42,
    comments: 10,
  },
  {
    id: '2',
    username: 'utilisateurB',
    avatar: avatar2,
    image: motoImage,
    description: 'Nouvelle moto, qui veut faire un tour ?',
    likes: 128,
    comments: 25,
  },
  {
    id: '3',
    username: 'utilisateurC',
    avatar: avatar3,
    image: motoImage,
    description: 'Le coucher de soleil sur la route, magnifique !',
    likes: 75,
    comments: 15,
  },
]; 