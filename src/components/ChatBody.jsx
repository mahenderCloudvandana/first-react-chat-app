import firebase from 'firebase/compat/app';
import React, { useRef, useState, useEffect } from 'react';
import { firestore, auth } from '../firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Picker from 'emoji-picker-react';

import Message from './Message';
// import SendIcon from '@mui/icons-material/Send';

export default function ChatBody() {
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
		setShowEmoji(false);
		let value = formValue;
		setFormValue('');

		const { uid, photoURL } = auth.currentUser;
		await messagesRef.add({
			text: value,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL
		});
	}

	const [showEmoji, setShowEmoji] = useState(false);
  	const onEmojiClick = (event, emojiObject) => {
	    setFormValue(formValue+emojiObject.emoji);
  	};

  	return (
	    <>	    	
	      	<div className="flex-auto overflow-y-auto scroll-style text-white" onClick={()=>setShowEmoji(false)}>
		        {messages && messages.map((msg, index) => <Message key={index} uniqueId={msg.id} message={msg} />)}
	        	<span ref={reference}></span>
	      	</div>
	      	<div className="flex-none h-14 grid content-center px-1">
		        <form onSubmit={sendMessage} className="relative flex">
		           	<span className="absolute inset-y-0 flex items-center">
	            	  	<button onClick={()=>setShowEmoji(false)} type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none active:p-3.5">
		                 	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
			                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
			                </svg>
		            	</button>
		           	</span>
		           	<input onClick={()=>setShowEmoji(false)} onChange={(e) => setFormValue(e.target.value)} value={formValue} type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 pr-56"/>
		           	<div className="absolute right-0 items-center inset-y-0 flex">
		              	<button onClick={()=>setShowEmoji(false)} type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none active:p-2.5">
	                 		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
		                    	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
		                 	</svg>
		              	</button>
		              	<button onClick={()=>setShowEmoji(false)} type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none active:p-2.5">
		                 	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
		                    	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
		                    	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
		                 	</svg>
		              	</button>
		              	<div className="relative">
	      					{showEmoji && <Picker onEmojiClick={onEmojiClick} />}
			              	<button type="button" onClick={()=>setShowEmoji(!showEmoji)} className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none active:p-2.5">
			                 	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
			                    	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			                 	</svg>
			              	</button>
		              	</div>
		              	<button onClick={sendMessage} disabled={!formValue} type="button" className={`inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none active:py-2.5 active:px-3.5 active:mx-0.5 ${!formValue ? 'cursor-not-allowed' : ''}`}>
		                 	<span className="font-bold">Send</span>
		                 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
		                    	<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
		                 	</svg>
		              	</button>
		           	</div>
		        </form>
	      	</div>
    	</>
  	);
}