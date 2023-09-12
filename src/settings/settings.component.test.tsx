/* eslint-disable node/no-unpublished-import */
import React from 'react';
import {render, cleanup, screen, within} from '@testing-library/react';
// eslint-disable-next-line node/no-extraneous-import
import 'whatwg-fetch';
import Settings from './settings.component';

describe('Settings Component Tests', () => {
  // To render the Settings Component before each test
  beforeEach(() => {
    render(<Settings />);
  });

  // To unmounts React trees that were mounted with render after each test
  afterEach(() => {
    cleanup;
  });

  it('TEST 1 - Check the presence of the correct text in the warning div in the settings drop-down menu', () => {
    const txt = 'Warning: This feature will be developed in the future';
    const {getByText} = within(screen.getByTestId('futureDevTxtSettings'));
    expect(getByText(txt)).toBeTruthy();
  });

  it('TEST 2 - Check the presence of the correct text in the "About the developer" title in the settings drop-down menu', () => {
    const txt = 'About the developer';
    const {getByText} = within(screen.getByTestId('titleAboutTheDeveloper'));
    expect(getByText(txt)).toBeTruthy();
  });

  it('TEST 3 - Check the presence of the developer image in the settings drop-down menu', () => {
    expect(screen.getByTestId('developerImg')).toBeTruthy();
  });

  it('TEST 4 - Check the presence of the correct text in the "About the developer" section in the settings drop-down menu', () => {
    const txt =
      'This Operational Control Center was developed for Hitachi by Paolo Patrone as a master thesis project. Paolo will graduate in Software Engineering in October 2023 at the University of Genoa. The supervisor of his thesis is Professor Marina Ribaudo, the reviewer is Professor Gianna Reggio, while the external supervisor is engineer Massimiliano Grillo.';
    const {getByText} = within(screen.getByTestId('textAboutTheDeveloper'));
    expect(getByText(txt)).toBeTruthy();
  });
});
