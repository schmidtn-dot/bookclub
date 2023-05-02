import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Book = (props) => {
	const { book, user, handelVote, userVoteCount } = props;
	const [voteCount, setVoteCount] = useState(book.vote.length);
	const [oldVote, setOldVote] = useState(book.vote);

	const handelBookVote = (id, oldVote, user) => {
		let voteUpdate = [];
		let decrease = false;

		oldVote.map((user) => voteUpdate.push({ name: user.name }));

		let foundUser = oldVote.find((obj) => obj.name === user);
		if (foundUser) {
			voteUpdate = oldVote.filter((obj) => obj.name !== user);
			setVoteCount(voteCount - 1);
			setOldVote(voteUpdate);
			decrease = true;
		} else {
			voteUpdate.push({ name: user });
			if(userVoteCount !== 3){
				setVoteCount(voteCount + 1);
			}
			setOldVote(voteUpdate);
		}

		handelVote(id, voteUpdate, decrease);
	};

	return (
		<div
			key={book.id}
			className="book-container"
			onClick={() => handelBookVote(book.id, oldVote, user)}
		>
			<img src={book.cover} alt={book.title} className="book-cover" />
			<h1 className="book-title">{book.title}</h1>
			<p className="book-author">{book.author}</p>
			{book.vote
				? book.vote.map((vote) => (
						<div key={vote} className="vote">
							<h1>{vote.name}</h1>
						</div>
				  ))
				: ""}
			<motion.div
				layout
				className="vote-count"
				intitial={{ scale: 0 }}
				animate={{
					scale: voteCount != 0 ? 1 : 0,
					rotate: voteCount != 0 ? 0 : -120,
						y: voteCount != 0 ? 0 : 50,
				}}
				transition={{ duration: 0.5, type: "spring", bounce: 0.25 }}
			>
				{"👍" + voteCount}
			</motion.div>
		</div>
	);
};

export default Book;
