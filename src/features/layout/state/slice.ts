import {
	Mode as Theme,
	Density,
	applyMode as applyTheme,
	applyDensity,
} from '@cloudscape-design/global-styles';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import type { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { startAppListening } from '@/common/store/listener-middleware';
import { load, save } from '@/common/utils/local-storage';

type Notification = FlashbarProps.MessageDefinition & { autoDismiss?: boolean };

export interface LayoutState {
	theme: Theme;
	density: Density;
	domainTitle: string;
	activeHref: string;
	breadcrumbs: BreadcrumbGroupProps.Item[];
	stickyNotifications?: boolean;
	notifications?: Notification[];
	navigationOpen: boolean;
	navigationHidden: boolean;
	toolsOpen: boolean;
	toolsHidden: boolean;
}

const getInitialState = (): LayoutState => {
	const theme = load<Theme>('theme') ?? Theme.Light;
	const density = load<Density>('density') ?? Density.Comfortable;

	applyTheme(theme);
	applyDensity(density);

	return {
		theme,
		density,
		domainTitle: '',
		activeHref: '/',
		breadcrumbs: [],
		stickyNotifications: true,
		notifications: [],
		navigationOpen: false,
		navigationHidden: false,
		toolsOpen: false,
		toolsHidden: false,
	};
};

const layoutSlice = createSlice({
	name: 'layout',
	initialState: getInitialState(),
	reducers: {
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
		setDensity: (state, action: PayloadAction<Density>) => {
			state.density = action.payload;
		},
		setDomainTitle: (state, action: PayloadAction<string>) => {
			state.domainTitle = action.payload;
		},
		setActiveHref: (state, action: PayloadAction<string>) => {
			state.activeHref = action.payload;
		},
		setBreadcrumbs: (state, action: PayloadAction<BreadcrumbGroupProps.Item[]>) => {
			state.breadcrumbs = action.payload;
		},
		addNotification: (state, action: PayloadAction<Notification>) => {
			state.notifications?.push(action.payload);
		},
		removeNotification: (state, action: PayloadAction<string>) => {
			state.notifications = state.notifications?.filter(
				(notification) => notification.id !== action.payload,
			);
		},
		removeAllNotifications: (state) => {
			state.notifications = [];
		},
		setNavigationOpen: (state, action: PayloadAction<boolean>) => {
			state.navigationOpen = action.payload;
		},
		setNavigationHidden: (state, action: PayloadAction<boolean>) => {
			state.navigationHidden = action.payload;
		},
		setToolsOpen: (state, action: PayloadAction<boolean>) => {
			state.toolsOpen = action.payload;
		},
		setToolsHidden: (state, action: PayloadAction<boolean>) => {
			state.toolsHidden = action.payload;
		},
	},
});

export const {
	setTheme,
	setDensity,
	setDomainTitle,
	setActiveHref,
	setBreadcrumbs,
	addNotification,
	removeNotification,
	removeAllNotifications,
	setNavigationOpen,
	setNavigationHidden,
	setToolsOpen,
	setToolsHidden,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;

startAppListening({
	actionCreator: setTheme,
	effect: (action) => {
		save<Theme>('theme', action.payload);
		applyTheme(action.payload);
	},
});

startAppListening({
	actionCreator: setDensity,
	effect: (action) => {
		save<Density>('density', action.payload);
		applyDensity(action.payload);
	},
});
