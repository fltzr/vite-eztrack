import { useMatches, type UIMatch } from 'react-router-dom';

type Handle = {
	title?: () => string;
	navigationHidden?: boolean;
	navigationOpen?: boolean;
	toolsHidden?: boolean;
	toolsOpen?: boolean;
};

export const useTypedMatches = () =>
	useMatches() as UIMatch<unknown, Handle | undefined>[];
