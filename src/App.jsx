import './App.css';
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Let's Chat</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}