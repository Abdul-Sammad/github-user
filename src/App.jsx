import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import image from "./images/eror.png"

function App() {
  const [inputValue, setInputValue] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState(false);
  const [callApi, setCallApi] = useState(false);



 useEffect(() => {
    axios
      .get(
        `https://api.github.com/users/${inputValue ? inputValue : "Abdul-Sammad"}`
      )
      .then((res) => {
        setUserInfo(res.data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [callApi]);

  const handleForm = (e) => {
    e.preventDefault();
    console.log("inputValue", inputValue);

    if (!inputValue) {
      console.log("filed is empty");
      return;
    }

    setCallApi(!callApi);
     };
  console.log("userInfo", userInfo);
  return(
  
    <>
      <section className="box1">
        <section className="box2">
          <section className="inputBox">
            <form onSubmit={handleForm}>
              <input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                type="text"
                placeholder="Search Username..."
              />
            </form>
          </section>

          {error === false ? (
            <section className="cardWrapper">
              <img src={userInfo ? userInfo.avatar_url : image} alt="" />

              <div className="profileListing">
                <ul>
                  <li>Name: {userInfo ? userInfo.name : "USER NAME"}</li>
                  <li>Bio: {userInfo ? userInfo.bio : "USER BIO "}</li>
                  <li>
                    followers:{" "}
                    {userInfo ? userInfo.followers : "USER followers "}
                  </li>
                  <li>
                    following:{" "}
                    {userInfo ? userInfo.following : "USER following "}
                  </li>
                  <li>
                    Public Repo's:{" "}
                    {userInfo ? userInfo.public_repos : "USER Public Repo's "}
                  </li>
                </ul>
              </div>
            </section>
          ) : (
            <img src={image} />
          )}
        </section>
      </section>
    </>
  )
          }
  
export default App;
