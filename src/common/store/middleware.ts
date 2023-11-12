import { createLogger } from 'redux-logger';

export const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
    logErrors: true,
    diff: true,
    colors: {
        title: (action) => {
            if (action.error) return 'red';
            return '#03a9f4';
        },
        prevState: () => '#9e9e9e',
        action: () => '#03a9f4',
        nextState: () => '#4caf50',
        error: () => '#f20404',
    },
});
