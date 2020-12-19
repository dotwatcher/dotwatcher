import { Section } from "../UI/Tachyons";
import styled from "styled-components";
import Link from "next/link";
import { Fragment } from "react";
import { H3, H4, P, A, Div } from "../UI/Tachyons";

const CategoriesWrap = styled(Section)`
	display: flex;
	justify-content: space-between;
`;

const CategoriesList = ({ categories = {} }) =>
	categories.items ? (
		<Div pb3 ph3 mt4 mb4 bt bb bw1 b__light_gray>
			<H3>Browse our features</H3>

			<CategoriesWrap mb2>
				<Link href="/features" passHref>
					<A no_underline hover_blue black>
						<H4>All</H4>
						<P>Browse our complete features collection</P>
					</A>
				</Link>

				{categories.items.map((category, ind) => (
					<div>
						<Link href={`/features/${category.fields.slug}`} key={ind} passHref>
							<A no_underline black hover_blue>
								<H4>{category.fields.name}</H4>

								<P>{category.fields.shortDescription}</P>
							</A>
						</Link>
					</div>
				))}
			</CategoriesWrap>
		</Div>
	) : null;

export default CategoriesList;
