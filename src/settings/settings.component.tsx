import {useEffect, useRef} from 'react';

// Import for image
import developerImg from '../assets/Paolo_Patrone.jpg';

// Import for style
import './style/settings.style.css';

export default function Settings(props) {
  const ref = useRef(null);

  useEffect(() => {
    /* To manage the closure of the settings drop-down menu when the
    user clicks outside this drop-down menu */
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target))
        window.dispatchEvent(new CustomEvent('closeSettingsDropDownMenu'));
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [location.href, ref]);

  return (
    <>
      <div id={props.settingsDropDownMenuId} ref={ref}>
        <div id="settingsContent">
          <p id="futureDevTxt" data-testid="futureDevTxtSettings">
            Warning: This feature will be developed in the future
          </p>
          <p id="titleAboutTheDeveloper" data-testid="titleAboutTheDeveloper">
            About the developer
          </p>
          <div id="divAboutTheDeveloper">
            <img
              id="developerImg"
              src={developerImg}
              alt="The developer: Paolo Patrone"
              data-testid="developerImg"
            />
            <p id="textAboutTheDeveloper" data-testid="textAboutTheDeveloper">
              This Operational Control Center was developed for Hitachi by Paolo
              Patrone as a master thesis project. Paolo will graduate in
              Software Engineering in October 2023 at the University of Genoa.
              The supervisor of his thesis is Professor Marina Ribaudo, the
              reviewer is Professor Gianna Reggio, while the external supervisor
              is engineer Massimiliano Grillo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
