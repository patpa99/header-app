import {useEffect, useRef} from 'react';

// Import for style
import './style/users.style.css';

// Import from .json file for configuration endpoints
import configEndpoints from '../assets/configurationEndpoints/configuration.json';

export default function Users(props) {
  const ref = useRef(null);

  useEffect(() => {
    /* To manage the closure of the users drop-down menu when the
    user clicks outside this drop-down menu */
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target))
        window.dispatchEvent(new CustomEvent('closeUsersDropDownMenu'));
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [location.href, ref]);

  // To manage the click of "< back" to return to the previous users drop-down menu screen
  const handleClickBack = () => {
    const usersContent = document.getElementById('usersContent');
    usersContent.innerHTML = '';
    document.getElementById('usersDropDownMenu_clicked').style.padding = '0px';
    const editProf = document.createElement('a');
    editProf.innerHTML = 'Edit your profile';
    editProf.onclick = handleClickEditProf;
    usersContent.appendChild(editProf);
    const changePsw = document.createElement('a');
    changePsw.innerHTML = 'Change your password';
    changePsw.onclick = handleClickChangePsw;
    usersContent.appendChild(changePsw);
    const logout = document.createElement('a');
    logout.id = 'logoutButton';
    logout.innerHTML = 'Logout';
    usersContent.appendChild(logout);
  };

  // To manage the click of the "Edit your profile" item
  const handleClickEditProf = () => {
    fetch(configEndpoints.getUserById + '?userId=1')
      .then(response => response.json())
      .then(getUserByIdData => {
        // getUserByIdData is parsed json object received from url
        const usersContent = document.getElementById('usersContent');
        usersContent.innerHTML = '';
        document.getElementById('usersDropDownMenu_clicked').style.padding =
          '10px';
        const leftArrow = document.createElement('p');
        leftArrow.innerHTML = '< back';
        leftArrow.onclick = handleClickBack;
        usersContent.appendChild(leftArrow);
        usersContent.appendChild(document.createElement('br'));
        usersContent.appendChild(document.createElement('br'));
        const labelName = document.createElement('label');
        labelName.innerHTML = 'Name:';
        usersContent.appendChild(labelName);
        usersContent.appendChild(document.createElement('br'));
        const inputName = document.createElement('input');
        inputName.id = 'inputName';
        inputName.type = 'text';
        inputName.value = getUserByIdData.name;
        usersContent.appendChild(inputName);
        usersContent.appendChild(document.createElement('br'));
        const labelSurname = document.createElement('label');
        labelSurname.innerHTML = 'Surname:';
        usersContent.appendChild(labelSurname);
        usersContent.appendChild(document.createElement('br'));
        const inputSurname = document.createElement('input');
        inputSurname.id = 'inputSurname';
        inputSurname.type = 'text';
        inputSurname.value = getUserByIdData.surname;
        usersContent.appendChild(inputSurname);
        usersContent.appendChild(document.createElement('br'));
        const labelRole = document.createElement('label');
        labelRole.innerHTML = 'Role:';
        usersContent.appendChild(labelRole);
        usersContent.appendChild(document.createElement('br'));
        const inputRole = document.createElement('input');
        inputRole.id = 'inputRole';
        inputRole.type = 'text';
        if (getUserByIdData.admin) inputRole.value = 'Admin';
        else inputRole.value = 'Simple User';
        inputRole.readOnly = true;
        inputRole.disabled = true;
        usersContent.appendChild(inputRole);
        usersContent.appendChild(document.createElement('br'));
        const labelUsername = document.createElement('label');
        labelUsername.innerHTML = 'Username:';
        usersContent.appendChild(labelUsername);
        usersContent.appendChild(document.createElement('br'));
        const inputUsername = document.createElement('input');
        inputUsername.id = 'inputUsername';
        inputUsername.type = 'text';
        inputUsername.value = getUserByIdData.username;
        usersContent.appendChild(inputUsername);
        const usernameRules = document.createElement('div');
        usernameRules.id = 'usernameRules';
        usernameRules.innerHTML =
          'The username must be between 6 and 12 characters long and must accept lowercase letters, uppercase letters, digits and special characters (such as "-", "_" and ".").';
        usersContent.appendChild(usernameRules);
        usersContent.appendChild(document.createElement('br'));
        const succFail = document.createElement('div');
        succFail.id = 'succFail';
        usersContent.appendChild(succFail);
        usersContent.appendChild(document.createElement('br'));
        const editButton = document.createElement('button');
        editButton.id = 'editButton';
        editButton.innerHTML = 'Edit';
        editButton.onclick = handleEditButton;
        usersContent.appendChild(editButton);
      })
      .catch(error => {
        // handle errors here
        console.error(error);
      });
  };

  // To manage the click of the "Edit" button
  const handleEditButton = () => {
    const succFail = document.getElementById('succFail');
    succFail.innerHTML = 'Loading...';

    // Regex for user name and surname
    const nameSurnameRegex = /^[a-zA-Zàèéìòù' ]+$/;
    const usernameRegex = /^[a-zA-Z\d-_.]{6,12}$/;

    const name = document.getElementById('inputName') as HTMLInputElement;
    const surname = document.getElementById('inputSurname') as HTMLInputElement;
    const username = document.getElementById(
      'inputUsername'
    ) as HTMLInputElement;
    if (
      name.value !== null &&
      surname.value !== null &&
      username.value !== null &&
      name.value !== '' &&
      surname.value !== '' &&
      nameSurnameRegex.test(name.value.trim()) &&
      nameSurnameRegex.test(surname.value.trim()) &&
      usernameRegex.test(username.value.trim())
    ) {
      fetch(
        configEndpoints.updateUserById +
          '?userId=1' +
          '&name=' +
          name.value.trim() +
          '&surname=' +
          surname.value.trim() +
          '&username=' +
          username.value.trim()
      )
        .then(response => response.text())
        .then(updateUserByIdData => {
          // updateUserByIdData is a text received from url
          if (updateUserByIdData === 'Success') {
            succFail.innerHTML = 'Success';
            succFail.style.color = '#00e600';
          } else if (updateUserByIdData === 'Error1') {
            succFail.innerHTML =
              'Error: Some fields are null or empty or do not have the correct format';
            succFail.style.color = 'red';
          } else {
            succFail.innerHTML = 'Error';
            succFail.style.color = 'red';
          }
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch(error => {
          // handle errors here
          console.error(error);
          succFail.innerHTML = 'Error';
          succFail.style.color = 'red';
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    } else {
      succFail.innerHTML =
        'Error: Some fields are null or empty or do not have the correct format';
      succFail.style.color = 'red';
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  // To manage the click of the "Change your password" item
  const handleClickChangePsw = () => {
    const usersContent = document.getElementById('usersContent');
    usersContent.innerHTML = '';
    document.getElementById('usersDropDownMenu_clicked').style.padding = '10px';
    const leftArrow = document.createElement('p');
    leftArrow.innerHTML = '< back';
    leftArrow.onclick = handleClickBack;
    usersContent.appendChild(leftArrow);
    usersContent.appendChild(document.createElement('br'));
    usersContent.appendChild(document.createElement('br'));
    const labelOldPsw = document.createElement('label');
    labelOldPsw.innerHTML = 'Old Password:';
    usersContent.appendChild(labelOldPsw);
    usersContent.appendChild(document.createElement('br'));
    const inputOldPsw = document.createElement('input');
    inputOldPsw.id = 'inputOldPsw';
    inputOldPsw.type = 'password';
    usersContent.appendChild(inputOldPsw);
    usersContent.appendChild(document.createElement('br'));
    const labelNewPsw = document.createElement('label');
    labelNewPsw.innerHTML = 'New Password:';
    usersContent.appendChild(labelNewPsw);
    usersContent.appendChild(document.createElement('br'));
    const inputNewPsw = document.createElement('input');
    inputNewPsw.id = 'inputNewPsw';
    inputNewPsw.type = 'password';
    usersContent.appendChild(inputNewPsw);
    usersContent.appendChild(document.createElement('br'));
    const labelRepeatNewPsw = document.createElement('label');
    labelRepeatNewPsw.innerHTML = 'Repeat New Password:';
    usersContent.appendChild(labelRepeatNewPsw);
    usersContent.appendChild(document.createElement('br'));
    const inputRepeatNewPsw = document.createElement('input');
    inputRepeatNewPsw.id = 'inputRepeatNewPsw';
    inputRepeatNewPsw.type = 'password';
    usersContent.appendChild(inputRepeatNewPsw);
    const pswRules = document.createElement('div');
    pswRules.id = 'pswRules';
    pswRules.innerHTML =
      'The password must be between 8 and 20 characters long, must contain at least one lowercase letter, one uppercase letter, one numeric digit and one special character.';
    usersContent.appendChild(pswRules);
    usersContent.appendChild(document.createElement('br'));
    const succFail = document.createElement('div');
    succFail.id = 'succFail';
    usersContent.appendChild(succFail);
    usersContent.appendChild(document.createElement('br'));
    const changeButton = document.createElement('button');
    changeButton.id = 'changeButton';
    changeButton.innerHTML = 'Change';
    changeButton.onclick = handleChangeButton;
    usersContent.appendChild(changeButton);
  };

  // To manage the click of the "Change" button
  const handleChangeButton = () => {
    const succFail = document.getElementById('succFail');
    succFail.innerHTML = 'Loading...';

    const oldPsw = document.getElementById('inputOldPsw') as HTMLInputElement;
    const newPsw = document.getElementById('inputNewPsw') as HTMLInputElement;
    const repeatNewPsw = document.getElementById(
      'inputRepeatNewPsw'
    ) as HTMLInputElement;

    // Regex for user password
    const pswRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

    if (
      oldPsw !== null &&
      newPsw !== null &&
      repeatNewPsw !== null &&
      pswRegex.test(oldPsw.value.trim()) &&
      pswRegex.test(newPsw.value.trim()) &&
      newPsw.value.trim() === repeatNewPsw.value.trim()
    ) {
      const data = {
        userId: 1,
        oldPsw: oldPsw.value.trim(),
        newPsw: newPsw.value.trim(),
        repeatNewPsw: repeatNewPsw.value.trim(),
      };

      fetch(configEndpoints.updatePswUserById, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.text())
        .then(updatePswUserByIdData => {
          // updatePswUserByIdData is a text received from url
          if (updatePswUserByIdData === 'Success') {
            succFail.innerHTML = 'Success';
            succFail.style.color = '#00e600';
          } else if (updatePswUserByIdData === 'Error1') {
            succFail.innerHTML = 'Error: The old psw is incorrect';
            succFail.style.color = 'red';
          } else if (updatePswUserByIdData === 'Error2') {
            succFail.innerHTML =
              'Error: Some fields are null or empty or not in the correct format, or the new psw and the new psw conf are not the same';
            succFail.style.color = 'red';
          } else {
            succFail.innerHTML = 'Error';
            succFail.style.color = 'red';
          }
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch(error => {
          // handle errors here
          console.error(error);
          succFail.innerHTML = 'Error';
          succFail.style.color = 'red';
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    } else {
      succFail.innerHTML =
        'Error: Some fields are null or empty or not in the correct format, or the new psw and the new psw conf are not the same';
      succFail.style.color = 'red';
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <>
      <div
        id={props.usersDropDownMenuId}
        ref={ref}
        data-testid="usersDropDownDiv"
      >
        <div id="usersContent" data-testid="usersContent">
          <a onClick={handleClickEditProf}>Edit your profile</a>
          <a onClick={handleClickChangePsw}>Change your password</a>
          <a id="logoutButton">Logout</a>
        </div>
      </div>
    </>
  );
}
