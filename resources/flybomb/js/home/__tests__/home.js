import React from 'react';
import { mount } from 'enzyme';
import Home from '../index';
describe('Anchor Render', () => {
    it('Anchor render perfectly', () => {
        const wrapper = mount(<Home />);
        expect(wrapper.instance().state).not.toBe(null);
    });
});
