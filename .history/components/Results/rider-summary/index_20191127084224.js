import React from "react";
import Link from "next/link";

const RiderSummary = ({ riders = [] }) => (
	<RiderGrid>
		{riders.map((rider, index) => (
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

export default RiderSummary;
