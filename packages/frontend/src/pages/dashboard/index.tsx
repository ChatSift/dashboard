import type { GetDiscordAuthMeResult } from '@chatsift/website-api';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import Button from '~/components/Button';
import DashBotUpsell from '~/components/DashBotUpsell';
import Footer from '~/components/Footer';
import GuildCard from '~/components/GuildCard';
import { guildCardSmallDashWidth } from '~/components/GuildCard/style';
import Heading from '~/components/Heading';
import PageMeta from '~/components/PageMeta';
import SearchBar from '~/components/SearchBar';
import { Text } from '~/components/Text';
import bots from '~/data/bots';
import useLoggedInUser from '~/hooks/useLoggedInUser';
import mediaQueries from '~/styles/breakpoints';
import SvgRefresh from '~/svg/SvgRefresh';
import { dashboardMaxWidth, dashboardPadding, guildCardsPerPage, smallestDashboardWidth } from '~/utils/constants';

const MainHeadingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	align-items: flex-start;
	flex-direction: column;

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
	}
`;

const SectionContainer = styled.div`
	display: flex;
	flex-direction: column;

	& > *:first-of-type {
		margin-bottom: 24px;
	}

	&:not(:first-of-type) {
		margin-top: 32px;
	}
`;

const Container = styled.main`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	max-width: ${dashboardMaxWidth}px;
	align-items: stretch;
	justify-content: space-between;
	width: fit-content;
	height: 100%;
	margin: 0 auto;
	padding: ${dashboardPadding}px;

	${mediaQueries.dashboardMaxWidthMax} {
		max-width: ${smallestDashboardWidth - dashboardPadding * 2}px;
	}
`;

const SearchBarModified = styled(SearchBar)`
	margin-bottom: 16px;
`;

const Guilds = styled.ul`
	display: grid;
	grid-template-columns: repeat(${guildCardsPerPage}, 1fr);
	gap: 16px;
	max-width: ${dashboardMaxWidth - dashboardPadding * 2}px;

	${mediaQueries.dashboardMaxWidthMax} {
		grid-template-columns: repeat(2, 1fr);
	}

	${mediaQueries.smallestDashboardWidthMax} {
		grid-template-columns: 1fr;
	}
`;

const NoServersFoundContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	width: min(${dashboardMaxWidth - dashboardPadding * 2}px, 80vw);

	${mediaQueries.dashboardMaxWidthMax} {
		max-width: ${smallestDashboardWidth - dashboardPadding * 4}px;
		width: ${guildCardSmallDashWidth};
	}
`;

const NoScript = styled.noscript`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	flex: 1 0 auto;
`;

const NoServersHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const BotUpsells = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const numberOfSkeletonGuilds = 16;

function saveDataCache(data: Record<string, unknown>[], expiresAt?: Date) {
	localStorage.setItem('dashboardData', JSON.stringify({ data, expiresAt }));
}

function getDataCache() {
	const cache = localStorage.getItem('dashboardData');
	if (!cache) {
		return null;
	}

	const { data, expiresAt } = JSON.parse(cache);
	if (expiresAt && new Date(expiresAt) < new Date()) {
		return null;
	}

	return data;
}

function Dashboard() {
	const { data, refetch, isRefetching, isFetching } = useLoggedInUser();
	const [search, setSearch] = useState('');
	const [dataCache, setDataCache] = useState<GetDiscordAuthMeResult['guilds'] | null>();
	const [isPerformingUserInitiatedRefetch, setIsPerformingUserInitiatedRefetch] = useState(false);

	const dataToUse = isRefetching ? undefined : data;
	const refetchGuilds = useCallback(async () => {
		setIsPerformingUserInitiatedRefetch(true);
		await refetch();
		setIsPerformingUserInitiatedRefetch(false);
	}, [refetch]);

	useEffect(() => {
		setDataCache(getDataCache());
	}, []);

	useEffect(() => {
		if (dataToUse?.guilds !== undefined) {
			saveDataCache(dataToUse.guilds, new Date(Date.now() + 1_000 * 60 * 60 * 5 /* 1h */));
		}
	}, [dataToUse]);

	const filtered = (dataToUse?.guilds ?? dataCache)?.filter((guild) =>
		guild.name.toLowerCase().includes(search.toLowerCase()),
	);
	const guilds = filtered?.sort((g1, g2) =>
		Number(g1.hasAma) + Number(g1.hasModmail) + Number(g1.hasAutomoderator) <
		Number(g2.hasAma) + Number(g2.hasModmail) + Number(g2.hasAutomoderator)
			? 1
			: -1,
	);

	const isNotReady = guilds === undefined || isPerformingUserInitiatedRefetch;

	return (
		<>
			<PageMeta title="Dashboard" />
			<NoScript>
				<style>
					{`
						#container {
							display: none;
						}
					`}
				</style>
				<Text kind="body" color="primary" weight="bold">
					JavaScript is required for this page to work
				</Text>
			</NoScript>
			<Container id="container">
				<SectionContainer>
					<MainHeadingContainer>
						<Heading title="Configure bots" subtitle="Select or add a community to manage." />
						<Button.Ghost
							onPress={() => void refetchGuilds()}
							isDisabled={isFetching}
							data-loading={isFetching}
							hasBorder
						>
							<SvgRefresh themeColor={(theme) => theme.colors.text.secondary} />
							Refresh
						</Button.Ghost>
					</MainHeadingContainer>
					<SearchBarModified
						state={[search, setSearch]}
						placeholder="Search for a server"
						aria-label="Search for a server"
						isDisabled={isNotReady}
					/>
					{isNotReady || (guilds?.length ?? 0) > 0 ? (
						<Guilds>
							{isNotReady
								? [...(Array.from({ length: numberOfSkeletonGuilds }) as unknown[])].map((_, index) => (
										<li key={index}>
											<GuildCard guild={undefined} />
										</li>
								  ))
								: guilds?.map((guild) => (
										<li key={guild.id}>
											<GuildCard guild={guild} key={guild.id} />
										</li>
								  ))}
						</Guilds>
					) : (
						<NoServersFoundContainer>
							<NoServersHeader>
								<Text kind="heading3" color="primary" weight="bold">
									{(dataToUse?.guilds?.length ?? 0) > 0 ? 'No results' : 'No servers found'}
								</Text>
								<Text>Invite a bot by clicking on the respective buttons</Text>
							</NoServersHeader>
							<BotUpsells>
								{Object.keys(bots).map((botId) => (
									<DashBotUpsell key={botId} botId={botId as BotId} />
								))}
							</BotUpsells>
						</NoServersFoundContainer>
					)}
				</SectionContainer>
			</Container>
			<Footer />
		</>
	);
}

export default Dashboard;
