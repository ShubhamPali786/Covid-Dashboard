import React from 'react';
import HeaderStyles from './Header.module.css';
import Logo from './Logo';

const Header: React.FC<{}> = (props) => {
	return (
		<header className={HeaderStyles.Headers}>
			<Logo/>
			<div style={{ position: 'relative', width: '100%' }}>
				<h2> Covid19 India Dashboard</h2>
			</div>
		</header>
	);
};

export default Header;
