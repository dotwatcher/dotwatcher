import React from "react";
import PropTypes from "prop-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";

const Container = styled.div`
	p {
		font-size: 1.25rem;
		line-height: 1.5;
	}
	a:link {
		color: var(--blue);
	}
`;

const RichText = ({ source }) => (
	<Container>{documentToReactComponents(source)}</Container>
);

RichText.propTypes = {
	source: PropTypes.object.isRequired
};

export default RichText;
