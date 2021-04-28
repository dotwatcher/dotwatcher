import React, { useState } from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import isAfter from "date-fns/is_after";
import dynamic from "next/dynamic";
import Button from "@Components/UI/Button";
import P from "@Components/UI/P";
import H3 from "@Components/UI/H3";
import Input, { Checkbox } from "@Components/UI/Input";
import dim from "@Utils/dim";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Span = styled.span`
	${tachyons}
`;

const Submit = styled(Button)`
	width: 100%;
`;
const Div = styled.div`
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

const Label = styled.label`
	margin-top: ${dim()};
	display: block;
`;

const FormInputs = ({
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
					<Label key={i}>
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
						/>
						{errors[input?.name] && (
							<Span dib mb4 blue>
								{errors[input?.name]}
							</Span>
						)}
					</Label>
				))}

				<Label>
					<Span dib w_100 f4 mb1>
						Biography
					</Span>

					<ReactQuill
						theme="snow"
						value={biographyValue}
						onChange={setBiographyValue}
						modules={{
							toolbar: [
								// [{ header: [1, 2, false] }],
								["bold", "italic", "underline", "strike", "blockquote"],
								[
									{ list: "ordered" },
									{ list: "bullet" },
									{ indent: "-1" },
									{ indent: "+1" }
								],
								["link", "image"],
								["clean"]
							]
						}}
					/>
				</Label>
			</div>

			<div>
				<Races>
					<H3>What are your upcoming races?</H3>
					<RaceGrid>
						{sortedRaces.map(race => (
							<RaceInput key={race.sys.id}>
								<Checkbox
									name="races"
									onChange={handleChange}
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
							type="text"
							placeholder={"Race Name"}
							name="otherRaces"
							value={values?.otherRaces}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</OtherRaces>
				</Races>

				<Submit type="submit" disabled={isSubmitting || !isValid}>
					{isSubmitting ? "Saving" : "Update"}
				</Submit>

				{status && (
					<Div w_100 dib>
						<p>{status}</p>
					</Div>
				)}
			</div>
		</>
	);
};

export default FormInputs;
