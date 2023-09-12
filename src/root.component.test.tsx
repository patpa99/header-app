/* eslint-disable node/no-unpublished-import */
import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  queryByAttribute,
} from '@testing-library/react';
// eslint-disable-next-line node/no-extraneous-import
import 'whatwg-fetch';
import Root from './root.component';

describe('Header App Tests', () => {
  let root;

  // To render the header before each test
  beforeEach(() => {
    root = render(<Root />);
  });

  // To unmounts React trees that were mounted with render after each test
  afterEach(() => {
    cleanup;
  });

  it('TEST 1 - Check the onClick event on the div containing the alarm icon (window width = 900px)', () => {
    // Set the width of the window to 900px
    window.innerWidth = 900;
    fireEvent(window, new Event('resize'));

    const alarmButton = screen.getByTestId('alarmContainer');

    // Check if the icon for the alarms has a correct behavior
    expect(screen.getByTestId('unclickedAlarmIcon')).toBeTruthy();
    fireEvent.click(alarmButton);
    expect(screen.getByTestId('clickedAlarmIcon')).toBeTruthy();
  });

  it('TEST 2 - Check the onClick event on the div containing the settings icon (window width = 900px)', () => {
    // Set the width of the window to 900px
    window.innerWidth = 900;
    fireEvent(window, new Event('resize'));

    const settingsButton = screen.getByTestId('settingsContainer');

    // Check if the icon for the settings has a correct behavior
    expect(screen.getByTestId('unclickedSettingsIcon')).toBeTruthy();
    fireEvent.click(settingsButton);
    expect(screen.getByTestId('clickedSettingsIcon')).toBeTruthy();
  });

  it('TEST 3 - Check the onClick event on the div containing the language arrow icon (window width = 900px)', () => {
    // Set the width of the window to 900px
    window.innerWidth = 900;
    fireEvent(window, new Event('resize'));

    const languageButton = screen.getByTestId('languageContainer');

    // Check if the icon for the language selection has a correct behavior
    expect(screen.getByTestId('unclickedLanguageArrowIcon')).toBeTruthy();
    fireEvent.click(languageButton);
    expect(screen.getByTestId('clickedLanguageArrowIcon')).toBeTruthy();
  });

  it('TEST 4 - Check the onClick event on the div containing the weather icon (window width = 900px)', () => {
    // Set the width of the window to 900px
    window.innerWidth = 900;
    fireEvent(window, new Event('resize'));

    const weatherButton = screen.getByTestId('weatherContainer');

    // Check if the icon for the weather has a correct behavior
    expect(screen.getByTestId('unclickedWeatherIcon')).toBeTruthy();
    fireEvent.click(weatherButton);
    expect(screen.getByTestId('clickedWeatherIcon')).toBeTruthy();
  });

  it('TEST 5 - Check the onClick event on the div containing the burger menu icon (window width = 800px)', () => {
    // Set the width of the window to 800px
    window.innerWidth = 800;
    fireEvent(window, new Event('resize'));

    const burgerMenuButton = screen.getByTestId('burgerMenu');

    // Check if the id of the drop-down menu div changes dynamically correctly
    const getById = queryByAttribute.bind(null, 'id');
    expect(getById(root.container, 'menu_hidden')).toBeTruthy();
    fireEvent.click(burgerMenuButton);
    expect(getById(root.container, 'menu_visible')).toBeTruthy();
    fireEvent.click(burgerMenuButton);
    expect(getById(root.container, 'menu_hidden')).toBeTruthy();
  });

  it('TEST 6 - Check the real-time time pattern', () => {
    // Set the width of the window to 900px
    window.innerWidth = 900;
    fireEvent(window, new Event('resize'));

    const timeContainer = screen.getByTestId('timeContainer');
    const time =
      timeContainer.textContent === null ? '' : timeContainer.textContent;

    /*
    Some examples of real-time time with correct pattern:
    08:06:03
    23:59:59
    */
    const pattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    // Check if the real-time time pattern is correct
    expect(pattern.test(time)).toBeTruthy();

    // Now I do the same check even when the window width is 800px
    // Set the width of the window to 800px
    window.innerWidth = 800;
    fireEvent(window, new Event('resize'));

    const timeContainerTight = screen.getByTestId('timeContainer_tight');
    const timeTight =
      timeContainerTight.textContent === null
        ? ''
        : timeContainerTight.textContent;

    // Check if the real-time time pattern is correct
    expect(pattern.test(timeTight)).toBeTruthy();
  });

  it('TEST 7 - Check that the header is responsive', () => {
    // Set the width of the window to 900px
    window.innerWidth = 900;
    fireEvent(window, new Event('resize'));

    // Check if all header sections are present correctly
    expect(screen.getByTestId('alarmContainer')).toBeTruthy();
    expect(screen.getByTestId('settingsContainer')).toBeTruthy();
    expect(screen.getByTestId('languageContainer')).toBeTruthy();
    expect(screen.getByTestId('userContainer')).toBeTruthy();
    expect(screen.getByTestId('weatherContainer')).toBeTruthy();
    expect(screen.getByTestId('timeContainer')).toBeTruthy();

    // Set the width of the window to 800px
    window.innerWidth = 800;
    fireEvent(window, new Event('resize'));

    // check if the section of the header concerning the burger menu icon is present correctly
    expect(screen.getByTestId('burgerMenu')).toBeTruthy();
  });
});
