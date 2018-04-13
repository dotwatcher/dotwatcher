import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import {Link} from '../../routes';
import slugify from '../../utils/slugify';

const Div = styled.div`${tachyons}`;
const A = styled.a`${tachyons}`;

const Categories = ({categories}) => (
	<Div fr f5 pv2>
		{
			categories.map(category => (
				<Link key={category.sys.id} route="race" params={{type: 'race', id: category.sys.id, slug: slugify(category.fields.title)}} passHref prefetch>
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
