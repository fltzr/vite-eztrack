import type { AppState } from '@/common/store';

export const selectOnline = (state: AppState) => state.layout.online;
export const selectTheme = (state: AppState) => state.layout.theme;
export const selectDensity = (state: AppState) => state.layout.density;
export const selectDomainTitle = (state: AppState) => state.layout.domainTitle;
export const selectActiveHref = (state: AppState) => state.layout.activeHref;
export const selectBreadcrumbs = (state: AppState) => state.layout.breadcrumbs;
export const selectStickyNotifications = (state: AppState) =>
	state.layout.stickyNotifications;
export const selectNotifications = (state: AppState) => state.layout.notifications;
export const selectNavigationOpen = (state: AppState) => state.layout.navigationOpen;
export const selectNavigationHidden = (state: AppState) => state.layout.navigationHidden;
export const selectToolsOpen = (state: AppState) => state.layout.toolsOpen;
export const selectToolsHidden = (state: AppState) => state.layout.toolsHidden;
