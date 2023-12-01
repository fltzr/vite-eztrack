/* eslint-disable react/no-multi-comp */
import { type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { selectUser } from '@/features/auth/state/selectors';
import { useAppSelector } from '@/common/hooks';
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

	const user = useAppSelector(selectUser);

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
							{
								type: 'menu-dropdown',
								text: `Howdy, ${user?.firstname}!`,
								iconName: 'user-profile-active',
								items: [
									{
										id: 'dropdown-1',
										text: 'Dropdown 1',
										items: [
											{
												id: 'dropdown-1-sub-1',
												text: 'Dropdown 1 Sub 1',
												href: '/',
											},
											{
												id: 'dropdown-1-sub-2',
												text: 'Dropdown 1 Sub 2',
												href: '/',
											},
										],
									},
									{
										id: 'dropdown-2',
										text: 'Dropdown 2',
										href: '/',
									},
									{
										id: 'dropdown-3',
										text: 'Dropdown 3',
										href: '/',
									},
								],
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
