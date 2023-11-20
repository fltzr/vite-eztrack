import { dirname, join } from 'path';
import { buildThemedComponents } from '@cloudscape-design/components-themeable/theming';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const theme = {
	tokens: {
		borderRadiusAlert: '0px',
		borderRadiusBadge: '0px',
		borderRadiusButton: '0.5rem',
		borderRadiusCalendarDayFocusRing: '0px',
		borderRadiusContainer: '0px',
		borderRadiusControlCircularFocusRing: '0px',
		borderRadiusControlDefaultFocusRing: '0px',
		borderRadiusDropdown: '0px',
		borderRadiusFlashbar: '0px',
		borderRadiusInput: '0px',
		borderRadiusItem: '0px',
		borderRadiusPopover: '0px',
		borderRadiusTabsFocusRing: '0px',
		borderRadiusTiles: '0px',
		borderRadiusToken: '0px',
		borderRadiusTutorialPanelItem: '0px',
	},
};

buildThemedComponents({
	theme,
	outputDir: __dirname,
});
