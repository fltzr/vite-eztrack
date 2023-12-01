import { useNavigate } from 'react-router-dom';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { useAppSelector } from '@/common/hooks';
import { selectActiveHref, selectDomainTitle } from '../../state/selectors';

export const Navigation = () => {
	const navigate = useNavigate();
	const title = useAppSelector(selectDomainTitle);
	const activeHref = useAppSelector(selectActiveHref);

	return (
		<SideNavigation
			activeHref={activeHref}
			header={
				title
					? {
							href: '/',
							text: title,
					  }
					: undefined
			}
			items={[
				{
					type: 'link',
					text: 'Todos',
					href: '/todos',
				},
				{ type: 'divider' },
				{
					type: 'section',
					text: 'Banks',
					items: [{ type: 'link', text: 'Accounts', href: '/banks' }],
				},
				{ type: 'divider' },
				{
					type: 'section',
					text: 'Demos',
					items: [
						{
							type: 'link',
							text: 'Single Page Form',
							href: '/demos/single-page-form',
						},
						{
							type: 'link',
							text: 'Wizard Form',
							href: '/demos/wizard',
						},
					],
				},
			]}
			onFollow={(event) => {
				if (event.detail.external) {
					return;
				}

				event.preventDefault();
				navigate(event.detail.href);
			}}
		/>
	);
};
