import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as Layouts from "./layouts";
import * as Pages from "./pages";
import "./assets/css/bootstrap.min.css";
import "./assets/css/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts.main />}>
        <Route index element={<Pages.MainPage />} />
      </Route>
    </Routes>
  )
}

export default App
