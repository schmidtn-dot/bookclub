import { useState, useEffect } from "react";
import axios from "axios";

import { motion } from "framer-motion";

import "./App.css";
import SelectUser from "./components/SelectUser";
import Header from "./components/Header";
import Book from "./components/Book";
import Notification from "./components/Notification";

function App() {
	const [count, setCount] = useState(0);
	const [data, setData] = useState([]);
	const [user, setUser] = useState();
	const [userVoteCount, setUserVoteCount] = useState();
	const [notificationVisible, setNotificationVisible] = useState(false);

	const baseURL = "https://bookclub-api-c934.onrender.com/books";

	useEffect(() => {
		axios
			.get("https://bookclub-api-c934.onrender.com/books")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.log(error));
	}, []);

	if (user && userVoteCount === undefined) {
		let count = 0;
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].vote.length; j++) {
				if (data[i].vote[j].name === user) {
					count++;
				}
			}
		}
		console.log("userCount: ", count);
		setUserVoteCount(count);
	}

	const allUser = ["Fabio", "Hanna Maxi", "Nadja", "Nazim", "Nick"];

	const handelSelect = (selectedUser) => {
		console.log("press: ", selectedUser);
		setUser(selectedUser);
	};

	const handelVote = (id, voteUpdate, decrease) => {
		if (!decrease && userVoteCount >= 3) {
			setNotificationVisible(true);
			setTimeout(() => {
				setNotificationVisible(false);
			}, 2000);
		} else {
			console.log("handelVote");
			console.log("decrease: ", decrease);
			if (decrease) {
				setUserVoteCount(userVoteCount - 1);
			} else {
				setUserVoteCount(userVoteCount + 1);
			}
			setNotificationVisible(true);
			setTimeout(() => {
				setNotificationVisible(false);
			}, 2000);
			console.log(userVoteCount);
			axios
				.post("https://bookclub-api-c934.onrender.com/change", {
					id: id,
					user: voteUpdate,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	};

	return (
		<>
			<div
				onClick={() => {
					setUser(undefined);
					console.log("click");
				}}
			>
				<Header test={user} voteCount={userVoteCount} />
			</div>
			<Notification
				voteCount={userVoteCount}
				visible={notificationVisible}
			/>
			{user ? (
				data.map((book, index) => (
					<motion.div
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 17,
						}}
						key={index}
					>
						<Book
							book={book}
							user={user}
							userVoteCount={userVoteCount}
							handelVote={(id, voteUpdate, decrease) =>
								handelVote(id, voteUpdate, decrease)
							}
						/>
					</motion.div>
				))
			) : (
				<div>
					<SelectUser
						allUser={allUser}
						select={(selectedUser) => handelSelect(selectedUser)}
					/>
				</div>
			)}
		</>
	);
}

export default App;
