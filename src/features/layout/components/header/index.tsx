import { createPortal } from 'react-dom';
import { PropsWithChildren, useState } from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { SettingsModal } from '../settings-modal';

const HeaderPortal = ({ children }: PropsWithChildren) => {
	const dom = document.getElementById('h');

	if (!dom) {
		return null;
	}

	return createPortal(children, dom);
};
export const Header = () => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<HeaderPortal>
				<div className={styles.header}>
					<TopNavigation
						identity={{
							title: 'Ez',
							href: '/',
							onFollow: (event) => {
								event.preventDefault();
								navigate('/');
							},
						}}
						utilities={[
							{
								type: 'button',
								iconName: 'settings',
								onClick: () => setSettingsOpen(!settingsOpen),
							},
						]}
					/>
				</div>
			</HeaderPortal>
			<SettingsModal visible={settingsOpen} onDismiss={() => setSettingsOpen(false)} />
		</>
	);
};
