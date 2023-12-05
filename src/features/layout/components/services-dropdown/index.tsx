import Link from '@cloudscape-design/components/link';
import Popover from '@cloudscape-design/components/popover';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { RouterLink } from '@/common/components/router-link';

export const ServicesDowndown = () => (
	<Popover
		fixedWidth
		renderWithPortal
		triggerType="custom"
		position="bottom"
		size="large"
		content={
			<SpaceBetween size="xs">
				<RouterLink to="/demos" label="Demos" />
				<RouterLink to="/banks" label="Banks" />
				<RouterLink to="/todos" label="Todos" />
				<RouterLink to="/account" label="Account" />
			</SpaceBetween>
		}
	>
		<Link variant="primary">Services</Link>
	</Popover>
);
