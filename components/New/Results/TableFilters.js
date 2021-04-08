import { useState } from "react";
import Dropdown from "@UI/OptionSelect";
import styled from "styled-components";
import { reverseFormatSort } from "node_modules/@dotwatcher/utils";

import H4 from "@Components/UI/H4";
import H5 from "@Components/UI/H5";
import colors from "@Utils/colors";
import dim from "@Utils/dim";

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

const INITIAL_FILTERS_VISIBLE = 3;

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
												<label>
													<input
														type="checkbox"
														checked={filters.some(x => x === value)}
														onChange={handleFilterChange}
														value={value}
													/>
													<Span>{f.name}</Span>
												</label>
											</FilterItem>
										);
									})}
								</FilterWrap>
							</Filter>
						);
					})}
				</Filters>
			</FacetSection>

			<FacetSection>
				<Title>Sort</Title>
				<Dropdown onChange={handleSortChange}>
					{data.sorts.map(sort => (
						<option key={sort.value} value={reverseFormatSort(sort.value)}>
							{sort.name}
						</option>
					))}
				</Dropdown>
			</FacetSection>
		</section>
	);
};

export default TableFilters;
