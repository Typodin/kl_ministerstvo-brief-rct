import React from 'react';

const IntroTableRow = ({icon, title, value, valueClass = ''}) => (
	<div className="intro-table-row">
		<div className="intro-table-row-title">
			<svg width="24" height="24" data-icon={icon}>
				<use xlinkHref={`/icons/decorative.svg#${icon}`}></use>
			</svg>
			<span>{title}</span>
		</div>
		<div className="intro-table-row-value">
			<span className={valueClass}>{value}</span>
		</div>
	</div>
);

export default IntroTableRow;