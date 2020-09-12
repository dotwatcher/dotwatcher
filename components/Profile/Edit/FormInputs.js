import React, { useState } from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import isAfter from "date-fns/is_after";
import getYear from "date-fns/get_year";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Input = styled.input`
	${tachyons}
`;

const Span = styled.span`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const BiographyInput = styled.textarea`
	${tachyons};
	min-height: 155px;
`;

const Button = styled.button`
	${tachyons}

	&:disabled {
		cursor: not-allowed;
		background-color: var(--moon-gray);
		border-color: var(--moon-gray);
	}
`;

const Div = styled.div`
	${tachyons}
`;
const H3 = styled.h3`
	${tachyons}
`;

const Races = styled.div`
	${tachyons}
	margin: var(--spacing-medium) 0;
`;

const OtherRaces = styled.div`
	${tachyons}
	border-top: 1px solid var(--black);
`;

const RaceGrid = styled.div`
	${tachyons}
	display: inline-grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: var(--spacing-medium);
	grid-row-gap: var(--spacing-medium);
	margin-bottom: var(--spacing-medium);
`;

const RaceInput = styled.label`
	input {
		margin-right: var(--spacing-small);
	}
`;

export default ({
	values = {},
	errors = {},
	inputs = [],
	handleBlur,
	handleChange,
	isSubmitting,
	isValid,
	status,
	races,
	biographyValue,
	setBiographyValue,
	meta = {}
}) => {
	const futureRaces = races.filter(race =>
		isAfter(new Date(race.data.raceDate), new Date())
	);
	const sortedRaces = futureRaces.sort((a, b) => {
		if (a.data.title < b.data.title) return -1;

		if (a.data.title > b.data.title) return 1;

		return 0;
	});

	return (
		<>
			<div>
				{inputs.map((input, i) => (
					<label key={i}>
						<Span dib w_100 f4 mb1>
							{input.label}
						</Span>
						<Input
							type="text"
							name={input?.name}
							placeholder={input?.placeholder}
							value={values && values[input?.name]}
							onChange={handleChange}
							onBlur={handleBlur}
							input_reset
							ba
							bw1
							b__blue
							ph3
							pv2
							mb3
							f4
							fl
							w_100
						/>
						{errors[input?.name] && (
							<Span dib mb4 blue>
								{errors[input?.name]}
							</Span>
						)}
					</label>
				))}

				<label>
					<Span dib w_100 f4 mb1>
						Biography
					</Span>

					<ReactQuill
						theme="snow"
						value={biographyValue}
						onChange={setBiographyValue}
					/>
				</label>
			</div>

			<div>
				<Races>
					<H3>Pick your {getYear(Date.now())} races</H3>
					<RaceGrid>
						{sortedRaces.map(race => (
							<RaceInput key={race.sys.id}>
								<input
									name="races"
									type="checkbox"
									onChange={handleChange}
									onBlur={handleBlur}
									value={race.sys.id}
									checked={values.races && values.races.includes(race.sys.id)}
								/>
								<span>{race.data.title}</span>
							</RaceInput>
						))}
					</RaceGrid>

					<OtherRaces>
						<P>Can't find your race, add them below separated by a comma.</P>
						<Input
							w_100
							pv2
							mb1
							type="text"
							placeholder={"Race Name"}
							name="otherRaces"
							value={values?.otherRaces}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</OtherRaces>
				</Races>

				<Button
					f4
					bg_blue
					w_100
					pv2
					mb3
					tc
					white
					ttl
					small_caps
					ba
					bw1
					b__blue
					dib
					pointer
					hover_bg_dark_blue
					type="submit"
					disabled={isSubmitting || !isValid}
				>
					{isSubmitting ? "Saving" : "Update"}
				</Button>

				{status && (
					<Div w_100 dib>
						<p>{status}</p>
					</Div>
				)}
			</div>
		</>
	);
};
