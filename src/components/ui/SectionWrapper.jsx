import React from 'react';

const SectionWrapper = ({children, id = '', className = ''}) => {
	return (
		<section id={id} className={`content-row ${className}`}>
			<div className="container">
				<div className="alignment">
					{children}
				</div>
			</div>
		</section>
	);
};

export default SectionWrapper;