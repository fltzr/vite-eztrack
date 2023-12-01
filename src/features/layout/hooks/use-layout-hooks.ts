import { useActiveHref } from './use-active-href';
import { useBreadcrumbs } from './use-breadcrumbs';
import { useDismissNotifications } from './use-dismiss-notification';
import { useRouteTitle } from './use-route-title';

export const useLayoutHooks = () => {
	useActiveHref();
	useBreadcrumbs();
	useDismissNotifications();
	useRouteTitle();
};
