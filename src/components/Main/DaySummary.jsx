import SectionWrapper from '../ui/SectionWrapper';
import DayItem from '../ui/DayItem';
import Gallery from './Gallery.jsx';
import useFormatPhone from '../../hooks/useFormatPhone.js';
import {
	CalendarDotsIcon,
	MapPinIcon,
	UsersThreeIcon,
	ClockIcon,
	UserIcon,
	BuildingsIcon,
	InfoIcon
} from '@phosphor-icons/react';

const DaySummary = ({data, dataItems}) => {
	const formatPhone = useFormatPhone();
	if (!data) return null;

	const {
		title,
		date,
		address,
		guests,
		timing: {
			"check-in": checkIn,
			start,
			finish
		} = {},
		client: {
			fio: clientFio,
			phone: clientPhone
		} = {},
		place: {
			name: placeName,
			phone: placePhone,
			fio: placeFio
		} = {}
	} = data;

	const items = [
		{icon: CalendarDotsIcon, title: 'Дата мероприятия', value: date},
		(checkIn || start || finish) && {
			icon: ClockIcon,
			title: 'Тайминг',
			value: [
				checkIn && `Заезд: ${checkIn}`,
				start && `Старт: ${start}`,
				finish && `Окончание: ${finish}`
			].filter(Boolean)
		},
		guests > 0 && {icon: UsersThreeIcon, title: 'Кол-во гостей', value: `${guests} чел`},
		(clientFio || clientPhone) && {
			icon: UserIcon,
			title: 'Клиент',
			value: [
				clientFio && clientFio,
				clientPhone && formatPhone(clientPhone)
			].filter(Boolean)
		},
		{icon: MapPinIcon, title: 'Адрес мероприятия', value: address},
		(placeName || placeFio || placePhone) && {
			icon: BuildingsIcon,
			title: 'Площадка',
			value: [
				placeName && `${placeName}`,
				placeFio && `${placeFio}`,
				placePhone && formatPhone(placePhone)
			].filter(Boolean)
		}
	].filter(Boolean);

	return (
		<SectionWrapper className={'pb-70'}>

			<h2 className="title-block title-block-big"><span>{title}</span></h2>

			<div className="mt-30">
				<div className="block">
					<div className="day-grid pad-40">
						{items.map(({ icon, title, value }, idx) => (
							<DayItem key={`${title}-${idx}`} icon={icon} title={title}>
								{Array.isArray(value)
									? value.map((v, idx) => <span key={idx}><span>{v}</span></span>)
									: <span>{value}</span>}
							</DayItem>
						))}
					</div>
				</div>

					{Array.isArray(dataItems) && dataItems.length > 0 && (
						<div className="block pad-40">
							{dataItems.map((item, idx) => {
								const {
									sidebar_id,
									question,
									result,
									images,
									// videos,
									// documents
								} = item || {};

								const hasImages = Array.isArray(images) && images.length > 0;

								return (
									<div className="question" key={sidebar_id || idx} id={sidebar_id}>
										<h3 className="question-title">
											<div className="question-title-icon">
												<InfoIcon size={20} weight="regular"></InfoIcon>
											</div>
											<span>{question}</span>
										</h3>

										<div className="question-item">

											{typeof result === 'string' && result.trim().length > 0 && (
												<div
													className="contents question-text"
													dangerouslySetInnerHTML={{ __html: result }}
												/>
											)}

											{hasImages && (
												<>
													<h4 className="block-title mt-20">Фото</h4>
													<Gallery
														data={{
															items: [
																{
																	id: `${sidebar_id || idx}-images`,
																	name: 'Фото',
																	images: images || [],
																	videos: [] // временно для видео
																}
															]
														}}
													/>
												</>
											)}

										</div>

									</div>
								);
							})}
						</div>
					)}

				</div>


		</SectionWrapper>
	);
};

export default DaySummary;