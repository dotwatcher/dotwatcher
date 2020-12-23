import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Event from "./event";

const H2 = styled.h2`
	${tachyons}
`;
const Header = styled.header`
	${tachyons}
`;
const List = styled.ul`
	@media screen and (min-width: 48em) {
		height: 80vh;
		overflow: scroll;
	}
	${tachyons}
`;
const Toggle = styled.a`
	${tachyons}
`;

class KeyEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMore: false,
			width: 320
		};
		this.toggleHidden = this.toggleHidden.bind(this);
		this.boundHandleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		this.setState({ width: window.innerWidth });
		this.setupStickyScroll();
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.boundHandleScroll);
	}

	setupStickyScroll() {
		document.addEventListener("scroll", this.boundHandleScroll);
	}

	handleScroll() {
		if (this.state.width >= 1024) {
			const windowHeight = document.body.scrollHeight;
			const eventsWrap = document.getElementById("events-wrap");

			if (eventsWrap) {
				eventsWrap.style.height = windowHeight - 400 + "px";
			}
		}
	}

	render() {
		const Div = styled.div`
			@media screen and (min-width: 64em) {
				position: sticky;
				top: 90px;
			}
			${tachyons}
		`;
		const posts = this.props.posts.map((post, index) => {
			post.loaded = index <= this.props.skip;
			return post;
		});
		const keyEvents = posts.filter(post => post.data.keyEvent === true);
		const count = this.state.width >= 1024 ? 5 : 3;
		const lessKeyEvents = keyEvents.slice(0, count);
		const keyEventsToShow = this.state.showMore ? keyEvents : lessKeyEvents;
		return (
			<Div fl w_50 w_100_ns pl3 pl0_ns id="sticky">
				<Header>
					<H2
						ttu
						tracked
						f5
						fw6
						bb
						bw1
						pb1
						b__light_gray
						measure_narrow
						mt0
						mt3_ns
					>
						Key moments
					</H2>
				</Header>
				<List list="true" pa0>
					{keyEventsToShow.map(post => (
						<Event
							key={post.sys.id}
							id={post.sys.id}
							data={post.data}
							loaded={post.loaded}
						/>
					))}
					{keyEvents.length > 5 ? (
						<Toggle
							link
							f6
							underline_hover
							hover_blue
							onClick={this.toggleHidden}
						>
							{this.state.showMore ? "▲ Show less" : "▼ Show more"}
						</Toggle>
					) : null}
				</List>
			</Div>
		);
	}

	toggleHidden() {
		this.setState(prevState => ({ showMore: !prevState.showMore }));
	}
}

KeyEvents.propTypes = {
	posts: PropTypes.array.isRequired,
	skip: PropTypes.number
};

KeyEvents.defaultProps = {
	skip: 5
};

export default KeyEvents;
