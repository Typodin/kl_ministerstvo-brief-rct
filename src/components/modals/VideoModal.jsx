import ReactModal from 'react-modal';
import ReactPlayer from 'react-player';

ReactModal.setAppElement('#root');

const VideoModal = ({videoUrl, isOpen, onClose, autoplay}) => {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Video Modal"
			className="video-modal"
			overlayClassName="video-modal-overlay"
			ariaHideApp={false}
		>
			<button onClick={onClose} className="video-modal-close">
				&times;
			</button>
			<ReactPlayer url={videoUrl} controls width="100%" height="100%" playing={autoplay}/>
		</ReactModal>
	);
};

export default VideoModal;