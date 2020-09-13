import React from 'react';
import GridIconStyles from './GridIcon.module.css';
interface GridIconProps {
	name: string;
}

const GridIcon: React.FC<GridIconProps> = (props) => {
	let gridIconContainer = null;

	switch (props.name) {
		case 'Confirmed':
			gridIconContainer = (
				<div className={GridIconStyles.Confirmed}>
					<i className="fa fa-line-chart icon" aria-hidden="true"></i>
				</div>
			);
			break;
		case 'Active':
			gridIconContainer = (
				<div className={GridIconStyles.Active}>
					<i className="fa fa-info icon" aria-hidden="true"></i>
				</div>
			);
			break;
		case 'Recovered':
			gridIconContainer = (
				<div className={GridIconStyles.Recovered}>
					<i className="fa fa-check-square-o icon" aria-hidden="true"></i>
				</div>
			);
			break;
		case 'Deceased':
			gridIconContainer = (
				<div className={GridIconStyles.Deceased}>
					<i className="fa fa-bed icon" aria-hidden="true"></i>
				</div>
			);
			break;
		default:
			break;
	}

	return gridIconContainer;
};
export default GridIcon;
