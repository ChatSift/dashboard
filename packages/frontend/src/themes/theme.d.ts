import type { Theme } from '@emotion/react';

export type ThemeName = 'dark' | 'light';

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export interface Theme {
		colors: {
			accent: string;
			background: {
				card: string;
				default: string;
			};
			danger: string;
			onBackground: {
				primary: string;
				secondary: string;
				tertiary: string;
			};
			text: {
				currentColor: string;
				disabled: string;
				onAccent: string;
				primary: string;
				secondary: string;
			};
		};
		name: ThemeName;
	}
}

export type ThemeProps<T = {}> = T & {
	theme: Theme;
};
