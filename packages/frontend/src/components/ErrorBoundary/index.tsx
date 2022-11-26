import { ApiError } from 'next/dist/server/api-utils';
import type { ReactNode } from 'react';
import type { ErrorBoundaryPropsWithRender, FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import * as Button from '../Button';
import * as Styles from './style';

const GhostLink = Button.Ghost.withComponent('a');

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	if (error instanceof ApiError) {
		return (
			<Styles.Base>
				<Styles.Title>API Error {error.statusCode}</Styles.Title>
				<Styles.Buttons>
					<Button.Cta onPress={resetErrorBoundary}>Reload</Button.Cta>
					<GhostLink href="/github/issues" target="_blank" hasBorder>
						Open an Issue
					</GhostLink>
					<Button.Ghost href="/dashboard" hasBorder>
						Back to Dashboard
					</Button.Ghost>
				</Styles.Buttons>
			</Styles.Base>
		);
	}

	return (
		<Styles.Base>
			<Styles.Title>Something went wrong</Styles.Title>
			<Styles.Buttons>
				<Button.Cta onPress={resetErrorBoundary}>Reload</Button.Cta>
				<GhostLink href="/github/issues" target="_blank" hasBorder>
					Open an Issue
				</GhostLink>
			</Styles.Buttons>
		</Styles.Base>
	);
}

type ErrorBoundaryProps = {
	children: ReactNode;
	errorFallback?: ErrorBoundaryPropsWithRender['fallbackRender'];
};

function ErrorBoundary({ children, errorFallback = ErrorFallback }: ErrorBoundaryProps) {
	return <ReactErrorBoundary fallbackRender={errorFallback}>{children}</ReactErrorBoundary>;
}

export default ErrorBoundary;
