import Link from "next/link";
import { Fragment } from "react";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import P from "@Components/UI/P";
import Center from "@Components/UI/Center";
import moment from "moment";
import Image from "next/image";
import Carousel from "@Components/New/Carousel";

const RaceSeries = ({ favouriteRacesCollection }) => (
	<Fragment>
		<Center>
			<H3>Our Favourite Race Series</H3>
		</Center>
		{favouriteRacesCollection.items.map((race, ind) => (
			<p key={ind}>{race.name}</p>
		))}
		<Carousel>
			<p>I am the 1 Slide.</p>
			<p>I am the second Slide.</p>
			<p>I am the third Slide.</p>
		</Carousel>
	</Fragment>
);

export default RaceSeries;
