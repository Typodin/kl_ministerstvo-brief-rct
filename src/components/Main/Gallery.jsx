import React, {useState, useMemo, useRef} from 'react';
import MediaGallery from '../ui/MediaGallery.jsx';
import SectionWrapper from '../ui/SectionWrapper.jsx';

export default function Gallery({data}) {
	const [activeTab, setActiveTab] = useState(data.items[0]?.id);
	const galleryRef = useRef(null);

	const activeMedia = useMemo(() => {
		const activeItem = data.items.find(item => item.id === activeTab);

		if (!activeItem) return [];

		const images = activeItem.images.map(img => ({
			type: 'image',
			src: img.detail,
			thumb: img.preview
		}));

		const videos = activeItem.videos?.map(video => ({
			type: 'video',
			src: video.file,
			thumb: video.image,
			poster: video.image,
			sources: [{src: video.file, type: 'video/mp4'}]
		})) || [];

		return [...images, ...videos];
	}, [activeTab, data.items]);

	const handleMediaClick = (index) => {
		galleryRef.current?.openGallery(index);
	};

	return (
		<>
			{data.items.length > 1 && (
				<div className="block pad-10 gallery-filter">
					{data.items.map(item => (
						<button
							key={item.id}
							className={`btn btn-medium btn-light ${item.id === activeTab ? 'active' : ''}`}
							onClick={() => setActiveTab(item.id)}
						>
							<span>{item.name}</span>
						</button>
					))}
				</div>
			)}
			<div className="gallery" key={activeTab}>
				{activeMedia.map((media, idx) => (
					<div
						key={idx}
						className={`gallery-item ${media.type === 'video' ? 'gallery-video' : ''}`}
						onClick={() => handleMediaClick(idx)}
					>
						<img
							src={media.thumb}
							alt=""
							loading="lazy"
							onLoad={(e) => e.target.classList.add('loaded')}
						/>
					</div>
				))}
			</div>

			<MediaGallery ref={galleryRef} media={activeMedia}/>
		</>
	);
}