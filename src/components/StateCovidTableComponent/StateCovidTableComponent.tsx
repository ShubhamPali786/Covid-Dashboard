import React, { SyntheticEvent } from 'react';
import { StateDataModel } from '../../models/State-Models';
import StateCovidTableStyles from './StateCovidTable.module.css';
import DistrictCovidTable from './DistrictCovidTable';

interface StateCovidTableProps {
	StateDataModelCollection: StateDataModel[];
	DisplayStateSpread: (statecode:string) =>any
	onHoverHandler:(stateCode:string)=>void
}

const StateCovidComponent: React.FC<StateCovidTableProps> = (props) => {
	const tableDataGenerate = (item: any, deltaCovidCount: any, propName: any) => {
		if (parseInt(item.stateModel[deltaCovidCount]) > 0) {
			return (
				<td>
					<span className={StateCovidTableStyles[deltaCovidCount]}>
						<i className="fa fa-arrow-up" aria-hidden="true"></i>
						{item.stateModel[deltaCovidCount]}{' '}
					</span>
					<span>{item.stateModel[propName]}</span>
				</td>
			);
		} else {
			return <td>{item.stateModel[propName]}</td>;
		}
	};

	return (
		<div className={StateCovidTableStyles.tableContainer}>
			<div>
				<h2>State-wise Cases</h2>
			</div>
			<div className={StateCovidTableStyles.table_container + ' tableScroll'}>
				<table id="myTable">
					<thead>
						<tr className={StateCovidTableStyles.tblHeading}>
							<th>State/UT</th>
							<th>Confirmed</th>
							<th>Active</th>
							<th>Recovered</th>
							<th>Deceased</th>
						</tr>
					</thead>

					<tbody className={StateCovidTableStyles.tableBuilder}>
						{props.StateDataModelCollection.map((item) => {
							return (
								<>
									<tr
										onClick={()=>props.DisplayStateSpread(item.stateModel.statecode)}
										data-statecode={item.stateModel.statecode}
										data-isshow={false}
										onMouseOver={(e:any) => props.onHoverHandler(e.currentTarget.dataset.statecode)}
										key={item.stateModel.statecode}
										className={StateCovidTableStyles.stateRow}
									>
										<td>
											<div className={StateCovidTableStyles.collapsableDiv}>
												<span className="arrow">
													<i
														className="fa fa-arrow-circle-o-right arrowicon"
														aria-hidden="true"
													></i>
												</span>
												<span className={StateCovidTableStyles.heading}>
													{item.stateModel.state}
												</span>
											</div>
										</td>
										{tableDataGenerate(
											item,
											'deltaconfirmed',
											'confirmed'
										)}
										<td>{item.stateModel.active}</td>
										{tableDataGenerate(
											item,
											'deltarecovered',
											'recovered'
										)}
										{tableDataGenerate(item, 'deltadeaths', 'deaths')}
									</tr>
									{item.Is_Highlighted && <DistrictCovidTable StateDataModel={item} />}
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StateCovidComponent;
