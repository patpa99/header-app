import {useEffect, useRef} from 'react';

// Import for style
import './style/languages.style.css';

// Import from .json file for endpoints
import configEndpoints from '../assets/configurationEndpoints/configuration.json';

export default function Language(props) {
  const ref = useRef(null);

  useEffect(() => {
    // To get the list of languages from the database
    fetch(configEndpoints.getLanguagesList)
      .then(response => response.json())
      .then(languagesData => {
        // languagesData is parsed json object received from url
        getDynamicLanguages(languagesData);
      })
      .catch(error => {
        // handle errors here
        console.error(error);
      });

    /* To manage the closure of the language drop-down menu when the
    user clicks outside this drop-down menu */
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        window.dispatchEvent(
          new CustomEvent('closeLanguageDropDownMenu', {
            detail: {
              lang: null,
            },
          })
        );
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [location.href, ref]);

  // To get the language that is clicked in the languages drop-down menu
  const getSelectedLanguage = event => {
    // Get the source element
    const element = event.target || event.srcElement || event.currentTarget;
    return element.innerHTML;
  };

  // To create the list of clickable languages visible in the language drop-down menu
  const getDynamicLanguages = arrayLanguages => {
    const langContent = document.getElementById('langContent') as HTMLElement;
    langContent.innerHTML = '';
    for (let i = 0; i < arrayLanguages.length; i++) {
      // Creation of the html elements and the relative style for the languages in the language drop down menu
      const language = document.createElement('a');
      language.innerHTML = arrayLanguages[i].language;
      language.onclick = () => {
        const selectedLang = getSelectedLanguage(event);
        fetch(
          configEndpoints.setUserLanguage +
            '?language=' +
            selectedLang +
            '&userId=1'
        )
          .then(response => response.text())
          .then(setUserLanguageData => {
            // setUserLanguageData is a text received from url
            if (setUserLanguageData === 'Success')
              window.dispatchEvent(
                new CustomEvent('closeLanguageDropDownMenu', {
                  detail: {
                    lang: selectedLang,
                  },
                })
              );
          })
          .catch(error => {
            // handle errors here
            console.error(error);
          });
      };
      langContent.appendChild(language);
    }
  };

  return (
    <>
      <div
        id={props.languageDropDownMenuId}
        ref={ref}
        data-testid="languageDropDownDiv"
      >
        <div id="langContent"></div>
      </div>
    </>
  );
}
