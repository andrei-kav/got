import React from 'react';
import ItemList from "./itemList";
import { mount } from 'enzyme';

import GotService from "../../services/gotService";

describe('testing <ItemList />', () => {
    const service = new GotService();
    const List = mount(<ItemList getData={service.getAllHouses}
                                 renderItem={({name}) => name}
                                 onItemSelected={() => 'qwe'} />);

    it('Click on itemList must rerender all list in 1 instance', () => {
        List.setState({ itemList: [ {name: 'qweqwe', id: 1}, {name: 'ertere', id: 2} ] });
        List.find('.list-group-item:first-child').simulate('click');
        expect(List.find('ul')).toHaveLength(1);
    });
});