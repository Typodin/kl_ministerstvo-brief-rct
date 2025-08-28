export default function Footer({data}) {

	const {catering, shop, office} = data;


	return data ? (
		<footer className="footer" id={data.sidebar_id}>
			<div className="alignment">
				<div className="footer-wrap">


					<div className="footer-col">
						<div className="footer-col-title">
							<svg width="24" height="24" data-icon="type">
								<use xlinkHref="/icons/base.svg#type"></use>
							</svg>
							<span>{catering.title}</span>
						</div>
						<div className="footer-col-contacts">
							<a href={`tel:${catering.phone}`}>{catering.phone}</a>
							<a href={`mailto:${catering.email}`}>{catering.email}</a>
							<a href={`https://${catering.site}`} target="_blank"><span>{catering.site}</span></a>
						</div>
						<a className="footer-col-yad" href={catering.links[0].link} target="_blank">
							<img src="/images/site/yad.png" alt="dzen"/>
						</a>
					</div>

					<div className="footer-col">
						<div className="footer-col-title">
							<svg width="24" height="24" data-icon="type">
								<use xlinkHref="/icons/base.svg#type"></use>
							</svg>
							<span>{shop.title}</span>
						</div>
						<div className="footer-col-contacts">
							<a href={`tel:${shop.phone}`}>{shop.phone}</a>
							<a href={`mailto:${shop.email}`}>{shop.email}</a>
							<a href={`https://${shop.site}`} target="_blank"><span>{shop.site}</span></a>
						</div>
						<a className="footer-col-yad" href={shop.links[0].link} target="_blank">
							<img src="/images/site/yad.png" alt="dzen"/>
						</a>
					</div>

					<div className="footer-col">
						<div className="footer-col-title">
							<svg width="24" height="24" data-icon="location">
								<use xlinkHref="/icons/base.svg#location"></use>
							</svg>
							<span>{office.title}</span>
						</div>
						<div className="footer-col-contacts">
							<a href={`tel:${office.phone}`}>{office.phone}</a>
							<span>{office.address}</span>
						</div>
						<div className="footer-col-icons">
							{office.social.map((item, idx) => (
								<a key={idx} href={item.link} target="_blank" rel="noopener noreferrer">
									<img src={item.icon} alt=""/>
								</a>
							))}
						</div>
					</div>

				</div>
			</div>
		</footer>
	) : null;
}