import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import Logo from "./logo";

const A = styled.a`
	${tachyons}
`;
const H1 = styled.h1`
	${tachyons}
`;
const H2 = styled.h2`
	${tachyons}
`;
const Div = styled.div`
	width: 170px;
	margin: 0 auto;
	@media screen and (min-width: 48em) {
		margin: 0 0 0 var(--spacing-large);
	}
`;
const Menu = styled.div`
	padding: 0 var(--spacing-medium) var(--spacing-medium);
	margin-left: auto;
	line-height: 1;
	font-size: 2.25rem;
	clear: left;

	@media screen and (min-width: 48em) {
		padding: var(--spacing-medium);
		display: flex;
		align-items: center;
		clear: none;
		float: right;
	}
	${tachyons}
`;

class Banner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bannerHeight: 0,
			fixed: false,
			width: 320,
			lastScrollY: 0
		};
		this.boundHeaderPop = this.debounce(this.headerPop.bind(this), 50);
	}

	componentDidMount() {
		this.setState({ width: window.innerWidth });
		this.setupStickyHeader();
	}

	componentWillUnmount() {
		if (this.state.width > 1024) {
			document.removeEventListener("scroll", this.boundHeaderPop);
		}
	}

	setupStickyHeader() {
		document.addEventListener("scroll", this.boundHeaderPop);
		const banner = document.querySelector("#banner");
		this.setState({
			bannerHeight: banner.offsetHeight
		});
	}

	debounce(fn, delay) {
		let timer = null;
		return () => {
			const context = this;
			const args = arguments;
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn.apply(context, args);
			}, delay);
		};
	}

	headerPop() {
		const { lastScrollY } = this.state;
		const currentScrollY = window.scrollY;
		const stickyBar = document.getElementById("sticky");

		if (currentScrollY < this.state.bannerHeight) {
			this.setState({ fixed: false });
			if (stickyBar) {
				stickyBar.style.top = "var(--spacing-large)";
			}
		} else if (currentScrollY < lastScrollY) {
			this.setState({ fixed: true });
			if (stickyBar) {
				stickyBar.style.top = this.state.bannerHeight + 32 + "px";
			}
		} else {
			this.setState({ fixed: false });
			if (stickyBar) {
				stickyBar.style.top = "var(--spacing-large)";
			}
		}
		this.setState({ lastScrollY: currentScrollY });
	}

	render() {
		const Header = styled.header`
			position: relative;
			top: 0;
			${props =>
				props.isFixed &&
				css`
					position: fixed;
				`}
			${tachyons}
		`;
		const padTop = this.state.fixed ? (
			<Div style={{ height: this.state.bannerHeight }} />
		) : null;
		return (
			<React.Fragment>
				{padTop}
				<Header
					flex_ns
					bg_white
					bb
					b__light_gray
					near_black
					w_100
					z_2
					className="cf"
					id="banner"
					isFixed={this.state.fixed}
				>
					<H1 flex items_center f2 pt1 ma0 fw5 lh_solid w_40_l>
						<Div>
							<Logo>{this.props.title}</Logo>
						</Div>
					</H1>
					{this.props.raceName ? (
						<H2 fl dn pv3 ph4 flex_ns items_center f4 ma0 lh_solid fw5>
							<Link href={`/race/${this.props.race.fields.slug}`} passHref>
								<A no_underline pt3 near_black hover_blue>
									{this.props.race.fields.title}
								</A>
							</Link>
						</H2>
					) : null}
					<Menu tc>
						<Link href="/races" passHref>
							<A
								dib
								pt3
								mr2
								mr3_ns
								f5
								f4_l
								near_black
								hover_blue
								no_underline
								fw5
							>
								Reports
							</A>
						</Link>
						<Link href="/results" passHref>
							<A
								dib
								pt3
								mh2
								mh3_ns
								f5
								f4_l
								near_black
								hover_blue
								no_underline
								fw5
							>
								Results
							</A>
						</Link>

						{/* <Link href="/calendar" passHref>
							<A
								dib
								pt3
								mh2
								mh3_ns
								f5
								f4_l
								near_black
								hover_blue
								no_underline
								fw5
							>
								Calendar
							</A>
						</Link> */}
						<Link href="/features" passHref>
							<A
								dib
								pt3
								mh2
								mh3_ns
								f5
								f4_l
								near_black
								hover_blue
								no_underline
								fw5
							>
								Features
							</A>
						</Link>
						<Link href="/about" as="/about" passHref>
							<A
								dib
								pt3
								ml2
								ml3_ns
								f5
								f4_l
								near_black
								hover_blue
								no_underline
								fw5
							>
								About
							</A>
						</Link>
					</Menu>
				</Header>
			</React.Fragment>
		);
	}
}

Banner.propTypes = {
	title: PropTypes.string.isRequired,
	raceName: PropTypes.string,
	race: PropTypes.object
};

Banner.defaultProps = {
	raceName: "",
	race: {}
};

export default Banner;
