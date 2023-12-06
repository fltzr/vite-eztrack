/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useContext, type ReactNode } from 'react';

const HelpPanelContext = createContext<((content: ReactNode) => void) | null>(null);

export const HelpPanelProvider = HelpPanelContext.Provider;

export const useHelpPanel = () => {
	const ctx = useContext(HelpPanelContext);

	if (!ctx) {
		throw new Error('useHelpPanel must be used within HelpPanelProvider');
	}

	return ctx;
};
