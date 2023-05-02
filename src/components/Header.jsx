
import { useState, useEffect } from "react";

const Header = (props) => {
	console.log(props)
	return (
		<div className="header-container">
			<p>Hallo {props.test} 👋</p>
		</div>
	);
};

export default Header;
