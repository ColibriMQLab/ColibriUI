import * as React from 'react';
import Avatar from '.';
import { AccountType } from './index.props';

describe('Avatar', () => {
    it('Должна корректно отрендериться аватарка организации', () => {
        expect(shallow(<Avatar accountType={AccountType.Organization} />)).toMatchSnapshot();
    });

    it('Должна корректно отрендериться дефолтная аватарка', () => {
        expect(shallow(<Avatar />)).toMatchSnapshot();
    });
});
