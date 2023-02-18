
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Route, Routes } from "react-router";

import './App.css';

import DoubtPage from "./pages/DoubtPage";
import HomePage from "./pages/HomePage";

function App() {
  const [doubts, setDoubts] = useState([]);
  const getDoubts = async () => {
    await axios.get("http://localhost:5000/get-doubts").then((res) => {
      setDoubts(res.data);
    });
  };

  useEffect(() => {
    getDoubts();
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<HomePage doubts={doubts} />} />
      <Route path="/doubts" />
      <Route path="/doubts/:doubtId" element={<DoubtPage />} />
    </Routes>
  );
}

export default App;