import firebase from 'firebase/compat/app';
import React, { useRef, useState, useEffect } from 'react';
import { firestore, auth } from '../firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from './ChatMessage';
import SendIcon from '@mui/icons-material/Send';

export default function ChatRoom() {
  const reference = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');
  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    reference.current.scrollIntoView({ behavior: 'smooth' });
  },[messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  }

  return (
    <>
      <main>
        {messages && messages.map((msg, index) => <ChatMessage key={index} uniqueId={msg.id} message={msg} />)}
        <span ref={reference}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}><SendIcon sx={{ fontSize: 30 }}></SendIcon></button>
      </form>
    </>
  );
}