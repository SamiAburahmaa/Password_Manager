import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const socialMediaPlatforms = ["Facebook", "Twitter", "Instagram", "LinkedIn", "Snapchat", "GitHub"];

  useEffect(() => {
    axios.get('http://localhost:3001/listpasswords').then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = () => {
    axios.post('http://localhost:3001/addpassword', {
      password: password,
      title: title,
    })
    .then((response) => {
      console.log(response.data);
      // Reload the list of passwords after adding a new one
      axios.get('http://localhost:3001/listpasswords').then((response) => {
        setPasswordList(response.data);
      });
    })
    .catch((error) => {
      console.error('There was an error adding the password!', error);
    });
  };

  const decryptPassword = (encryption) => {
    axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          return val.id === encryption.id ? {
                ...val,
                decrypted: response.data, // Store decrypted password
              }
            : val;
        })
      );
    });
  };

  const deletePassword = (id) => {
    console.log(`Attempting to delete password with id: ${id}`); // Log the attempt
    axios.delete(`http://localhost:3001/deletepassword/${id}`)
      .then((response) => {
        console.log(response.data);
        setPasswordList(passwordList.filter((val) => val.id !== id));
      })
      .catch((error) => {
        console.error('There was an error deleting the password!', error);
      });
  };

  return (
    <div className="App">
      <div className="AddPassword">
        <input
          type="text"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <select
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        >
          <option value="">Select Platform</option>
          {socialMediaPlatforms.map((platform, index) => (
            <option key={index} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <button onClick={addPassword}>Add Password</button>
      </div>

      <div className="PasswordsList">
        {passwordList.map((val, key) => {
          return (
            <div
              className="passwordItem"
              key={key}
            >
              <h3 onClick={() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                });
              }}>{val.decrypted ? val.decrypted : val.title}</h3>
              <button onClick={() => deletePassword(val.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
