import { useEffect } from 'react';
import { usePlaidLink, type PlaidLinkOptions } from 'react-plaid-link';
import Button from '@cloudscape-design/components/button';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectBankLinkToken } from '../../selectors';
import { exchangePublicToken, fetchLinkToken } from '../../slice';

export const Link = () => {
	const dispatch = useAppDispatch();
	const linkToken = useAppSelector(selectBankLinkToken);

	useEffect(() => {
		void dispatch(fetchLinkToken());
	}, [dispatch]);

	const onSuccess = (publicToken: string, metadata: unknown) => {
		console.log(metadata);
		void dispatch(exchangePublicToken(publicToken));
	};

	const config: PlaidLinkOptions = {
		token: linkToken,
		onSuccess,
	};

	const { ready, open } = usePlaidLink(config);

	return (
		<Button
			variant="primary"
			loading={!ready}
			loadingText="Initializing Plaid..."
			disabled={!ready}
			onClick={() => void open()}
		>
			Connect a bank account
		</Button>
	);
};
