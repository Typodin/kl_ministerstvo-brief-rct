import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const MediaGallery = forwardRef(({media = []}, ref) => {
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	useImperativeHandle(ref, () => ({
		openGallery: (slideIndex = 0) => {
			setIndex(slideIndex);
			setOpen(true);
		}
	}));

	return (
		<Lightbox
			open={open}
			close={() => setOpen(false)}
			index={index}
			slides={media}
			plugins={[Video, Thumbnails]}
			thumbnails={{position: 'bottom', width: 100, height: 60}}
		/>
	);
});

export default MediaGallery;