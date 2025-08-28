import React, {useEffect, useState, Suspense, lazy} from 'react';
import closeIcon from '/images/ico/close.svg';

const ManagerModal = lazy(() => import('../modals/ManagerModal'));

export default function Sidebar({items, isOpen, onClose, data, pdfLink}) {
	const [activeId, setActiveId] = useState('');
	const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
	const [openSubmenus, setOpenSubmenus] = useState({});

	const manager = data || {};

	const toggleSubmenu = (id) => {
		setOpenSubmenus(prevState => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	useEffect(() => {
		const handleScroll = () => {
			let currentId = '';
			for (const item of items) {
				const element = document.getElementById(item.href);
				if (element && window.scrollY + 200 >= element.offsetTop) {
					currentId = item.href;
					if (item.items) {
						for (const child of item.items) {
							const childEl = document.getElementById(child.href);
							if (childEl && window.scrollY + 200 >= childEl.offsetTop) {
								currentId = child.href;
							}
						}
					}
				}
			}
			setActiveId(currentId);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [items]);

	const scrollToId = (id) => (e) => {
		e.preventDefault();
		const el = document.getElementById(id);
		el?.scrollIntoView({behavior: 'smooth'});
		onClose();
	};

	return (
		<>
			<aside className={`sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
				<div className="sidebar-container">
					<div className="sidebar-close">
						<button className="btn" id="closeMenu" type="button" onClick={onClose}>
							<img src={closeIcon} width="24" height="24" alt="Закрыть"/>
						</button>
					</div>
					<div className="sidebar-logo">
						<img src="/images/site/logo.svg" alt="" width="170" height="75"/>
					</div>

					<div className="sidebar-menu">
						<nav className="sidebar-menu-nav">
							<ul className="sidebar-menu-item">
								{items.map((item) => {
									const isParentActive = activeId === item.href ||
										item.items?.some(child => child.href === activeId);

									return (
										<li key={item.href} className={`parent ${isParentActive ? 'active' : ''}`}>

											<span
												className={`open-sub ${openSubmenus[item.href] || isParentActive ? 'opened' : ''}`}
												onClick={(e) => {
													e.stopPropagation();
													toggleSubmenu(item.href);
												}}
											></span>

											<a href={`#${item.href}`} onClick={scrollToId(item.href)}>
												{item.data && <span>{item.data}</span>}
												<span>{item.name}</span>
											</a>

											{item.items && (
												<ul className={`sidebar-menu-sub ${openSubmenus[item.href] || isParentActive ? 'open' : ''}`}>
													{item.items.map((child) => (
														<li key={child.href}>
															<a
																href={`#${child.href}`}
																className={activeId === child.href ? 'active' : ''}
																onClick={scrollToId(child.href)}
															>
																{child.name}
															</a>
														</li>
													))}
												</ul>
											)}
										</li>
									);
								})}
							</ul>
						</nav>

						<div className="sidebar-menu-downloads">
							<ul className="sidebar-menu-downloads-list">
								<li>
									<a href={pdfLink} target="_blank" rel="noopener noreferrer">
										<svg width="24" height="24" data-icon="download">
											<use xlinkHref="/icons/base.svg#download"/>
										</svg>
										<span>Скачать PDF</span>
									</a>
								</li>
							</ul>
						</div>

					</div>


					{manager && (
						<div className="sidebar-btn">
							<button
								className="btn btn-big btn-theme"
								type="button"
								onClick={() => setIsCustomModalOpen(true)}
							>
								<span>Связаться с менеджером</span>
							</button>
						</div>
					)}

				</div>
			</aside>

			<Suspense fallback={null}>
				<ManagerModal
					isOpen={isCustomModalOpen}
					onClose={() => setIsCustomModalOpen(false)}
					manager={manager}
				/>
			</Suspense>
		</>
	);
}