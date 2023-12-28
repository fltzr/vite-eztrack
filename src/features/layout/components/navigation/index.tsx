import { useNavigate } from 'react-router-dom';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { selectActiveHref, selectDomainTitle } from '../../state/selectors';
import { navigationItems } from './navigation-items';
import { useAppSelector } from '@/common/hooks';

export const Navigation = () => {
	const navigate = useNavigate();
	const title = useAppSelector(selectDomainTitle);
	const activeHref = useAppSelector(selectActiveHref);

	return (
		<SideNavigation
			activeHref={activeHref}
			items={navigationItems({ pathname: activeHref })}
			header={
				title
					? {
							href: '/',
							text: title,
					  }
					: undefined
			}
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
