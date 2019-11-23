import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import PropTypes from 'prop-types';

const Form = styled.form`${tachyons}`;
const Div = styled.div`
	padding-left: 1.5rem;
${tachyons}`;
const Input = styled.input`
	width: 1.5rem;
	height: 1.5rem;

	&:checked + label:after {
		opacity: 1;
	}
${tachyons}`;
const Label = styled.label`
	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 1.5rem;
		height: 1.5rem;
		border: 2px solid var(--near-black);
		border-radius: 50%;
		box-sizing: border-box;
	}

	&:hover:before {
		background-color: var(--near-white);
	}

	&:after {
		content: '';
		position: absolute;
		top: .5rem;
		left: .5rem;
		width: 0;
		height: 0;
		border: .25rem solid var(--near-black);
		border-radius: 100%;
		opacity: 0;
	}
${tachyons}`;
const H3 = styled.h3`${tachyons}`;
const Fieldset = styled.fieldset`${tachyons}`;

class ResultsFilter extends React.Component {
	constructor(props) {
		super(props);
		this.onSelectChange = this.onSelectChange.bind(this);
	}

	onSelectChange(event) {
		if (event.target.name === 'filter-class') {
			this.props.setClassFilter(event.target.value)
		}
		
		if (event.target.name === 'filter-category') {
			this.props.setCategoryFilter(event.target.value)
		}

		if (event.target.name === 'filter-location') {
			this.props.setLocationFilter(event.target.value)
		}
	}

	render() {
		return (
			<Form mb3>
				{
					this.props.racerClasses.length > 1 ?
					<Fieldset dib bn ma0 mr4 pa0 aria-describedby="filter-title">
						<H3 id="filter-title" dib_ns f6 ttu tracked ma0 mr3 mb3 lh-copy>Filter by class:</H3>
						{
							this.props.racerClasses.map(racerClass => (
								<Div dib mr4 relative key={`wrap-filter-${racerClass}`}>
									<Input o_0 absolute top_0 left_0 type="radio" name="filter-class" id={`filter-${racerClass}`} value={racerClass} onChange={this.onSelectChange.bind(this)} checked={racerClass === this.props.activeClassFilter} />
									<Label f5 fw6 lh-copy dib pl2 pv1 htmlFor={`filter-${racerClass}`}>{racerClass}</Label>
								</Div>
							))
						}
					</Fieldset> : null 
				}
				{
					this.props.racerCategories.length > 1 ?
					<Fieldset dib bn ma0 mt3 mt0_ns pa0 aria-describedby="filter-title">
						<H3 id="filter-title" dib_ns f6 ttu tracked ma0 mr3 mb3 lh-copy>Filter by category:</H3>
						{
							this.props.racerCategories.map(racerCategory => (
								<Div dib mr4 relative key={`wrap-filter-${racerCategory}`}>
									<Input o_0 absolute top_0 left_0 type="radio" name="filter-category" id={`filter-${racerCategory}`} value={racerCategory} onChange={this.onSelectChange.bind(this)} checked={racerCategory === this.props.activeCategoryFilter} />
									<Label f5 fw6 lh-copy dib pl2 pv1 htmlFor={`filter-${racerCategory}`}>{racerCategory}</Label>
								</Div>
							))
						}
					</Fieldset> : null
				}
				{
					this.props.finishlocations.length > 1 ?
						<Fieldset dib bn ma0 mt3 mt0_ns pa0 aria-describedby="filter-title">
							<H3 id="filter-title" dib_ns f6 ttu tracked ma0 mr3 mb3 lh-copy>Filter by location:</H3>
							{
								this.props.finishlocations.map(finishlocation => (
									<Div dib mr4 relative key={`wrap-filter-${finishlocation}`}>
										<Input o_0 absolute top_0 left_0 type="radio" name="filter-location" id={`filter-${finishlocation}`} value={finishlocation} onChange={this.onSelectChange.bind(this)} checked={finishlocation === this.props.activeLocation} />
										<Label f5 fw6 lh-copy dib pl2 pv1 htmlFor={`filter-${finishlocation}`}>{finishlocation}</Label>
									</Div>
								))
							}
						</Fieldset> : null
				}
			</Form>
		);
	}
};

ResultsFilter.propTypes = {
	racerClasses: PropTypes.array.isRequired,
	racerCategories: PropTypes.array.isRequired,
	setClassFilter: PropTypes.func.isRequired,
	setCategoryFilter: PropTypes.func.isRequired
};

export default ResultsFilter;
