import { auth } from '../firebaseConfig';

export default function Message(props) {
	const { text, uid, photoURL, id } = props.message;
  	const messageClass = uid === auth.currentUser.uid ? 'flex flex-row-reverse' : 'flex';
  	const textClass = uid === auth.currentUser.uid ? 'ml-1' : 'mr-1';

  	return (
  		<div key={id} className={messageClass}>
          	<img className="w-10 h-10 my-1 mx-1 rounded-full" alt="profile" src={photoURL || 'https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'} />
          	<p className={`rounded-2xl bg-blue-400 py-2 px-3 my-1 ${textClass}`}>{text}</p>
        </div>
  	);
}