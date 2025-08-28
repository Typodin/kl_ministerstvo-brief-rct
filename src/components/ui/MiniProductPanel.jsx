import React, {useEffect, useState} from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {getProduct} from '../../services/api/eventService';
import DOMPurify from 'dompurify';
import {decode} from 'html-entities';
import ImageSlider from './ImageSlider.jsx';
import Loader from './Loader.jsx';

const MiniProductPanel = ({productId, eventId, isOpen, onClose}) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (productId && isOpen) {
			setLoading(true);
			getProduct(eventId, productId)
				.then(data => setProduct(data))
				.catch(err => setError(err.message))
				.finally(() => setLoading(false));
		}
	}, [productId, isOpen, eventId]);

	return (
		<SlidingPane
			isOpen={isOpen}
			title={'Просмотр товара'}
			width={window.innerWidth > 530 ? '530px' : '95%'}
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
							<ImageSlider images={product.images}/>
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
				</div>
			)}
		</SlidingPane>
	);
};

export default MiniProductPanel;