import styled from "styled-components";
import mq from "../../../utils/media-query";

const ModalPane = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 2;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	align-items: center;

	&:before {
		content: "";
		display: inline-block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(62, 62, 62, 0.7);
	}
`;

const Wrapper = styled.div`
	grid-column: 2 / span 10;
	padding: var(--spacing-large);
	z-index: 1;
	background: var(--white);
	position: relative;

	${mq.mdUp`
		grid-column: 3 / span 8;
		padding: var(--spacing-extra-large);
	`}
`;

const Modal = ({ children }) => <ModalPane>{children}</ModalPane>;

export const ModalWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Modal;
