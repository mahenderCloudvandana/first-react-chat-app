import { auth } from '../firebaseConfig';

export default function ChatMessage(props) {
  const { text, uid, photoURL, id } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div key={id} className={`message ${messageClass}`}>
      <img alt="profile" src={photoURL || 'https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'} />
      <p>{text}</p>
    </div>
  );
}