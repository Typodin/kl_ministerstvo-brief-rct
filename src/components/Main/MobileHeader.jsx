import {useMediaQuery} from 'react-responsive';
import React, {useState, Suspense, lazy} from 'react';

const ManagerModal = lazy(() => import('../modals/ManagerModal'));

const MobileHeader = ({onOpenMenu, data, pdfLink}) => {
	const isMobile = useMediaQuery({maxWidth: 1110});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const manager = data || {};

	if (!isMobile) return null;

	return (
		<div className="mobile-header">
			<div className="mobile-header-wrap">
				<div className="mobile-header-menu">
					<button className="btn btn-theme" id="openMenu" type="button" onClick={onOpenMenu}>
						<img src="/images/ico/menu.svg" width="32" height="32" alt="Меню"/>
					</button>
					<span>Меню</span>
				</div>
				<div className="mobile-header-btns">
					<a className="btn" href={pdfLink} target="_blank" rel="noopener noreferrer">
						<svg width="24" height="24" data-icon="download">
							<use xlinkHref="/icons/base.svg#download"></use>
						</svg>
					</a>
					{manager && (
						<button className="btn btn-theme" type="button" onClick={() => setIsModalOpen(true)}>
							<img src="/images/ico/phone.svg" width="24" height="24" alt="Связаться"/>
						</button>
					)}
				</div>
			</div>
			<Suspense fallback={null}>
				<ManagerModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					manager={manager}
				/>
			</Suspense>
		</div>
	);
};

export default MobileHeader;