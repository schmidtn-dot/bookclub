import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Notification = (props) => {
	console.log(props);
	return (
		<motion.div
				intitial={{ scale: 0 }}
				animate={{
						y: props.visible != 0 ? 0 : -150,
						opacity: props.visible != 0 ? 1 : 0,
				}}
			transition={{ duration: 1.5, type: "spring", bounce: 0.65 }}
			className="noti-container"
		>
			<p>du hast noch {3 - props.voteCount } Stimmen</p>
		</motion.div>
	);
};

export default Notification;
