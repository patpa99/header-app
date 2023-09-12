/* eslint-disable node/no-unpublished-import */
import React from 'react';
import {render, cleanup, screen} from '@testing-library/react';
// eslint-disable-next-line node/no-extraneous-import
import 'whatwg-fetch';
import Language from './languages.component';

describe('Language Component Tests', () => {
  it('TEST 1 - Check the presence of the external div of the language dropdown menu', () => {
    render(<Language />);
    expect(screen.getByTestId('languageDropDownDiv')).toBeTruthy();
    cleanup;
  });
});
