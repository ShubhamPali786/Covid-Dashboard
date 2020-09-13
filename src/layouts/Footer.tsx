import React from 'react';
import FooterStyles from './Footer.module.css';

const Footer: React.FC<{}> = (props) => {
	return (
		<footer>
			<div className={FooterStyles.footerContainer}>
				<div className={FooterStyles.gitLinkContainer}>
					<p onClick={() => window.open('https://github.com/ShubhamPali786/react-dashboard')}>
						Open Sourced on GitHub
					</p>
				</div>
				<div className={FooterStyles.ApiLinkContainer}>
					<p onClick={() => window.open('https://api.covid19india.org/')}>COVID19-India API</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
