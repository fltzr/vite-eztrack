import BreadcrumbGroup, {
	type BreadcrumbGroupProps,
} from '@cloudscape-design/components/breadcrumb-group';

type BreadcrumbsProps = {
	crumbs: BreadcrumbGroupProps.Item[];
};
export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => (
	<BreadcrumbGroup items={crumbs} />
);
