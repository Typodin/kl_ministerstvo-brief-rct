import React, {useEffect, useState} from 'react';
import SlidingPane from 'react-sliding-pane';
import MiniProductPanel from './MiniProductPanel.jsx';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {getProduct} from '../../services/api/eventService';
import DOMPurify from 'dompurify';
import {decode} from 'html-entities';
import ImageSlider from './ImageSlider.jsx';
import Loader from './Loader.jsx';

const ProductPanel = ({productId, eventId, isOpen, onClose}) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [miniPanelId, setMiniPanelId] = useState(null);

	useEffect(() => {
		if (!product) return;

		const links = document.querySelectorAll('.pdp-set-title');
		const handler = (e) => {
			e.preventDefault();
			const id = e.currentTarget.getAttribute('href');
			if (id) setMiniPanelId(id);
		};

		links.forEach(el => el.addEventListener('click', handler));
		return () => links.forEach(el => el.removeEventListener('click', handler));
	}, [product]);

	useEffect(() => {
		if (productId && isOpen) {
			setLoading(true);
			getProduct(eventId, productId)
				.then(data => setProduct(data))
				.catch(err => setError(err.message))
				.finally(() => setLoading(false));
		}
	}, [productId, isOpen, eventId]);

	useEffect(() => {
		if (!isOpen) {
			setProduct(null);
		}
	}, [isOpen]);


	return (
		<SlidingPane
			isOpen={isOpen}
			title={'Просмотр товара'}
			width={window.innerWidth > 550 ? '550px' : '100%'}
			onRequestClose={onClose}
			style={{zIndex: 9999}}
		>
			{loading && <Loader/>}
			{error && <p>Ошибка: {error}</p>}

			{product && (
				<div className="product-detail-panel">
					<div className="pdp-title"><span>{product.name}</span></div>

					<div className="pdp-images">
						{product.images?.length > 0 && (
							<ImageSlider
								images={product.images}
							/>
						)}
						{product.images === null && (
							<img src="/images/site/fallback-null.jpg" alt=""/>
						)}
					</div>

					<div className="pdp-info block pad-20">
						{product.weight && (
							<div className="pdp-info-add">
								<span className="pdp-info-add-title">Вес:</span>
								<span className="pdp-info-add-price">{product.weight} {product.units}</span>
							</div>
						)}
						{product.ingredients && (
							<div className="pdp-info-add">
								<span className="pdp-info-add-title">Состав:</span>
								<span className="pdp-info-add-list">{product.ingredients}</span>
							</div>
						)}
						{product.description && (
							<div className="contents">
								<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(decode(product.description))}}/>
							</div>
						)}
					</div>

					{product.set && <h3 className="mt-20">Состав комплекта</h3>}
					{product.set?.map((group, idx) => (
						<div key={idx} className="block pad-20 mt-10">
							<h4 className="pdp-set-header">{group.header.name}</h4>
							{group.items.map(item => (
								<div key={item.id} className="pdp-set">
									<div className="pdp-set-img">
										<img
											src={`${item.picture}`}
											alt={item.name}
											width="60"
											onError={(e) => {
												e.target.src = '/images/site/fallback-img.jpg';
												e.target.onerror = null;
											}}
										/>
									</div>
									<a
										href={item.id}
										className="pdp-set-title"
										onClick={(e) => {
											e.preventDefault();
											setMiniPanelId(item.id);
										}}
									>
										<span>{item.name}</span>
										<span>{item.quantity} шт</span>
									</a>
								</div>
							))}
						</div>
					))}
				</div>
			)}
			<MiniProductPanel
				isOpen={!!miniPanelId}
				onClose={() => setMiniPanelId(null)}
				productId={miniPanelId}
				eventId={eventId}
			/>
		</SlidingPane>
	);
};

export default ProductPanel;