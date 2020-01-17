import React from 'react';
import RandomChar from "./randomChar";
import { shallow } from 'enzyme';

describe('Testing <RandomChar />', () => {

    const char = shallow(<RandomChar />);

    describe('testing snap & state', () => {
        it('RandomChar rendered correctly', () => {
            expect(char).toMatchSnapshot();
        });
        it('randomChar state "char" is obj', () => {
            expect(char.state().char).toBeObject();
        });
        it('randomChar state "error" is false', () => {
            expect(char.state().error).toBeFalse();
        });
        it('randomChar state "errorStatus" is null', () => {
            expect(char.state().errorStatus).toBeNull();
        });
    });

    // describe('handdler tests', () => {
    //     it('testing updateChar', () => {
    //         char.instance().onCharLoaded();
    //         expect
    //     });
    // })


});