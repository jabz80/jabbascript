import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as Layouts from "./layouts";
import * as Pages from "./pages";
import "./assets/css/bootstrap.min.css";
import "./assets/css/App.css";
import {AuthProvider} from "../client/contexts/Auth";
import {UserProvider} from "../client/contexts/User";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          <Route element={<Layouts.auth />}>
            <Route path="login" element={<Pages.Login />} />
            <Route path="register" element={<Pages.Register />} />
          </Route>
          <Route path="/" element={<Layouts.main />}>
            <Route index element={<Pages.MainPage />} />
          </Route>
          <Route element={<Layouts.fight />}>
            <Route path="story" element={<Pages.StoryMode />} />
            <Route path="practice" element={<Pages.PracticeMode />} />
            <Route path="multiplayer" element={<Pages.MultiplayerMode />} />
          </Route>
          <Route element={<Layouts.account />}>
            <Route path="account" element={<Pages.AccountPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
