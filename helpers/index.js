import { db } from '~/plugins/firebase.js';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export function addZero(str) {
  return str.toString().padStart(2, '0');
}

export async function writeUsersToFirestore() {
  const ref = doc(db, 'data', 'ouUx1yLJyVdPZNtcYEGG');
  try {
    await updateDoc(ref, { users: this.users });
  } catch (e) {
    console.error(e);
  }
}

export async function writeChatsToFirestore() {
  const ref = doc(db, 'data', 'ouUx1yLJyVdPZNtcYEGG');
  try {
    await updateDoc(ref, { chats: this.chats });
  } catch (e) {
    console.error(e);
  }
}
