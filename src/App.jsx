import './App.css';
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

import ChatBody from './components/ChatBody';
import SignIn from './components/SignIn';

import Header from './components/Header';

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="border-2 rounded border-blue-400 max-w-xl h-screen mx-auto flex flex-col">
      <Header/>
      {user ? <ChatBody /> : <SignIn />}
    </div>
  );
}