import React from 'react';

const Pagetitle = ({title, dealId}) => {
	if (!title) return null;
	return (
		<section
			className="ptb-70 content-row pagetitle mb-70"
			style={{backgroundImage: `url(public/images/bgs/pagetitle.jpg)`}}
		>
			<div className="container">
				<div className="alignment">
					<div className="pagetitle-logo">
						<img src="/images/site/logo-mobile.svg" alt="Ministerstvo Catering Company"/>
					</div>
					<div className="pagetitle-deal">Сделка: <span>{dealId}</span></div>
					<h1 className="pagetitle-item">{title}</h1>
				</div>
			</div>
		</section>
	);
};
export default Pagetitle;