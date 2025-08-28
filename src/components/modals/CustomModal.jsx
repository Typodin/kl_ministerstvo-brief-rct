import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function CustomModal({isOpen, onClose, children}) {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Custom Modal"
			className="custom-modal"
			overlayClassName="custom-modal-overlay"
			ariaHideApp={false}
			closeTimeoutMS={300}
		>
			<button onClick={onClose} className="custom-modal-close">
				&times;
			</button>
			<div className="custom-modal-content">
				{children}
			</div>
		</ReactModal>
	);
}