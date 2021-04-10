import { useState } from "react";
import styled, { css } from "styled-components";

// import Dropdown from "@UI/OptionSelect";
// import { reverseFormatSort } from "node_modules/@dotwatcher/utils";

import H4 from "@Components/UI/H4";
import H5 from "@Components/UI/H5";
import colors from "@Utils/colors";
import dim from "@Utils/dim";

const INITIAL_FILTERS_VISIBLE = 3;

const FacetSection = styled.section`
	& + & {
		margin-top: ${dim()};
	}
`;

const Button = styled.button`
	appearance: none;
	background: transparent;
	text-decoration: underline;
	border: none;
	border-radius: 0;
	cursor: pointer;
	margin-top: ${dim()};
	color: var(--near-black);

	&:hover {
		color: ${colors.primary};
	}
`;

const Title = styled(H4)`
	/* text-decoration: underline; */
	margin-bottom: 7px;
`;

const Inline = styled.div`
	display: flex;
	align-items: baseline;

	${Button} {
		margin-left: 30px;
	}
`;

const Filters = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;

const FilterWrap = styled.div`
	display: flex;
	flex-direction: column;
`;

const FilterItem = styled.div`
	margin-bottom: 7px;
`;

const Filter = styled.div`
	margin-top: ${dim()};
`;

const Span = styled.span`
	margin-left: ${dim()};
`;

const FilterTitle = styled(H5)`
	text-decoration: underline;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
	appearance: none;
	background-color: transparent;
	height: ${dim()};
	width: ${dim()};
	position: relative;
	top: 2px;
	border-radius: 3px;
	border: 1px solid ${colors.black};

	${({ checked }) =>
		checked &&
		css`
			background-color: ${colors.black};
		`}
`;

const Label = styled.label`
	cursor: pointer;
	&:hover {
		color: ${colors.primary};

		${Checkbox} {
			border-color: ${colors.primary};
			background-color: ${colors.primary};
		}
	}
`;

const TableFilters = ({
	data,
	filters = [],
	handleSortChange = () => {},
	handleFilterChange = () => {},
	handleResetFilters = () => {}
}) => {
	const [visibleFilters, setvisiblefilters] = useState(INITIAL_FILTERS_VISIBLE);

	const handleVisiblityClick = () => {
		const qty =
			visibleFilters === INITIAL_FILTERS_VISIBLE
				? data.filters.length
				: INITIAL_FILTERS_VISIBLE;

		setvisiblefilters(qty);
	};

	const buttonText =
		visibleFilters === INITIAL_FILTERS_VISIBLE
			? "Show All Filters"
			: "Show Less Filters";

	return (
		<section>
			{/* <FacetSection>
				<Title>Sort</Title>
				<Dropdown onChange={handleSortChange}>
					{data.sorts.map(sort => (
						<option key={sort.value} value={reverseFormatSort(sort.value)}>
							{sort.name}
						</option>
					))}
				</Dropdown>
			</FacetSection> */}

			<FacetSection>
				<Inline>
					<Title>Filters</Title>

					<Button title={buttonText} onClick={handleVisiblityClick}>
						{buttonText}
					</Button>

					{filters.length > 0 && (
						<Button title="Reset Filters" onClick={handleResetFilters}>
							Reset Filters
						</Button>
					)}
				</Inline>

				<Filters>
					{data.filters.slice(0, visibleFilters).map(filter => {
						return (
							<Filter key={filter.key}>
								<FilterTitle>{filter.name}</FilterTitle>

								<FilterWrap>
									{/* <FilterItem>
										<label>
											<input type="checkbox" value={`${filter.key}=`} />
											<Span>All</Span>
										</label>
									</FilterItem> */}

									{filter.values.map((f, ind) => {
										const value = `${filter.key}=${f.value}`;

										return (
											<FilterItem key={ind}>
												<Label>
													<Checkbox
														checked={filters.some(x => x === value)}
														onChange={handleFilterChange}
														value={value}
													/>
													<Span>{f.name}</Span>
												</Label>
											</FilterItem>
										);
									})}
								</FilterWrap>
							</Filter>
						);
					})}
				</Filters>
			</FacetSection>
		</section>
	);
};

export default TableFilters;
