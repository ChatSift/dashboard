import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';

function SvgLightTheme() {
	const theme = useContext(ThemeContext);
	const color = theme.current.name === 'light' ? theme.current.colors.text.primary : theme.current.colors.text.disabled;

	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 8.875C10.1016 8.875 8.625 10.3867 8.625 12.2148C8.625 14.043 10.1016 15.625 12 15.625C13.8633 15.625 15.3398 14.1133 15.3398 12.25C15.3398 10.4219 13.8633 8.875 12 8.875ZM20.8945 15.4492L18.6797 12.25L20.8945 9.05078C21.1055 8.69922 20.9297 8.27734 20.543 8.20703L16.7109 7.50391L16.0078 3.67188C15.9375 3.28516 15.5156 3.10938 15.1992 3.32031L12 5.57031L8.76562 3.35547C8.41406 3.14453 7.99219 3.32031 7.92188 3.70703L7.25391 7.53906L3.42188 8.24219C3.03516 8.3125 2.85938 8.73438 3.07031 9.05078L5.28516 12.25L3.07031 15.4844C2.85938 15.8008 3.03516 16.2227 3.42188 16.293L7.25391 16.9961L7.95703 20.8281C8.02734 21.2148 8.44922 21.3906 8.76562 21.1797L12 18.9648L15.1992 21.1797C15.5156 21.3906 15.9375 21.2148 16.0078 20.8281L16.7109 16.9961L20.543 16.293C20.9297 16.2227 21.1055 15.8008 20.8945 15.4492ZM12 16.75C9.50391 16.75 7.5 14.7109 7.5 12.25C7.5 9.78906 9.53906 7.78516 12 7.78516C14.4258 7.78516 16.4648 9.82422 16.4648 12.25C16.4648 14.7461 14.4609 16.75 12 16.75Z"
				fill={color}
			/>
		</svg>
	);
}

export default SvgLightTheme;
