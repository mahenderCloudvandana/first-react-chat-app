import SignOut from './SignOut';

export default function Header() {
	return(
		<div className="border-b-2 rounded-none border-blue-400 h-14 bg-blue-400 flex flex-wrap items-center select-none">
	        <div className="flex-none px-2"><img src={require('../chat-icon.png')} className="h-12" alt="chat-icon"/></div>
	        <div className="flex-auto font-mono fontClass text-4xl text-white">MA <span className="text-lg hidden sm:inline">messaging application</span></div>
	        <div className="flex-none px-2">
          		<SignOut/>
	        </div>
      </div>
	);
}