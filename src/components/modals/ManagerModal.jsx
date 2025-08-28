import CustomModal from './CustomModal';
import useFormatPhone from '../../hooks/useFormatPhone';

const ManagerModal = ({isOpen, onClose, manager}) => {
	const formatPhone = useFormatPhone();

	return (
		<CustomModal isOpen={isOpen} onClose={onClose}>
			<div className="modal-manager">
				<h3 className="title-block-medium">Связаться с менеджером</h3>
				{Object.keys(manager || {}).length > 0 && (
					<>
						{(manager.last_name || manager.name) && (
							<div className="modal-manager-info">
								<span className="modal-manager-info-title">Ваш менеджер:</span>
								<span className="modal-manager-info-name">
									{[manager.last_name, manager.name].filter(Boolean).join(' ')}
								</span>
							</div>
						)}
						{manager.phone && (
							<div className="modal-manager-row">
								<a href={`tel:${manager.phone}`} target="_blank" className="modal-manager-row-link">
									<span className="ch-icon">
										<img src="/images/contacts/ico-phone.png" alt="Телефон"/>
									</span>
									<span className="ch-title">{formatPhone(manager.phone)}</span>
								</a>
							</div>
						)}
						{manager.phone && (
							<div className="modal-manager-row">
								<a href={`https://t.me/${manager.phone}`} target="_blank" className="modal-manager-row-link">
									<span className="ch-icon">
										<img src="/images/contacts/ico-tg.png" alt="Telegram"/>
									</span>
									<span className="ch-title">Telegram</span>
								</a>
							</div>
						)}
						{manager.phone && (
							<div className="modal-manager-row">
								<a href={`https://wa.me/${manager.phone}`} target="_blank" className="modal-manager-row-link">
									<span className="ch-icon">
										<img src="/images/contacts/ico-wtp.png" alt="WhatsApp"/>
									</span>
									<span className="ch-title">WhatsApp</span>
								</a>
							</div>
						)}
						{manager.email && (
							<div className="modal-manager-row">
								<a href={`mailto:${manager.email}`} target="_blank" className="modal-manager-row-link">
									<span className="ch-icon">
										<img src="/images/contacts/ico-mail.png" alt="E-mail"/>
									</span>
									<span className="ch-title">{manager.email}</span>
								</a>
							</div>
						)}
					</>
				)}
			</div>
		</CustomModal>
	);
};

export default ManagerModal;