import React from 'react';
import DaySummary from './DaySummary.jsx';

export default function Days({data}) {
	if (!data?.length) return null;

	return data.map(day => (
		<div key={day.sidebar_id} id={day.sidebar_id} className="contnent-row">

			<DaySummary
				data={day.summary}
				dataItems={day.items}
			/>

		</div>
	));
}