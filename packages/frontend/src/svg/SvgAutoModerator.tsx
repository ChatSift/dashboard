import { theme } from '~/stitches/stitches.config';

function SvgAutoModerator({ width, height }: { height?: number; width?: number }) {
	return (
		<svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.5 4.5V15L12 21L19.5 15V4.5H4.5Z"
				stroke={theme.colors.miscAccent.toString()}
				strokeWidth="1.875"
				strokeLinejoin="round"
			/>
			<path
				d="M9 9V12.8182L12 15L15 12.8182V9H9Z"
				fill={theme.colors.textPrimary.toString()}
				stroke={theme.colors.textPrimary.toString()}
				strokeWidth="1.875"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default SvgAutoModerator;
