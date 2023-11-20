/* eslint-disable react/no-multi-comp */
import { type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { SettingsModal } from '../settings-modal';
import styles from './styles.module.scss';

const HeaderPortal = ({ children }: PropsWithChildren) => {
	const dom = document.querySelector('#h');

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
								onClick: () => {
									setSettingsOpen(!settingsOpen);
								},
							},
						]}
					/>
				</div>
			</HeaderPortal>
			<SettingsModal
				visible={settingsOpen}
				onDismiss={() => {
					setSettingsOpen(false);
				}}
			/>
		</>
	);
};
