import { Section } from "../UI/Tachyons";
import styled from "styled-components";
import Link from "next/link";
import { Fragment } from "react";
import { H2, H4, P, A, Div } from "../UI/Tachyons";

const Item = styled(Section)`
	& + & {
		border-top: 2px solid var(--light-gray);
	}
`;

const CategoriesList = ({ categories = {} }) =>
	categories.items ? (
		<Div pb3 ph3>
			<H2>Browse our features</H2>

			<Div mb2>
				<Item>
					<Link href="/features" passHref>
						<A no_underline hover_blue black>
							<H4>All</H4>
							<P>Browse our complete features collection</P>
						</A>
					</Link>
				</Item>

				{categories.items.map((category, ind) => (
					<Item>
						<Link href={`/features/${category.fields.slug}`} key={ind} passHref>
							<A no_underline black hover_blue>
								<H4>{category.fields.name}</H4>

								<P>{category.fields.shortDescription}</P>
							</A>
						</Link>
					</Item>
				))}
			</Div>
		</Div>
	) : null;

export default CategoriesList;
