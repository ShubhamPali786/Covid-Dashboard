import React from 'react';

import { connect } from 'react-redux';
import { StoreModel } from '../../store/reducers';

const LoadingSpinner: React.FC<{ isLoading: boolean }> = (props) => {
	if (props.isLoading) {
		return (
			<div id="loaderContainer" >
					<img src="./assets/loading-animated.gif" className="loaderImg" alt="Loading..."/>
			</div>
		);
	}
	return null;
};

const mapStateToProps=(state:StoreModel)=>{
    return {isLoading:state.loading};
}

export default connect(mapStateToProps)(LoadingSpinner);
