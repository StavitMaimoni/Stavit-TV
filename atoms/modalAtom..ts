import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { Movie } from '../typings';

export const movieId = atom({
  key: 'movieId',
  default: 0,
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const kidsClick = atom({
  key: 'kidsClick',
  default: false,
});

export const myListClick = atom({
  key: 'myListClick',
  default: false,
});

export const newClick = atom({
  key: 'newClick',
  default: false,
});

export const videoType = atom({
  key: 'videoType',
  default: 'tv',
});

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
});


