import {useState, useEffect} from 'react';

// Imports for icons
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
} from 'react-icons/tb';
import {FiAlertTriangle} from 'react-icons/fi';
import {GoAlert} from 'react-icons/go';
import {AiOutlineSetting, AiTwotoneSetting} from 'react-icons/ai';
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import {FaUserCircle} from 'react-icons/fa';
import {WiDayRainWind, WiDaySunny} from 'react-icons/wi';

// Imports for images
import Logo1 from './assets/Logo1.png';
import Logo2 from './assets/Logo2.png';

// Import for style
import './style/style.css';

// Import from .json file for backend endpoints
import configEndpoints from './assets/configurationEndpoints/configuration.json';

import Users from './users/users.component';
import Language from './languages/languages.component';
import Settings from './settings/settings.component';

export default function Root() {
  // For icon animations
  const [sidebarIconClicked, setSidebarIconClicked] = useState(false);
  const [weatherIconClicked, setWeatherIconClicked] = useState(false);
  const [languageIconClicked, setLanguageIconClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [settingsIconClicked, setSettingsIconClicked] = useState(false);
  const [alarmIconClicked, setAlarmIconClicked] = useState(false);
  // To keep the time in real time
  const [currTime, setCurrTime] = useState('');
  // For lateral scaling of the page
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Window width threshold for responsiveness
  const windowWidthThreshold = 850;

  // To change the container id of the sidebar icon to make it appear or not
  const [sidebarIconContainerId, setSidebarIconContainerId] = useState(
    'sidebarIconContainer'
  );

  const [usersDropDownMenuId, setUsersDropDownMenuId] = useState(
    'usersDropDownMenu_unclicked'
  );
  const [languageDropDownMenuId, setLanguageDropDownMenuId] = useState(
    'languageDropDownMenu_unclicked'
  );
  const [settingsDropDownMenuId, setSettingsDropDownMenuId] = useState(
    'settingsDropDownMenu_unclicked'
  );

  // To change burger id for tight header
  const [burgerId, setBurgerId] = useState('burgerBar_unclicked');
  const [menuId, setMenuId] = useState('menu_hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // For icon animations
  const changeSidebarIcon = () => setSidebarIconClicked(!sidebarIconClicked);

  // To get the time in real time
  const getCurrTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    setCurrTime(
      (hours < 10 ? '0' : '') +
        hours +
        ':' +
        (minutes < 10 ? '0' : '') +
        minutes +
        ':' +
        (seconds < 10 ? '0' : '') +
        seconds
    );
  };

  useEffect(() => {
    /* Read the endpoint file to see if the sidebar is present or not and then whether or not the sidebar icon
    should be present in the header (by changing the container id of the sidebar icon) */
    fetch(configEndpoints.headerConfig)
      .then(response => response.json())
      .then(jsonData => {
        // jsonData is parsed json object received from url
        const path = location.hash.substring(2).toString();
        if (jsonData[path].sidebar)
          setSidebarIconContainerId('sidebarIconContainer');
        else setSidebarIconContainerId('sidebarIconContainer_none');
      })
      .catch(error => {
        // handle errors here
        console.error(error);
      });

    // To get the current user's username from the database
    fetch(configEndpoints.getUserById + '?userId=1')
      .then(response => response.json())
      .then(getUserByIdData => {
        // getUserByIdData is parsed json object received from url
        setUsername(getUserByIdData.username);
      })
      .catch(error => {
        // handle errors here
        console.error(error);
      });

    // To get the current user's language from the database
    fetch(configEndpoints.getUserLanguageFromId + '?userId=1')
      .then(response => response.text())
      .then(userLanguageFromIdData => {
        // userLanguageFromIdData is a text received from url
        setLanguage(userLanguageFromIdData);
      })
      .catch(error => {
        // handle errors here
        console.error(error);
      });

    // To make the current time appear in the header
    getCurrTime();
    // Every second 'getCurrTime' is called to obtain the time in real time
    setInterval(getCurrTime, 1000);

    // Listener to change alarm icon correctly when the alarm modal is closed
    const handleCloseAlarmModal = () => {
      if (windowWidth > windowWidthThreshold) setAlarmIconClicked(false);
    };
    window.addEventListener('closeAlarmModal', handleCloseAlarmModal);

    // Listener to change weather icon correctly when the weather modal is closed
    const handleCloseWeatherModal = () => {
      if (windowWidth > windowWidthThreshold) setWeatherIconClicked(false);
    };
    window.addEventListener('closeWeatherModal', handleCloseWeatherModal);

    // Listener to close the users drop down menu
    const handleCloseUsersDropDownMenu = () => {
      setUsersDropDownMenuId('usersDropDownMenu_unclicked');
    };
    window.addEventListener(
      'closeUsersDropDownMenu',
      handleCloseUsersDropDownMenu
    );

    // Listener to change language icon correctly and to close the languages drop down menu
    const handleCloseLanguageDropDownMenu = (event: CustomEvent) => {
      setLanguageIconClicked(false);
      setLanguageDropDownMenuId('languageDropDownMenu_unclicked');
      if (event.detail.lang !== null) setLanguage(event.detail.lang);
    };
    window.addEventListener(
      'closeLanguageDropDownMenu',
      handleCloseLanguageDropDownMenu
    );

    // Listener to change settings icon correctly and to close the settings drop down menu
    const handleCloseSettingsDropDownMenu = () => {
      setSettingsIconClicked(false);
      setSettingsDropDownMenuId('settingsDropDownMenu_unclicked');
    };
    window.addEventListener(
      'closeSettingsDropDownMenu',
      handleCloseSettingsDropDownMenu
    );

    // To manage page resize
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= windowWidthThreshold) {
        setUsersDropDownMenuId('usersDropDownMenu_unclicked');
        setLanguageDropDownMenuId('languageDropDownMenu_unclicked');
        setSettingsDropDownMenuId('settingsDropDownMenu_unclicked');
      }
    };
    // Listener to check the window width
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('closeAlarmModal', handleCloseAlarmModal);
      window.removeEventListener('closeWeatherModal', handleCloseWeatherModal);
      window.removeEventListener(
        'closeUsersDropDownMenu',
        handleCloseUsersDropDownMenu
      );
      window.removeEventListener(
        'closeLanguageDropDownMenu',
        handleCloseLanguageDropDownMenu
      );
      window.removeEventListener(
        'closeSettingsDropDownMenu',
        handleCloseSettingsDropDownMenu
      );
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [location.href]);

  // To toggle burger menu change for tight header
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerId('burgerBar_clicked');
      setMenuId('menu_visible');
    } else {
      setBurgerId('burgerBar_unclicked');
      setMenuId('menu_hidden');
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const handleSidebarButton = () => {
    changeSidebarIcon();
    // Now the EventListener is called to open or close the sidebar
    window.dispatchEvent(new CustomEvent('sidebarButton'));
  };

  const handleAlarmButton = () => {
    if (windowWidth > windowWidthThreshold) setAlarmIconClicked(true);
    // Now the EventListener is called to open the alarm modal
    window.dispatchEvent(new CustomEvent('openAlarmModal'));
  };

  const handleWeatherButton = () => {
    if (windowWidth > windowWidthThreshold) setWeatherIconClicked(true);
    // Now the EventListener is called to open the weather modal
    window.dispatchEvent(new CustomEvent('openWeatherModal'));
  };

  const handleUsersButton = () => {
    // To open the users drop-down menu
    setUsersDropDownMenuId('usersDropDownMenu_clicked');
  };

  const handleLanguageButton = () => {
    if (windowWidth > windowWidthThreshold) setLanguageIconClicked(true);
    // To open the languages drop-down menu
    setLanguageDropDownMenuId('languageDropDownMenu_clicked');
  };

  const handleSettingsButton = () => {
    if (windowWidth > windowWidthThreshold) setSettingsIconClicked(true);
    // To open the settings drop-down menu
    setSettingsDropDownMenuId('settingsDropDownMenu_clicked');
  };

  return (
    /*################################################################################################################
    When the width of the window is greater than 850px they must be present in the header:
    - icon (which is replaced by another icon when clicked) for opening and closing the sidebar;
    - Logo 1;
    - Logo 2;
    - icon (which is replaced by another icon when clicked) to open alarm modal;
    - real-time time;
    - icon (which is replaced by another icon when clicked) to open weather modal;
    - icon of the user of the active session to open the users drop-down menu;
    - icon (which is replaced by another icon when clicked) to open the languages drop-down menu to select the
    language that the user wants to use;
    - icon (which is replaced by another icon on click) to open the settings drop-down menu.

    When the width of the window is less than or equal to 850px they must be present in the header:
    - icon (which is replaced by another icon on click) for opening and closing the sidebar;
    - Logo 1;
    - Logo 2;
    - icon (which is replaced by another icon when clicked) for opening a drop-down menu containing all the functions
    as in the large header.
    ################################################################################################################*/
    <>
      <nav id="headerContainer">
        <div
          id={sidebarIconContainerId}
          data-testid="sidebarIconContainer"
          onClick={handleSidebarButton}
        >
          {sidebarIconClicked ? (
            <TbLayoutSidebarLeftCollapse
              id="sidebarIcon"
              data-testid="clickedSidebarIcon"
            />
          ) : (
            <TbLayoutSidebarLeftExpand
              id="sidebarIcon"
              data-testid="unclickedSidebarIcon"
            />
          )}
        </div>
        <div id="logo1Container">
          <img id="logo1" src={Logo1} alt="Logo 1" />
        </div>
        <div id="logo2Container">
          <img id="logo2" src={Logo2} alt="Logo 2" />
        </div>

        {windowWidth > windowWidthThreshold ? (
          <>
            <div
              id="alarmContainer"
              data-testid="alarmContainer"
              onClick={handleAlarmButton}
            >
              {alarmIconClicked ? (
                <GoAlert id="alarmIcon" data-testid="clickedAlarmIcon" />
              ) : (
                <FiAlertTriangle
                  id="alarmIcon"
                  data-testid="unclickedAlarmIcon"
                />
              )}
            </div>

            <div
              id="settingsContainer"
              data-testid="settingsContainer"
              onClick={handleSettingsButton}
            >
              {settingsIconClicked ? (
                <AiTwotoneSetting
                  id="settingsIcon"
                  data-testid="clickedSettingsIcon"
                />
              ) : (
                <AiOutlineSetting
                  id="settingsIcon"
                  data-testid="unclickedSettingsIcon"
                />
              )}
            </div>
            <div
              id="languageContainer"
              data-testid="languageContainer"
              onClick={handleLanguageButton}
            >
              <span id="language"> {language} </span>
              {languageIconClicked ? (
                <IoMdArrowDropup
                  id="languageArrowIcon"
                  data-testid="clickedLanguageArrowIcon"
                />
              ) : (
                <IoMdArrowDropdown
                  id="languageArrowIcon"
                  data-testid="unclickedLanguageArrowIcon"
                />
              )}
            </div>
            <div
              id="userContainer"
              data-testid="userContainer"
              onClick={handleUsersButton}
            >
              <span id="user"> {username} </span>
              <FaUserCircle id="userIcon" />
            </div>
            <div
              id="weatherContainer"
              data-testid="weatherContainer"
              onClick={handleWeatherButton}
            >
              {weatherIconClicked ? (
                <WiDaySunny id="weatherIcon" data-testid="clickedWeatherIcon" />
              ) : (
                <WiDayRainWind
                  id="weatherIcon"
                  data-testid="unclickedWeatherIcon"
                />
              )}
            </div>
            <div id="timeContainer" data-testid="timeContainer">
              {currTime}
            </div>
            <Users usersDropDownMenuId={usersDropDownMenuId} />
            <Language
              languageDropDownMenuId={languageDropDownMenuId}
              windowWidthThreshold={windowWidthThreshold}
            />
            <Settings settingsDropDownMenuId={settingsDropDownMenuId} />
          </>
        ) : (
          <>
            <div id="burgerMenu" data-testid="burgerMenu" onClick={updateMenu}>
              <div id={burgerId} />
              <div id={burgerId} />
              <div id={burgerId} />
            </div>
            <Users usersDropDownMenuId={usersDropDownMenuId} />
            <Language
              languageDropDownMenuId={languageDropDownMenuId}
              windowWidthThreshold={windowWidthThreshold}
            />
            <Settings settingsDropDownMenuId={settingsDropDownMenuId} />
          </>
        )}
      </nav>
      {windowWidth > windowWidthThreshold ? (
        <></>
      ) : (
        <div id={menuId} data-testid="dropDownMenu">
          <div id="timeContainer_tight" data-testid="timeContainer_tight">
            {currTime}
          </div>
          <a onClick={handleAlarmButton}>
            Alarms <FiAlertTriangle id="alarmIcon_tight" />
          </a>
          <a onClick={handleWeatherButton}>
            Weather <WiDayRainWind id="weatherIcon_tight" />
          </a>
          <a onClick={handleUsersButton}>
            {username} <FaUserCircle id="userIcon_tight" />
          </a>
          <a onClick={handleLanguageButton}>
            {language} <IoMdArrowDropdown id="languageArrowIcon_tight" />
          </a>
          <a onClick={handleSettingsButton}>
            Settings <AiOutlineSetting id="settingsIcon_tight" />
          </a>
        </div>
      )}
    </>
  );
}
