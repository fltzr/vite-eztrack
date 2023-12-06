/* eslint-disable react/no-multi-comp */
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import style from '@/features/layout/components/header/styles.module.scss';

const HeaderPortal = ({ children }: PropsWithChildren) => {
	const dom = document.querySelector('#h');

	if (!dom) {
		return null;
	}

	return createPortal(children, dom);
};

export const BlankTopNavigation = () => (
	<HeaderPortal>
		<div className={style.header}>
			<TopNavigation
				identity={{
					title: 'Eztrack',
					href: '/auth/signin',
				}}
			/>
		</div>
	</HeaderPortal>
);
