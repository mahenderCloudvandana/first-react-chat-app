import { auth } from '../firebaseConfig';
import firebase from 'firebase/compat/app';

export default function SignIn() {
	const signInWithGoogle = () => {
    	const provider = new firebase.auth.GoogleAuthProvider();
    	auth.signInWithPopup(provider);
  	}

  	return (
    	<div className="text-black text-center">
      		<button className="bg-blue-400 hover:bg-blue-500 text-white font-bold m-2 py-2 px-4 active:py-1.5 active:px-3.5 active:m-2.5 rounded" onClick={signInWithGoogle}>Sign in with Google</button>
      		<p>Do not violate the community guidelines or you will be banned for life!</p>
    	</div>
  	);
}