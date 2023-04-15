import Button from '~/components/Button';
import type { RouterLinkProps } from '~/components/Link';
import { RouterLink } from '~/components/Link';
import SvgLinkExternal from '~/svg/SvgLinkExternal';

type ButtonLinkProps = RouterLinkProps & {
	external?: boolean;
};

export function ButtonLink({ children, external, ...props }: ButtonLinkProps) {
	return (
		<RouterLink {...props} target={external ? '_blank' : ''}>
			{external && <SvgLinkExternal />}
			{children}
		</RouterLink>
	);
}

export default {
	Cta: Button.Cta.withComponent(ButtonLink),
	Ghost: Button.Ghost.withComponent(ButtonLink),
};
