import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import ResultsSummary from "../results-summary";
import RiderSummary from "../Results/rider-summary";
import ResultsContribute from "../results-contribute";
import ResultsFilter from "./results-filter";

const RiderSummary = () => (
	<RiderGrid>
		{this.props.allRiders.map((rider, index) => (
			<RiderGridItem
				w-20
				pa3
				flex
				hover_bg_lightest_blue
				bg_light_gray
				ba
				bw1
				b__white
				f4
				lh_copy
				key={index}
				id={rider.id}
			>
				<Link
					href={`/profile?name=${rider.name}`}
					as={`/profile/${rider.name}`}
					passHref
				>
					<A link near_black>
						<P f3 fw6 ma0 lh_title link hover_blue>
							{rider.name}
						</P>
					</A>
				</Link>
			</RiderGridItem>
		))}
	</RiderGrid>
);
