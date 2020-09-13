import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { generateChartOptions } from './ChartBuilderHelper';
import { ChartModel } from '../../models/DataSpread-Models';
import ChartStyles from './ChartBuilder.module.css';
interface ChartBuilderProps {
	chartModel: ChartModel;
}

const ChartBuilder: React.FC<ChartBuilderProps> = (props) => {
	

	const getChartContent = () => {
		let chart_options = generateChartOptions();
		let index = chart_options.findIndex((item) => item.key === props.chartModel.chartName);
		let chartContent=null;
		switch (props.chartModel.chartName) {
			case 'dailyConfirmed':
				chartContent = (
					<div className={ChartStyles.ChartGrid}>
						<div className={props.chartModel.classes}>
							<Line data={props.chartModel.dataset} options={chart_options[index]} />
						</div>
					</div>
				);
				break;
			case 'monthyconfirmed':
				chartContent = (
					<div className={ChartStyles.ChartGrid}>
						<div className={props.chartModel.classes}>
							<Bar data={props.chartModel.dataset} options={chart_options[index]} />
						</div>
						<div className={ChartStyles.ChartDetails}></div>
					</div>
				);
				break;
			case 'dailyRecovered':
				chartContent = (
					<div className={ChartStyles.ChartGrid}>
						<div className={props.chartModel.classes}>
							<Line data={props.chartModel.dataset} options={chart_options[index]} />
						</div>
					</div>
				);
				break;
			case 'weeklyconfirmed':
				chartContent = (
					<div className={ChartStyles.ChartGrid}>
						<div
							className={props.chartModel.classes}
							style={{ boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px #ef4648' }}
						>
							<Bar data={props.chartModel.dataset} options={chart_options[index]} />
						</div>
					</div>
				);
				break;
			default:
				break;
		}
		return chartContent;
	};

	return (getChartContent());
};

export default ChartBuilder;
