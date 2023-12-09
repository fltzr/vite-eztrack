import type { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

export const navigationItems = ({
	pathname,
}: {
	pathname: string;
}): SideNavigationProps['items'] => {
	if (pathname === '/') {
		return [
			{
				type: 'link',
				text: 'Todos',
				href: '/todos',
			},
			{
				type: 'link',
				text: 'Banks',
				href: '/banks',
			},
			{
				type: 'link',
				text: 'Demos',
				href: '/demos',
			},
		];
	}
	if (pathname === '/todos') {
		return [
			{
				type: 'link',
				text: 'Home',
				href: '/todos',
			},
			{
				type: 'link',
				text: 'Tasks',
				href: '/todos/tasks',
			},
			{
				type: 'link',
				text: 'Walkthrough',
				href: '/todos/walkthrough',
			},
		];
	}
	if (pathname === '/banks') {
		return [
			{
				type: 'link',
				text: 'Home',
				href: '/banks',
			},
			{
				type: 'link',
				text: 'Accounts',
				href: '/banks/accounts',
			},
		];
	}

	if (pathname === '/demos') {
		return [
			{
				type: 'link',
				text: 'Home',
				href: '/demos',
			},
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
			{
				type: 'link',
				text: 'Table',
				href: '/demos/table',
			},
		];
	}

	return [];
};
