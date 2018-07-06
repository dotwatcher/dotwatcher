import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const H2 = styled.h2`${tachyons}`;
const Header = styled.header`${tachyons}`;
const FactFileWrap = styled.div`${tachyons}`;
const Wrap = styled.dl`${tachyons}`;
const Label = styled.dt`${tachyons}`;
const Stat = styled.dt`${tachyons}`;

const FactFile = ({race}) => (
	<FactFileWrap fl w_50 w_100_ns pr3 pr0_ns mb4>
		<Header>
			<H2 ttu tracked f5 fw6 mt0 pb1 bb bw1 b__light_gray measure_narrow>
				Fact file
			</H2>
		</Header>
		{
			race.fields.location ? (
				<Wrap>
					<Label dib f6 mr1>Location:</Label>
					<Stat dib f6 fw6>{race.fields.location}</Stat>
				</Wrap>
			) : null
		}
		{
			race.fields.length ? (
				<Wrap>
					<Label dib f6 mr1>Length:</Label>
					<Stat dib f6 fw6>{race.fields.length}</Stat>
				</Wrap>
			) : null
		}
		{
			race.fields.riders ? (
				<Wrap>
					<Label dib f6 mr1>Riders:</Label>
					<Stat dib f6 fw6>{race.fields.riders}</Stat>
				</Wrap>
			) : null
		}
		{
			race.fields.lastYearsWinner ? (
				<Wrap>
					<Label dib f6 mr1>
						{
							race.fields.winnerLabel ? `${race.fields.winnerLabel}:` : `Last year’s winner:`
						}
					</Label>
					<Stat dib f6 fw6>{race.fields.lastYearsWinner}</Stat>
				</Wrap>
			) : null
		}
		{
			race.fields.terrain ? (
				<Wrap>
					<Label dib f6 mr1>Terrain:</Label>
					<Stat dib f6 fw6>{race.fields.terrain}</Stat>
				</Wrap>
			) : null
		}
	</FactFileWrap>
);

FactFile.propTypes = {
	race: PropTypes.object.isRequired
};

export default FactFile;
