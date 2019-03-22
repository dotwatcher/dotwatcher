import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Link from 'next/link';

const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;

const Categories = ({categories}) => (
	<Div fr f5 pv2>
		{
			categories.map(category => (
				<Link href={`/race?slug=${category.sys.id}`} as={`/race/${category.sys.id}`} key={category.sys.id} passHref prefetch>
					<A link dim near_black underline>{category.fields.title}</A>
				</Link>
			))
		}
	</Div>
);

Categories.propTypes = {
	categories: PropTypes.object.isRequired
};

export default Categories;
