import React, { SyntheticEvent } from 'react';
import { BuildControlsModel } from '../../models/StateCovidChart-Models';
import ChartControlsStyles from './ChartControls.module.css';


interface ChartControlsProps {
    BuildControlsMeta: BuildControlsModel[];
    StateDropDownList:any[],
	DensityClasses:any,
	dropDownChangeHndl:(e:any)=>void,
	densityTypeClickHandl:(densityType:string)=>void
	checkboxChangeHandler:(e:any)=>void
}

const ChartControls:React.FC<ChartControlsProps>=(props)=>{

    return (
		<div className={ChartControlsStyles.BuildControls_Container}>
			<div className={ChartControlsStyles.SelectState_Control_Container}>
				<div className={ChartControlsStyles.selectControl}>
                     
					<select onChange={(e)=>props.dropDownChangeHndl(e.currentTarget.value)}  value={props.StateDropDownList.find(item=>item.selected).statecode}>
						{props.StateDropDownList.map((item) => {
							return (
								<option value={item.statecode} key={item.statecode} >
									{item.state}
								</option>
							);
						})}
					</select>
				</div>
				<div className={ChartControlsStyles.DisplayDensity_Control_Container}>
					<div
						className={[ChartControlsStyles.Density_Control, props.DensityClasses.cumulative].join(' ')}
						data-density="cumulative"
						onClick={(e:any)=>props.densityTypeClickHandl(e.currentTarget.dataset.density)}
					>
						<h4>Cumulative</h4>
					</div>
					<div
						className={[ChartControlsStyles.Density_Control, props.DensityClasses.daily].join(' ')}
						onClick={(e:any)=>props.densityTypeClickHandl(e.currentTarget.dataset.density)}
						data-density="daily"
					>
						<h4>Daily</h4>
					</div>
				</div>
			</div>
			<div>
				<div>
					{props.BuildControlsMeta.map((item) => {
						return (
							< >
								<input
									type="checkbox"
									id={item.name}
									key={item.name}
									name={item.name}
									onChange={(e)=>props.checkboxChangeHandler(e)}
									checked={item.checked ? true : false}
								/>
								<label htmlFor={item.name}>{item.labeltxt}</label>
							</>
						);
					})}
				</div>
			</div>
		</div>
	);;
}
export default ChartControls;