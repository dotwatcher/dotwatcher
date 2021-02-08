import React from "react";
import PropTypes from "prop-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";

const RichText = ({ source }) => <div>{documentToReactComponents(source)}</div>;

RichText.propTypes = {
	source: PropTypes.object.isRequired
};

export default RichText;
