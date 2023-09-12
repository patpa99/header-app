/* eslint-disable node/no-unpublished-import */
import React from 'react';
import {render, cleanup, screen} from '@testing-library/react';
// eslint-disable-next-line node/no-extraneous-import
import 'whatwg-fetch';
import Users from './users.component';

describe('Users Component Tests', () => {
  // To render the Users Component before each test
  beforeEach(() => {
    render(<Users />);
  });

  // To unmounts React trees that were mounted with render after each test
  afterEach(() => {
    cleanup;
  });

  it('TEST 1 - Check the presence of the external div of the users dropdown menu', () => {
    expect(screen.getByTestId('usersDropDownDiv')).toBeTruthy();
  });

  it('TEST 2 - Check the presence of the internal div of the users dropdown menu', () => {
    expect(screen.getByTestId('usersContent')).toBeTruthy();
  });
});
