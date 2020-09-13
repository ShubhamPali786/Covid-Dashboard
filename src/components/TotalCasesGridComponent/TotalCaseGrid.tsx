import React from 'react';
import { TotalCasesModel } from '../../models/TotalCases-Model';
import TotalCaseGridStyles from './TotalCasesGrid.module.css';
import GridIcon from './GridIcon';

interface TotalCaseGridProps {
	tModel: TotalCasesModel;
}

const TotalCaseGrid: React.FC<TotalCaseGridProps> = (props) => {
	return (
		<div className={TotalCaseGridStyles.MultiGrid}>
			<div className={TotalCaseGridStyles[props.tModel.name]}>
				<GridIcon name={props.tModel.name} />
			</div>
			<div className={[TotalCaseGridStyles.GridContent, TotalCaseGridStyles[props.tModel.name]].join(' ')}>
				<p>{props.tModel.name} Cases</p>
				<h1>{props.tModel.totalCount}</h1>
			</div>
			{props.tModel.newlyAdded > 0 ? (
				<div className={TotalCaseGridStyles.TodaysCount}>
					<p className={TotalCaseGridStyles[props.tModel.name]}>+[ {props.tModel.newlyAdded} Today ]</p>
					<p className={TotalCaseGridStyles[props.tModel.name]} style={{ textAlign: 'end' }}>
						<span style={{ fontSize: '.6rem' }} className={TotalCaseGridStyles.lastUpdated}>
							Updated{' '}
						</span>
						<span style={{ fontSize: '1rem' }} className={TotalCaseGridStyles.lastUpdatedTime}>
							{props.tModel.lastUpdatedDate}
						</span>
					</p>
				</div>
			) : (
				<div className={TotalCaseGridStyles.TodaysCount}>
					<p className={TotalCaseGridStyles[props.tModel.name]} style={{ textAlign: 'end', width: '100%' }}>
						<span style={{ fontSize: '.6rem' }} className={TotalCaseGridStyles.lastUpdated}>
							Updated{' '}
						</span>
						<span style={{ fontSize: '1rem' }} className={TotalCaseGridStyles.lastUpdatedTime}>
							{props.tModel.lastUpdatedDate}
						</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default TotalCaseGrid;
