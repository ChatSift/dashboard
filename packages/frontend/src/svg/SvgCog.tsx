import { useTheme } from '@emotion/react';
import type { SvgProps } from '~/svg/svgProps';

function SvgCog({ themeColor }: SvgProps) {
	const theme = useTheme();

	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.543 14.9219C20.543 14.7461 20.4375 14.5352 20.2617 14.4297L18.6094 13.5156C18.6797 13.0938 18.75 12.6719 18.75 12.25C18.75 11.8633 18.6797 11.4414 18.6094 11.0195L20.2617 10.1055C20.4375 10 20.543 9.78906 20.543 9.57812C20.543 9.08594 19.0664 6.09766 18.293 6.09766C18.1875 6.09766 18.082 6.13281 18.0117 6.20312L16.3594 7.15234C15.7266 6.58984 15.0234 6.20312 14.25 5.92188V4.02344C14.25 3.74219 14.0391 3.49609 13.793 3.46094C13.1953 3.32031 12.5977 3.25 12 3.25C11.3672 3.25 10.7695 3.32031 10.1719 3.46094C9.92578 3.53125 9.75 3.74219 9.75 4.02344V5.92188C8.94141 6.20312 8.23828 6.58984 7.60547 7.15234L5.95312 6.20312C5.88281 6.13281 5.77734 6.09766 5.67188 6.09766C4.96875 6.09766 3.42188 8.98047 3.42188 9.57812C3.42188 9.78906 3.52734 10 3.70312 10.1055L5.35547 11.0195C5.28516 11.4414 5.25 11.8281 5.25 12.25C5.25 12.6719 5.28516 13.0938 5.35547 13.5156L3.70312 14.4297C3.52734 14.5352 3.42188 14.7461 3.42188 14.9219C3.42188 15.4492 4.89844 18.4375 5.67188 18.4375C5.77734 18.4375 5.88281 18.4023 5.95312 18.332L7.60547 17.3828C8.23828 17.9102 8.94141 18.332 9.75 18.6133V20.5117C9.75 20.793 9.92578 21.0039 10.1719 21.0742C10.7695 21.1797 11.3672 21.25 11.9648 21.25C12.5273 21.25 13.1602 21.2148 13.7578 21.0742C14.0391 21.0039 14.25 20.793 14.25 20.5117V18.6133C15.0234 18.332 15.7266 17.9102 16.3594 17.3828L18.0117 18.332C18.082 18.4023 18.1875 18.4375 18.293 18.4375C18.9961 18.4023 20.543 15.5547 20.543 14.9219ZM12 15.0625C10.418 15.0625 9.1875 13.832 9.1875 12.25C9.1875 10.7031 10.418 9.4375 12 9.4375C13.5469 9.4375 14.8125 10.7031 14.8125 12.25C14.8125 13.832 13.5469 15.0625 12 15.0625Z"
				fill={themeColor(theme)}
			/>
		</svg>
	);
}

export default SvgCog;
