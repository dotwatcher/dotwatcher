import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Rider from './rider';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const Div = styled.div`${tachyons}`;
const P = styled.p`${tachyons}`;
const TopRidersWrap = styled.div`${tachyons}`;

class TopRiders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    };
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {

    const leaderboardResponse = await fetch(`https://dot-scraper.canthappenashidden.xyz/api/pages/?access_token=${process.env.SCRAPEY_API_KEY}&filter[order]=timestamp%20DESC&filter[where][url]=http://trackleaders.com/${this.props.race.fields.trackleadersRaceId}&filter[limit]=1`)

    let sortedLeaders = []
    if (leaderboardResponse.body[0].data.leaderboard) {
      sortedLeaders = leaderboardResponse.body[0].data.leaderboard.sort((a, b) => {
        if (typeof (a.mile) !== 'undefined') {
          return parseFloat(b.mile) - parseFloat(a.mile);
        } else {
          return parseFloat(a.dtf) - parseFloat(b.dtf);
        }
      })
    }
    
    sortedLeaders = sortedLeaders.slice(0,10)

    formattedLeaders = sortedLeaders.map((item, index) => {
      return {
        sys: {
          id: index
        },
        fields: {
          name: item.name,
          distance: typeof item.kilometre !== 'undefined' ? parseFloat(item.kilometre).toFixed(0) : null
        }
      };
    });

    this.setStateAsync({ leaderboard });
  }

  render() {
    return (
      <React.Fragment>
        <TopRidersWrap fl w_100 pr3 pr0_ns mb4>
          <Header>
            <H2 ttu tracked f5 fw6 mt0 pb1 bb bw1 b__light_gray measure_narrow>
              Leaderboard
            </H2>
          </Header>
          <Div measure_narrow>
            {
              this.state.leaderboard.length ? this.state.leaderboard.map((rider, index) => (
                <Rider numbered={false} position={index + 1} key={rider.sys.id} rider={rider.fields} />
              )) : <P f6 b>Loading...</P>
            }
          </Div>
        </TopRidersWrap>
      </React.Fragment>
    );
  }
}

TopRiders.propTypes = {
  race: PropTypes.object
};

TopRiders.defaultProps = {
  race: {}
};

export default TopRiders;
