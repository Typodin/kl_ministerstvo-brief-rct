import React from 'react';

const ContactInfo = ({title, person, formatPhone}) => (
	Object.keys(person).length > 0 && (
		<div className="intro-contacts-item">
			<div className="intro-contacts-item-title"><span>{title}</span></div>
			{(person.last_name || person.name) && (
				<div className="intro-contacts-item-info">
					<span>{[person.last_name, person.name].filter(Boolean).join(' ')}</span>
				</div>
			)}
			{person.phone && (
				<div className="intro-contacts-item-info">
					<a href={`tel:+${person.phone}`}>{formatPhone(person.phone)}</a>
				</div>
			)}
			{person.email && (
				<div className="intro-contacts-item-info">
					<a href={`mailto:${person.email}`}>{person.email}</a>
				</div>
			)}
		</div>
	)
);

export default ContactInfo;