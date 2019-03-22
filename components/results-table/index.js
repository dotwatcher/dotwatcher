import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';
import slugify from '../../utils/slugify';
import ResultsFilter from '../results-filter';

const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;
const Results = styled.table`
    border:none;
    border-collapse:collapse;
		border-spacing:0;
		margin-bottom: var(--spacing-extra-large);
${tachyons}`;
const ResultsHeadCell = styled.th`
	text-align: left;
	line-height: 1.5;
	padding: var(--spacing-extra-small);
	text-transform: uppercase;
${tachyons}`;
const HeadRow = styled.tr`${tachyons}`;

class ResultsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeClassFilter: this.props.activeClass,
			activeCategoryFilter: this.props.activeCategory,
			activeLocationFilter: this.props.activeLocation
		};

		this.setClassFilter = this.setClassFilter.bind(this);
		this.setCategoryFilter = this.setCategoryFilter.bind(this);
		this.setLocationFilter = this.setLocationFilter.bind(this);
	}

	setClassFilter(filter) {
		this.setState({
			activeClassFilter: filter
		}, () => {
			this.updateURL()
		});
	}

	setCategoryFilter(filter) {
		this.setState({
			activeCategoryFilter: filter
		}, () => {
			this.updateURL()
		});
	}

	setLocationFilter(filter) {
		this.setState({
			activeLocationFilter: filter
		}, () => {
			this.updateURL()
		});
	}

	updateURL() {
		history.pushState({}, '', `${window.location.pathname}?activeClass=${this.state.activeClassFilter}&activeCategory=${this.state.activeCategoryFilter}&activeLocation=${this.state.activeLocationFilter}`)
	}

	render() {
		const ResultsRow = styled.tr`
			&:nth-child(even) {
				background-color: var(--near-white);
			}
			&[id="${this.props.focus}"],
			&:hover,
			&:target {
				background-color: var(--lightest-blue);
			}
		${tachyons}`;
		const ResultsCell = styled.td`
			line-height: 1.5;
			font-variant-numeric: tabular-nums;
			padding: var(--spacing-extra-small);

			@media screen and (min-width:64em){
				padding: var(--spacing-small) var(--spacing-extra-small);
			}

			&.rank {
				text-align: ${this.props.type === 'profile' ? 'center' : 'right'};
			}

			&.race-name {
				font-weight: ${this.props.type === 'race' ? '400' : '600'}
			}

			&.rider-name {
				font-weight: ${this.props.type === 'profile' ? '400' : '600'}
			}
		${tachyons}`;


		if (this.props.results.length < 1) {
			return (
			<Div fl w_100 ph3>
				<p>No results found for this race</p>
			</Div>
			)
		}

		const withCapNo = this.props.results[0]['Cap/Bib'];

		let filteredResults = this.props.results
		if (this.props.type !== 'profile') {
			filteredResults = filteredResults.filter(result => result['Class'] === this.state.activeClassFilter)
			filteredResults = filteredResults.filter(result => result['Finish Location'] === this.state.activeLocationFilter)

			if (this.state.activeCategoryFilter !== 'Both') {
				filteredResults = filteredResults.filter(result => result['Category'] === this.state.activeCategoryFilter)
			}
		}

		return (
			<Div ph3>
				{this.props.type !== 'profile' ? <ResultsFilter racerClasses={this.props.racerClasses} racerCategories={this.props.racerCategories} setClassFilter={this.setClassFilter.bind(this)} activeClassFilter={this.state.activeClassFilter} setCategoryFilter={this.setCategoryFilter.bind(this)} activeCategoryFilter={this.state.activeCategoryFilter} setLocationFilter={this.setLocationFilter.bind(this)} finishLocations={this.props.finishLocations} activeLocation={this.state.activeLocationFilter} /> : null }
				<Results w_100 f6 f5_l>
					<thead>
						<HeadRow bb bw1>
							{
								this.props.type === 'profile' ? <ResultsHeadCell>Race</ResultsHeadCell> : null
							}
							{
								this.props.type === 'profile' ? <ResultsHeadCell>Year</ResultsHeadCell> : null
							}
							<ResultsHeadCell>Rank</ResultsHeadCell>
							<ResultsHeadCell>Rider</ResultsHeadCell>
							{
								withCapNo ? <ResultsHeadCell dn dtc_ns>Cap/Bib</ResultsHeadCell> : null
							}
							<ResultsHeadCell dn dtc_ns colSpan="2">Class/Category</ResultsHeadCell>
							<ResultsHeadCell>Result</ResultsHeadCell>
							<ResultsHeadCell dn dtc_ns>Bike</ResultsHeadCell>
							{
								this.props.activeLocation ? <ResultsHeadCell>
									Finish Location
								</ResultsHeadCell> : null
							}
							<ResultsHeadCell tr><abbr title="Finish Time in days, hours and minutes">Finish Time</abbr></ResultsHeadCell>
						</HeadRow>
					</thead>
					<tbody>
						{
							filteredResults.map(result => {
								const id = this.props.type === 'profile' ? `${slugify(result['Event'])}-${slugify(result['Year'].toString())}` : slugify(result['Rider'])
								return (
									<ResultsRow key={result['rowid']} id={id}>
										{
											this.props.type === 'profile' ? <ResultsCell className="race-name"><Link href={`/results?year=${result['Year']}&race=${result['Event']}&focus=${slugify(result['Rider'])}&activeClass=${result['Class']}`} as={`/results/${result['Year']}/${result['Event']}?focus=${slugify(result['Rider'])}&activeClass=${result['Class']}`} passHref><A link near_black hover_blue underline>{result['Event']}</A></Link></ResultsCell> : null
										}
										{
											this.props.type === 'profile' ? <ResultsCell>{result['Year']}</ResultsCell> : null
										}
										<ResultsCell pa0 pr2 className="rank">{ result['Position'] }</ResultsCell>
										<ResultsCell className="rider-name">
											<Link href={`/profile?name=${result['Rider']}`} as={`/profile/${result['Rider']}`} passHref>
												<A link near_black hover_blue underline>
													{result['Rider']}
												</A>
											</Link>
										</ResultsCell>
										{ withCapNo ? <ResultsCell dn dtc_ns tc>{ result['Cap/Bib'] }</ResultsCell> : null }
										<ResultsCell dn dtc_ns>
											{result['Class']}
										</ResultsCell>
										<ResultsCell dn dtc_ns>
											{result['Category'].substring(0,1)}
										</ResultsCell>
										<ResultsCell>
											{result['Result']}
										</ResultsCell>
										<ResultsCell dn dtc_ns>
											{result['Bike']}
										</ResultsCell>
										{
											result['Finish Location'] ? 
												<ResultsCell dn dtc_ns>
													{result['Finish Location']}
												</ResultsCell> : null
										}
										<ResultsCell tr title="Finish Time in days, hours and minutes">
											{
												result['Days'] ? result['Days'] + 'd:' : '--'
											}
											{
												parseInt(result['Hours']) < 10 ? '0' + result['Hours'] : result['Hours']
											}
											{ result['Hours'] ? 'h:' : '--' }
											{
												parseInt(result['Minutes']) < 10 ? '0' + result['Minutes'] : result['Minutes']
											}
											{
												result['Minutes'] ? 'm' : '--'
											}
										</ResultsCell>
									</ResultsRow>
								)
							})
						}
					</tbody>
				</Results>
			</Div>
		);
	}
}

ResultsTable.propTypes = {
	results: PropTypes.array,
	racerClasses: PropTypes.array,
	racerCategories: PropTypes.array,
	type: PropTypes.string,
	focus: PropTypes.string
};

ResultsTable.defaultProps = {
	results: [],
	racerClasses: [],
	racerCategories: [],
	type: 'race',
	focus: ''
};

export default ResultsTable;
