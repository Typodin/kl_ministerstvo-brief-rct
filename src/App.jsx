import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getEventData} from './services/api/eventService';
import Sidebar from './components/Sidebar/Sidebar';
import Loader from './components/ui/Loader.jsx';
import MobileHeader from './components/Main/MobileHeader.jsx';
import Pagetitle from './components/Main/Pagetitle.jsx';
import Days from './components/Main/Days.jsx';

import 'yet-another-react-lightbox/styles.css';

export default function App() {
	const [eventData, setEventData] = useState(null);
	const [error, setError] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const {eventId} = useParams();

	useEffect(() => {
		if (eventId) {
			getEventData(eventId)
				.then((data) => {
					const normalized = Array.isArray(data) ? data[0] ?? null : data ?? null;
					setEventData(normalized);
				})
				.catch((err) => setError(err.message));
		}
	}, [eventId]);

	const pdfLink = eventData?.pdf_link || '';

	const openSidebar = () => setSidebarOpen(true);
	const closeSidebar = () => setSidebarOpen(false);

	if (error) return <div>Ошибка: {error}</div>;
	if (!eventData) return <Loader/>;

	return (
		<div className="wrapper">

			<Sidebar
				items={eventData.sidebar}
				isOpen={sidebarOpen}
				onClose={closeSidebar}
				data={eventData.manager}
				pdfLink={pdfLink}
			/>

			<div className="content-wrap">
				<MobileHeader
					data={eventData.manager}
					onOpenMenu={openSidebar}
					pdfLink={pdfLink}
				/>
				<Pagetitle title={eventData.header.title} dealId={eventData.deal_id}/>
				<Days
					data={eventData.main.days}
					displayType={eventData.display_type}
				/>

				{/*<Footer data={eventData.footer}/>*/}
			</div>

		</div>
	);
}