import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import EmailSignUp from "../Newsletter";
import { initGA, logPageView } from "../../utils/analytics";
import Cookies from "js-cookie";

const Wrapper = styled.div`
	${tachyons}
	position: relative;
`;

const H2 = styled.h2`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const Newsletter = styled.div`
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

const NewsletterWrapper = styled.div`
	grid-column: 3 / span 8;
	z-index: 1;
	padding: var(--spacing-extra-large);
	background: var(--white);
	position: relative;
`;

const Close = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	background: none;
	border: none;

	&:hover {
		cursor: pointer;
	}
`;

class Page extends Component {
	constructor(props) {
		super(props);

		this.COOKIE_NAME = "newsletterModal";

		this.state = {
			showModal: false
		};

		this.setCookie = this.setCookie.bind(this);
	}

	componentDidMount() {
		if (!Cookies.get(this.COOKIE_NAME)) {
			this.setState({
				showModal: true
			});
		}

		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}

	setCookie() {
		Cookies.set(this.COOKIE_NAME, true);

		this.setState({
			showModal: false
		});
	}

	render() {
		return (
			<Wrapper sans_serif near_black pa0 ma0 className="cf">
				{this.props.children}

				{this.state.showModal && (
					<Newsletter>
						<NewsletterWrapper>
							<H2 ma0 mb3>
								The DotWatcher Digest
							</H2>
							<P lh-copy ma0 mb3>
								For all the latest updates from the bikepacking webosphere and
								beyond, sign up to DotWatcher Digest.
							</P>
							<Close type="button" onClick={this.setCookie}>
								X
							</Close>
							<EmailSignUp showPastIssues={false} onSubmit={this.setCookie} />
						</NewsletterWrapper>
					</Newsletter>
				)}
			</Wrapper>
		);
	}
}

Page.propTypes = {
	children: PropTypes.node
};

Page.defaultProps = {
	children: ""
};

export default Page;
