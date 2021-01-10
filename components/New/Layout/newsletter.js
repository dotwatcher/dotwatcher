import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import Image from "next/image";
import H2 from "@Components/UI/H2";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import Newsletter from "@Containers/Newsletter";
import Cookie from "js-cookie";
import useOutsideClick from "@Hooks/useOutsideClick";

const Div = styled.div`
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	background: ${colors.transparentGrey};
	z-index: 1;
`;

const ChildWrapper = styled.div`
	margin: 0 auto;
	padding: ${dim(4)};
	background: ${colors.white};
	position: absolute;

	width: 90%;
	top: 5%;
	left: 5%;

	${mq.mdUp`
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 600px;
  `}
`;

const Close = styled.button`
	position: absolute;
	top: ${dim()};
	right: ${dim()};
	background: none;
	border: none;
	cursor: pointer;
`;

const Modal = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const ref = useRef(null);

	const close = e => {
		if (e) e.preventDefault();

		// Expires set in datys
		Cookie.set("hideSignup", true, { expires: 31, path: "/" });
		setModalOpen(false);
	};

	useOutsideClick(ref, close);

	useEffect(() => {
		const cookie = Cookie.get("hideSignup");

		if (!cookie) {
			const timeout = () => {
				setModalOpen(true);
			};

			setTimeout(timeout, 1000);

			() => {
				clearTimeout(timeout);
			};
		}
	}, []);

	if (!modalOpen) return null;

	return (
		<Div ref={ref}>
			<ChildWrapper>
				<Close type="button" onClick={close}>
					<Image src="/static/icons/close.svg" width={20} height={20} />
				</Close>

				<div>
					<Center>
						<Image
							src="/static/icons/logo-minimal.svg"
							width={55}
							height={100}
						/>
						<H2>The DotWatcher Digest</H2>

						<P>
							The DotWatcher Digest is a regular roundup of the best content
							from around the bikepacking webosphere, delivered via an exclusive
							newsletter.
						</P>
					</Center>

					<Newsletter />

					<Center>
						<P>
							<A onClick={close}>No Thanks</A>
						</P>
					</Center>
				</div>
			</ChildWrapper>
		</Div>
	);
};

export default Modal;
