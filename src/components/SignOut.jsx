import { auth } from '../firebaseConfig';

export default function SignOut() {
	return auth.currentUser && (
		<button className="bg-blue-400 hover:bg-blue-500 text-white font-bold border border-white py-2 px-4 active:py-1.5 active:px-3.5 active:mr-0.5 rounded" onClick={() => auth.signOut()}>Sign-Out</button>
	);
}