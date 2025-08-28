import React, {useRef, useState, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MediaGallery from './MediaGallery.jsx';

export default function ImageSlider({images, videos}) {
	const [validatedMedia, setValidatedMedia] = useState([]);
	const galleryRef = useRef(null);

	useEffect(() => {
		const safeImages = Array.isArray(images) ? images : [];
		const safeVideos = Array.isArray(videos) ? videos : [];

		const allMedia = [
			...safeImages.map(src => ({type: 'image', src})),
			...safeVideos.map(v => ({
				type: 'video',
				src: v.file,
				poster: v.image || '/images/site/fallback-img.jpg',
			})),
		];

		setValidatedMedia(allMedia);
	}, [images, videos]);

	const handleSlideClick = (index) => {
		if (galleryRef.current) {
			galleryRef.current.openGallery(index);
		}
	};

	return (
		<>
			<div className="image-slider">
				<Swiper
					modules={[Navigation, Pagination, A11y, Autoplay]}
					spaceBetween={10}
					navigation
					pagination={{clickable: true}}
					loop={validatedMedia.length > 1}
				>
					{validatedMedia.map((item, idx) => (
						<SwiperSlide key={idx}>
							<img
								src={item.poster || item.src || '/images/site/fallback-null.jpg'}
								alt={`Slide ${idx + 1}`}
								loading="lazy"
								style={{width: '100%', height: '100%', objectFit: 'cover'}}
								className={item.type === 'video' ? 'slide-video' : ''}
								onError={(e) => {
									e.target.src = '/images/site/fallback-img.jpg';
									e.target.onerror = null;
								}}
								onClick={() => handleSlideClick(idx)}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<MediaGallery
				ref={galleryRef}
				media={validatedMedia.map(item => {
					if (item.type === 'video') {
						return {
							type: 'video',
							sources: [{src: item.src, type: 'video/mp4'}],
							poster: item.poster,
							width: 1280,
							height: 720,
						};
					}
					return {src: item.src};
				})}
			/>
		</>
	);
}