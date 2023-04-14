import { useContext } from 'react';
import * as Styles from './style';
import { buttonPadding } from './style';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { ThemeContext } from '~/pages/_app';
import SvgDarkTheme from '~/svg/SvgDarkTheme';
import SvgDiscord from '~/svg/SvgDiscord';
import SvgGitHub from '~/svg/SvgGitHub';
import SvgLightTheme from '~/svg/SvgLightTheme';
import dark from '~/themes/dark';
import light from '~/themes/light';

type FooterProps = {
	hasMargin?: boolean;
};

function Footer({ hasMargin = true }: FooterProps) {
	const theme = useContext(ThemeContext);

	return (
		<Styles.Footer
			hasMargin={hasMargin}
			mobile={{
				'@initial': false,
				'@small': true,
			}}
		>
			<noscript>
				<style>
					{`
						#theme-settings {
							display: none;
						}
					`}
				</style>
			</noscript>
			<Styles.CopyrightNotice>© ChatSift, 2022 - Present</Styles.CopyrightNotice>
			<Styles.ButtonsAndLinks>
				<Styles.List>
					<Styles.IconLink href="/github">
						<SvgGitHub themeColor={(theme) => theme.colors.text.disabled} />
					</Styles.IconLink>
					<Styles.IconLink href="/support">
						<SvgDiscord themeColor={(theme) => theme.colors.text.disabled} />
					</Styles.IconLink>
				</Styles.List>
				<Styles.SecondGroup id="theme-settings">
					<Text>Theme:</Text>
					<Button
						buttonType="ghost"
						form="extraSmall"
						paddingOverride={{ x: buttonPadding, y: buttonPadding }}
						onPress={() => theme.update(theme.current.name === dark.name ? light : dark)}
					>
						{theme.current.name === dark.name ? (
							<SvgDarkTheme themeColor={(theme) => theme.colors.text.primary} />
						) : (
							<SvgLightTheme themeColor={(theme) => theme.colors.text.primary} />
						)}
					</Button>
				</Styles.SecondGroup>
			</Styles.ButtonsAndLinks>
		</Styles.Footer>
	);
}

export default Footer;
