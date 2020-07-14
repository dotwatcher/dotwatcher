import styled from "styled-components";

const Img = styled.img`
	width: 35px;
	display: inline-block;
`;

const imagePath = "/static/flags";
export default nationality => {
	if (!nationality) return null;

	const slug = nationality.toLowerCase().replace(/\s/g, "-");

	return (
		<Img
			src={`${imagePath}/${slug}.svg`}
			alt={nationality}
			title={nationality}
		/>
	);
};
