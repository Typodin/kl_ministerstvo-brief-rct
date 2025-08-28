import React, {useEffect, useState, useRef} from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {getSimilarItems} from '../../services/api/eventService';
import {getMedia} from '../../services/api/eventService';
import DOMPurify from 'dompurify';
import {decode} from 'html-entities';
import Loader from './Loader.jsx';
import useFormatNumber from '../../hooks/useFormatNumber.js';
import MediaGallery from './MediaGallery.jsx';

const SimilarPanel = ({eventId, link, isOpen, onClose, onProductClick, isComplex = false}) => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const contentRefs = useRef({});
	const [expandedItems, setExpandedItems] = useState({});
	const [expandableItems, setExpandableItems] = useState({});

	const formatNumber = useFormatNumber();

	const [galleryMedia, setGalleryMedia] = useState([]);
	const galleryRef = useRef(null);


	useEffect(() => {
		if (link && isOpen) {
			setLoading(true);
			getSimilarItems(eventId, link)
				.then(data => setItems(data.items))
				.catch(err => setError(err.message))
				.finally(() => setLoading(false));
		}
	}, [eventId, link, isOpen]);

	useEffect(() => {
		if (!isOpen) {
			setItems([]);
			setGalleryMedia([]);
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const newExpandable = {};
		Object.keys(contentRefs.current).forEach(key => {
			const el = contentRefs.current[key];
			if (el && el.scrollHeight > 300) {
				newExpandable[key] = true;
			}
		});
		setExpandableItems(newExpandable);
	}, [items, isOpen]);

	const handleImageClick = (itemId) => {
		getMedia(eventId, itemId)
			.then(data => {
				const mediaItems = [
					...(data.images || []).map(img => ({ type: 'image', src: img })),
					...(data.videos || []).map(video => ({
						type: 'video',
						sources: [{ src: video.file, type: 'video/mp4' }],
						poster: video.image,
						width: 1280,
						height: 720,
					}))
				];
				setGalleryMedia(mediaItems);
				setTimeout(() => {
					galleryRef.current?.openGallery(0);
				}, 100);
			})
			.catch(err => console.error('Ошибка при загрузке медиа:', err));
	};

	const getImageSrc = (picture) => {
		if (picture === null) {
			return '/images/site/fallback-null.jpg';
		}
		if (!picture) {
			return '/images/site/fallback-img.jpg';
		}
		return picture.startsWith('http')
			? picture
			: `https://m-catering.ks04.ru${picture}`;
	};

	return (
		<SlidingPane
			isOpen={isOpen}
			title={isComplex ? 'Похожие услуги' : 'Похожие товары'}
			width={window.innerWidth > 1320 ? '1320px' : '100%'}
			onRequestClose={onClose}
		>
			{loading && <Loader/>}
			{error && <p>Ошибка: {error}</p>}

			<div className="similar-items-panel block pad-20">
				{items.map(item => (
					<div key={item.id} className="similar-item">
						{isComplex
							? (
								<div className="service-simular">
									<h3 className="block-title">{item.name}</h3>
									<div className="station">
										<div className="station-slider">
											<div className="station-slider-image" onClick={() => handleImageClick(item.id)}>
												<img
													src={getImageSrc(item.picture)}
													alt={item.name || item.name_1}
													width="435"
													height="325"
													loading="lazy"
													onError={(e) => {
														e.target.src = '/images/site/fallback-img.jpg';
														e.target.onerror = null;
													}}
												/>
											</div>
											<div className="station-slider-info">

												{item.photo_count > 0 &&
													<div className="ch-item">
														<img src="/images/ico/camera.svg" alt="Фото" width="24"/>
														<span>{item.photo_count} фото</span>
													</div>}

												{item.video_count > 0 &&
													<div className="ch-item">
														<img src="/images/ico/video.svg" alt="Фото" width="24"/>
														<span>{item.video_count} видео</span>
													</div>}

											</div>

										</div>

										<div className="station-data">
											{item.weight &&
												<div className="station-data-item">
													<span>Вес:</span>
													<span>{formatNumber(item.weight)} {item.units}</span>
												</div>}

											<div className="station-content">
												{item.description && (
													<>
														<div className="contents-wrapper" style={{position: 'relative'}}>
															<div
																className="contents"
																ref={el => contentRefs.current[item.id] = el}
																style={{
																	maxHeight: expandedItems[item.id] ? 'none' : '300px',
																	overflow: expandableItems[item.id] && !expandedItems[item.id] ? 'hidden' : 'visible',
																	transition: 'max-height 0.4s ease'
																}}
															>
																<div
																	dangerouslySetInnerHTML={{
																		__html: DOMPurify.sanitize(decode(item.description))
																	}}
																/>
															</div>

															{!expandedItems[item.id] && expandableItems[item.id] && (
																<div
																	style={{
																		position: 'absolute',
																		bottom: 0,
																		left: 0,
																		right: 0,
																		height: '60px',
																		background: 'linear-gradient(to bottom, transparent, white)'
																	}}
																/>
															)}
														</div>

														{expandableItems[item.id] && (
															<button
																className="btn-link"
																style={{marginTop: 10}}
																type="button"
																onClick={() =>
																	setExpandedItems(prev => ({...prev, [item.id]: !prev[item.id]}))
																}
															>
																<span>{expandedItems[item.id] ? 'Скрыть' : 'Открыть полное описание'}</span>
															</button>
														)}
													</>
												)}
											</div>

										</div>

									</div>

								</div>
							)
							: (
								<div className="product-list">
									<div className="product-list-img">
										<img
											src={getImageSrc(item.picture)}
											alt={item.name || item.name_1}
											width="150"
											height="135"
											loading="lazy"
											onError={(e) => {
												e.target.src = '/images/site/fallback-img.jpg';
												e.target.onerror = null;
											}}
										/>
									</div>
									<div className="product-list-weight">
										<div className="product-list-weight-item">
											{item.weight != null && <span>{item.weight} {item.units}</span>}
										</div>
									</div>
									<div className="product-list-name">
										<a className="product-list-name-item" href="#" onClick={(e) => {
											e.preventDefault();
											onProductClick?.(item.id);
										}}>
											<span>{item.name_1}</span>
											{item.name_2 && <span>{item.name_2}</span>}
										</a>
									</div>
									{item.tags?.length > 0 && (
										<div className="product-list-tags">
											{item.tags.map((tag, idx) => (
												<span key={idx} className={`label label-${tag.color}`}>
													{tag.name}
													<svg width="24" height="24">
														<use xlinkHref={`/icons/${tag.class}`}></use>
													</svg>
												</span>
											))}
										</div>
									)}
									{item.min_quantity && (
										<div className="product-list-value">
											<span className="ch-prefix">от</span>
											<span className="ch-item">{item.min_quantity}</span>
											<span className="ch-unit">шт</span>
										</div>
									)}
								</div>
							)
						}

					</div>
				))}
			</div>
			<MediaGallery ref={galleryRef} media={galleryMedia}/>
		</SlidingPane>
	);
};

export default SimilarPanel;