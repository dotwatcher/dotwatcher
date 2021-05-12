import Image from "next/image";
import React, { Fragment } from "react";
import styled from "styled-components";
import { Div, H2, H4, P, Header, A } from "@Components/UI/Tachyons";

const LeaderCategory = styled(Div)`
	& + & {
		margin-top: var(--spacing-medium);
		border-top: 2px solid var(--light-gray);
	}
`;

const List = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const ListItem = styled.li`
	display: flex;
	justify-content: end;
	font-size: 0.9rem;

	& + & {
		margin-top: var(--spacing-small);
	}
`;

const Stat = styled(P)`
	font-size: 0.9rem;
`;

const Postion = styled.span`
	/**
    30px is the space of a double digit integer place the number end bit (10th) 
    Will keep sapcing consistance down the leaderboard
  */
	min-width: 30px;
	margin-right: var(--spacing-medium);
`;

const FollowMyChallange = ({ leaderboard = [] }) => {
	let condendensedLeaders = leaderboard
		? leaderboard.map(x => x.slice(0, 10))
		: [];

	condendensedLeaders = condendensedLeaders.reduce(
		(acc, curr, ind) => [
			...acc,
			{
				category: condendensedLeaders[ind][0].category,
				isCrew: condendensedLeaders[ind][0].CREW,
				leaderboard: curr
			}
		],
		[]
	);

	const allRiders = leaderboard.flatMap(x => x).filter(x => !x.CREW);
	const allRidersCount = allRiders.length;
	const scratched = allRiders.filter(r => r.DSQ || r.DNF);
	const finished = allRiders.filter(r => r.FIN);

	// Filter out CREW trackers
	condendensedLeaders = condendensedLeaders.filter(
		leaderboard => !leaderboard.isCrew
	);

	return (
		<Fragment>
			<Div fl w_100 pr3 pr0_ns mb4>
				<Header bb bt bw1 b__light_gray>
					<P>
						Supported by
						<A
							target="_blank"
							href="https://www.followmychallenge.com/?dwcc"
							link
							near_black
							hover_blue
							dim
							underline
						>
							<Image
								src="/static/images/fmc.svg"
								alt="Follow My Challange"
								title="Follow My Challange"
								width="320"
								height="56"
							/>
						</A>
					</P>
				</Header>

				<Header bb bw1 b__light_gray>
					<Stat>Total Racers: {allRidersCount}</Stat>
					<Stat>
						Scratched: {Math.round((scratched.length / allRidersCount) * 100)}%
						( {scratched.length} ){" "}
					</Stat>
					<Stat>
						Finished: {Math.round((finished.length / allRidersCount) * 100)}% ({" "}
						{finished.length} ){" "}
					</Stat>
				</Header>

				<Div measure_narrow>
					{condendensedLeaders.map((leaders, ind) => {
						return (
							<LeaderCategory key={ind}>
								<H4>{leaders.category}</H4>

								<List>
									{leaders.leaderboard.map((rider, ind) => {
										// IF pairs, get first two riders. if solo get first.
										const isFirst =
											rider.category.toLowerCase() === "pair"
												? ind === 0 || ind === 1
												: ind === 0;

										return (
											<ListItem key={ind}>
												<Postion>{rider.position_text}</Postion>
												{rider.name}
												{rider.FIN && isFirst
													? " (Winner)"
													: rider.FIN
													? " (Finished)"
													: null}
												{(rider.DSQ || rider.DNF) && " (Scratched)"}
											</ListItem>
										);
									})}
								</List>
							</LeaderCategory>
						);
					})}
				</Div>
			</Div>
		</Fragment>
	);
};

export default FollowMyChallange;
