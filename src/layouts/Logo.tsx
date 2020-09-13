import React from 'react';
import LogoStyles from './Logo.module.css'

const Logo: React.FC<{}> = () => {
	return (
		<div className={LogoStyles.Logo}>
			<img src="/assets/coronavirus.png"></img>
		</div>
	);
};

export default Logo;
