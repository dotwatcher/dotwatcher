import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { H3 } from "../Tachyons";

const AccordionList = styled.ul`
	padding: 0;
	margin: 0;
`;

const SButton = styled.button`
	appearance: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	border-color: transparent;

	background-repeat: no-repeat;
	padding-left: var(--spacing-large);

	background-image: ${({ isContentVisible }) =>
		isContentVisible
			? 'url("/static/icons/down-arrow.svg")'
			: 'url("/static/icons/up-arrow.svg")'};
`;

const ContentContainer = styled.div`
	padding-bottom: var(--spacing-medium);

	${({ isContentVisible }) =>
		isContentVisible ? "display: block;" : "display: none;"}
`;

const AccordionTitle = styled(H3)``;

const Item = styled.li`
	& + & {
		border-top: 1px solid var(--light-gray);
	}
`;

const accordionItem = ({ id, title, children, iconColor, isOpen }, ref) => {
	let [isContentVisible, setContentVisible] = useState(true);

	const elementId = (((1 + Math.random()) * 0x10000) | 0)
		.toString(16)
		.substring(1);

	const domElementTop = elementId.offsetTop - 150;

	const toggleVisibility = () => {
		// setTimeout is here because of a recognised iPad issue:
		// https://stackoverflow.com/questions/19929197/javascript-window-scrollto-issue-on-ipad

		window.setTimeout(function() {
			window.scrollTo({ top: domElementTop, behavior: "smooth" });
		}, 0);
	};

	useEffect(() => {
		setContentVisible(isOpen);
	}, []);

	return (
		<Item ref={ref}>
			<AccordionTitle>
				<SButton
					onClick={() => setContentVisible(!isContentVisible)}
					toggleVisibility={() => toggleVisibility()}
					aria-controls={`content-${elementId}`}
					aria-expanded={isContentVisible}
					id={`control-${elementId}`}
					isContentVisible={isContentVisible}
				>
					{title}
				</SButton>
			</AccordionTitle>
			{isContentVisible && (
				<ContentContainer
					aria-hidden={!isContentVisible}
					isContentVisible={isContentVisible}
					id={`content-${id}`}
				>
					{children}
				</ContentContainer>
			)}
		</Item>
	);
};

export const AccordionItem = React.forwardRef(accordionItem);

export const Accordion = ({ children }) => (
	<AccordionList style={{ listStyle: "none" }}>{children}</AccordionList>
);
