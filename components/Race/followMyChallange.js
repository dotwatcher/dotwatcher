import Image from 'next/image';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import { Div, H2, H4, P, Header, A } from '../UI/Tachyons'

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

  & + & {
    margin-top: var(--spacing-small);
  }
`;

const Postion = styled.span`

  /**
    30px is the space of a double digit integer place the number end bit (10th) 
    Will keep sapcing consistance down the leaderboard
  */
  min-width: 30px;
  margin-right: var(--spacing-medium);
`;

const FollowMyChallange = ({ leaderboard }) => {

  let condendensedLeaders = leaderboard.map(x => x.slice(0, 10));

  condendensedLeaders = condendensedLeaders.reduce((acc, curr, ind) => (
    [...acc, {
      category: condendensedLeaders[ind][0].category,
      isCrew: condendensedLeaders[ind][0].CREW,
      leaderboard: curr
    }]
  ), []) 

  // Filter out CREW trackers
  condendensedLeaders = condendensedLeaders.filter(leaderboard => !leaderboard.isCrew)
  
  console.log(condendensedLeaders)

	return (
		<Fragment>
			<Div fl w_100 pr3 pr0_ns mb4>
				<Header>
					<H2 ttu tracked f5 fw6 mt0 pb1 bb bw1 b__light_gray measure_narrow>
            Live Leaderboard
          </H2>
          
          <P>Supported by
            <A target="_blank" href="https://www.followmychallenge.com/?dwcc" link near_black hover_blue dim underline>
              <Image src="/static/images/fmc.svg" alt="Follow My Challange" title="Follow My Challange" width="320" height="56" />
            </A>
          </P>
        </Header>
        
        <Div measure_narrow>
          {condendensedLeaders.map(leaders => (
            <LeaderCategory>
              <H4>{leaders.category}</H4>

              <List>
                {leaders.leaderboard.map(rider => (
                  <ListItem>
                    <Postion>{rider.position_text}</Postion>
                    {rider.name}
                    {rider.FIN && rider.position_text === '1st' && ' (Winner)'}
                    {rider.DSQ || rider.DNF && ' (Scratched)'}
                  </ListItem>
                ))}
              </List>
            </LeaderCategory>
          ))}
        </Div>
			</Div>
		</Fragment>
	)
}

export default FollowMyChallange;
