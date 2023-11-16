import SideNavigation from '@cloudscape-design/components/side-navigation';
import { useAppSelector } from '@/common/hooks';
import { selectActiveHref, selectDomainTitle } from '../../selectors';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
    const navigate = useNavigate();
    const title = useAppSelector(selectDomainTitle);
    const activeHref = useAppSelector(selectActiveHref);

    return (
        <SideNavigation
            header={
                title
                    ? {
                          href: '/',
                          text: title,
                      }
                    : undefined
            }
            activeHref={activeHref}
            items={[
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
                if (!event.detail.external) {
                    event.preventDefault();
                    navigate(event.detail.href);
                }
            }}
        />
    );
};
