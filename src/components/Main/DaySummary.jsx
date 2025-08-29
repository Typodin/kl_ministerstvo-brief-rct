import { useState, useCallback } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import SectionWrapper from '../ui/SectionWrapper';
import DayItem from '../ui/DayItem';
import useFormatPhone from '../../hooks/useFormatPhone.js';
import useTelLink from '../../hooks/useTelLink.js';
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
	const formatTelLink = useTelLink();

	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const [lightboxSlides, setLightboxSlides] = useState([]);

	const openLightbox = useCallback((imgs, startIndex = 0) => {
		const slides = (Array.isArray(imgs) ? imgs : [])
			.map((img) => {
				const src = img?.detail || img?.preview;
				if (!src) return null;
				return { src, alt: 'Фото' };
			})
			.filter(Boolean);

		if (!slides.length) return;
		setLightboxSlides(slides);
		setLightboxIndex(Math.min(startIndex, slides.length - 1));
		setLightboxOpen(true);
	}, []);

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
				start && `Начало: ${start}`,
				finish && `Окончание: ${finish}`
			].filter(Boolean)
		},
		guests > 0 && {icon: UsersThreeIcon, title: 'Кол-во гостей', value: `${guests} чел`},
		(clientFio || clientPhone) && {
			icon: UserIcon,
			title: 'Клиент',
			value: [
				clientFio && clientFio,
				clientPhone && (
					<a href={formatTelLink(clientPhone)}>
						{formatPhone(clientPhone)}
					</a>
				)
			].filter(Boolean)
		},
		{icon: MapPinIcon, title: 'Адрес мероприятия', value: address},
		(placeName || placeFio || placePhone) && {
			icon: BuildingsIcon,
			title: 'Площадка',
			value: [
				placeName && `${placeName}`,
				placeFio && `${placeFio}`,
				placePhone && (
					<a href={formatTelLink(placePhone)}>
						{formatPhone(placePhone)}
					</a>
				)
			].filter(Boolean)
		}
	];

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
													<div className="question-images">
														{images.map((img, i) => {
															const preview = img?.preview || img?.detail;
															const detail = img?.detail || img?.preview;
															if (!preview) return null;

															return (
																<a
																	key={i}
																	href={detail || '#'}
																	onClick={(e) => {
																		e.preventDefault();
																		openLightbox(images, i);
																	}}
																	className="day-thumb"
																	aria-label={`Открыть изображение ${i + 1} в полноэкранном режиме`}
																>
																	<img src={preview} alt={`image-${i + 1}`} loading="lazy" />
																</a>
															);
														})}
													</div>
												</>
											)}

										</div>

									</div>
								);
							})}
						</div>
					)}

				</div>

			<Lightbox
				open={lightboxOpen}
				close={() => setLightboxOpen(false)}
				index={lightboxIndex}
				slides={lightboxSlides}
				plugins={[Zoom]}
				zoom={{ scrollToZoom: true, maxZoomPixelRatio: 3 }}
			/>


		</SectionWrapper>
	);
};

export default DaySummary;