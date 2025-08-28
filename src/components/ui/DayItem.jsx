import React from 'react';

const DayItem = ({ icon: Icon, title, children }) => (
	<div className="day-item">
		<div className="day-item-icon">
			{Icon && <Icon size={24} weight="regular" />}
		</div>
		<div className="day-item-info">
			<div className="day-item-info-title"><span>{title}</span></div>
			<div className="day-item-info-text">{children}</div>
		</div>
	</div>
);

export default DayItem;