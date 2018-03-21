import 'jest-styled-components';

import React from 'react';
import SocialButtons from '../index';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('<SocialButtons />', () => {
	it('renders <SocialButtons />', () => {
		const tree = renderer.create(<SocialButtons />).toJSON()
		expect(tree).toMatchSnapshot()
	});
});