import React from 'react';

import Footer from './Footer';
import Header from './Header';
import LayoutClass from './Layout.module.css';

const Layout: React.FC<{}> = (props) => {
	return (
		<>
			<Header />
			<main className={LayoutClass.Content}>{props.children}</main>
			
		</>
	);
};

export default Layout;
