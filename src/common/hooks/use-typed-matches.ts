import { useMatches, type UIMatch } from 'react-router-dom';

interface Handle {
	title?: () => string;
	navigationHidden?: boolean;
	navigationOpen?: boolean;
	toolsHidden?: boolean;
	toolsOpen?: boolean;
}

export const useTypedMatches = () =>
	useMatches() as UIMatch<unknown, Handle | undefined>[];
