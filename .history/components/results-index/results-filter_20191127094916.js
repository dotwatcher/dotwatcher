import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";

const Clear = styled.button`
	${tachyons}
`;

const theme = {
	container: {
		display: "inline-block",
		position: "relative",
		margin: "0 1rem 1rem"
	},
	input: {
		width: 300,
		padding: ".5rem .75rem",
		fontSize: "1.25rem",
		border: ".125rem solid #1b1919"
	},
	inputFocused: {
		outline: "none"
	},
	inputOpen: {},
	suggestionsContainer: {
		display: "none"
	},
	suggestionsContainerOpen: {
		display: "block",
		position: "absolute",
		top: 40,
		width: 300,
		border: ".125rem solid #1b1919",
		backgroundColor: "#fff",
		fontSize: "1.25rem",
		zIndex: 2
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: "none"
	},
	suggestion: {
		cursor: "pointer",
		padding: ".5rem .75rem"
	},
	suggestionHighlighted: {
		backgroundColor: "#fbf1a9"
	}
};

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestionValue(suggestion) {
	return suggestion.name;
}

function renderSuggestion(suggestion) {
	return <span>{suggestion.name}</span>;
}

class Filter extends Component {
	constructor() {
		super();

		this.state = {
			value: "",
			suggestions: []
		};
	}

	onChange = async (event, { newValue, method }) => {
		await this.setState({
			value: newValue
		});

		this.props.handleSearchUpdate(newValue);
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	onSuggestionSelected = (event, opts) => {
		this.props.setFilteredRace(opts.suggestion.name);
	};

	getSuggestions = value => {
		const escapedValue = escapeRegexCharacters(value.trim());

		if (escapedValue === "") {
			return [];
		}

		const regex = new RegExp(escapedValue, "i");

		return this.props.races.filter(event => regex.test(event.name));
	};

	clear = () => {
		this.props.setFilteredRace("");
		this.setState({
			value: ""
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Find a race or rider",
			value,
			onChange: this.onChange,
			ref: e => (this.inputRef = e)
		};

		return (
			<React.Fragment>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
					onSuggestionSelected={this.onSuggestionSelected}
					highlightFirstSuggestion={true}
					theme={theme}
				/>
				<Clear
					input_reset
					bg_light_gray
					hover_bg_lightest_blue
					f5
					tracked
					bn
					ttu
					ph3
					pv2
					lh_solid
					dib
					onClick={this.clear}
				>
					Clear
				</Clear>
			</React.Fragment>
		);
	}
}

export default Filter;

Filter.propTypes = {
	races: PropTypes.array,
	setFilteredRace: PropTypes.func
};
