import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SelectUser = (props) => {
	const [userLoaded, setUserLoaded] = useState(false);
	setTimeout(() => {
		setUserLoaded(true);
	}, 5000);
	return (
		<div>
			<h1 style={{ fontWeight: "normal" }}>wähle eine person</h1>
			{props.allUser.map((user, index) => (
				<motion.div
					key={user}
					className="user-container"
					onClick={() => props.select(user)}
					whileTap={{ scale: 0.9 }}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{
						type: "spring",
						stiffness: 100,
						damping: 17,
						delay: userLoaded ? 0.0 : 0.1 * index,
					}}
				>
					<h1
						key={user}
						value={user}
						className="user-name"
						style={{
								backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
						}}
					>
						{user}
					</h1>
				</motion.div>
			))}
		</div>
	);
};

export default SelectUser;
