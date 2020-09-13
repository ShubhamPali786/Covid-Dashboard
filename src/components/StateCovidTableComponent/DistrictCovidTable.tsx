import React from 'react';
import { StateDataModel, DistrictModel } from '../../models/State-Models';
import { getLastUpdateTime, sortArraybyProperty } from '../../shared/HelperMethods/Helper';

interface DistrictCovidTableProps {
	StateDataModel: StateDataModel;
}

const DistrictCovidTable: React.FC<DistrictCovidTableProps> = (props) => {
	const getDistrictTblHeaders = () => {
		let lastUpdatedTime = props.StateDataModel.stateModel.lastupdatedtime;

		let headerContent = (
			<>
				<tr className="district-space" data-district="districtVisible">
					<td colSpan={5}>
						<span className="district-space-container">
						<span className="legends">
							<span className="zone zone-red"></span>
							<span className="zone-text">Red Zone</span>
							<span className="zone zone-orange"></span>
							<span className="zone-text">Orange Zone</span>
							<span className="zone zone-green"></span>
							<span className="zone-text">Green Zone</span>
						</span>
						<span className="lastUpdated">
							<p>{getLastUpdateTime(lastUpdatedTime)}</p>
						</span>
						</span>
					</td>
				</tr>
				<tr>
					<th>District</th>
					<th>Confirmed</th>
					<th>Active</th>
					<th>Recovered</th>
					<th>Deceased</th>
				</tr>
			</>
		);
		return headerContent;
	};
	const getTableRowByProp = (item: any, propcases: string) => {
		let row;
		if (parseInt(item.delta[propcases]) > 0) {
			row = (
				<td>
					<span className={'delta' + propcases}>
						<i className="fa fa-arrow-up" aria-hidden="true"></i>
						{item.delta[propcases]}
					</span>
					<span>{item[propcases]}</span>
				</td>
			);
		} else {
			row = <td>{item[propcases]}</td>;
		}

		return row;
	};

	return (
		<>
			{getDistrictTblHeaders()}
			{sortArraybyProperty(props.StateDataModel.DistrictData, 'confirmed', false).map((item) => {
				return (
					<tr className={item.zone}>
						<td className="district">{item.districtName}</td>
						{getTableRowByProp(item, 'confirmed')}
						<td>{item.active}</td>
						{getTableRowByProp(item, 'recovered')}
						{getTableRowByProp(item, 'deceased')}
					</tr>
				);
			})}
		</>
	);
};
export default DistrictCovidTable;
