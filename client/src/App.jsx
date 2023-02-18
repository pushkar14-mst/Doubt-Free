
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Route, Routes } from "react-router";

import './App.css';
import SearchBox from './Components/SearchBox/SearchBox';
import teacher from './images/teacher.png';
import explore from './images/explore.png'
import learn from './images/learn.png'
import connect from './images/connect.png'
import glass from './images/glass.svg';
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
    <div className='App'>
      <header className='App-header'>
        <Container>
          <Row className='hero-section'>
            <Col lg={6} md={12} sm={12}>

              <div class="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 class="display-1 lh-1 mb-3 d-flex "
                  style={{ fontSize: "80px", fontWeight: "650" }}>
                  Welcome to Doubt-Free
                </h1>
                <p class="lead fw-normal text-muted mb-5">
                  A website for finding and exploring new things.
                </p>
                <input onChange={e => setQuery(e)} onKeyPress={e => handleKey(e)} autoFocus={true} />
                <img className="glass" alt="magnifying glass" src={glass} style={{ width: '30px', height: '30px' }} />
              </div>
            </Col>
            <Col lg={6} md={12} sm={12}>
              <img src={teacher} alt="Teacher Image" style={{ width: '450px', height: '450px' }} />
             </Col>
          </Row>
          <Row className="feature-section">
             <Col lg={4} md={12} sm={12}>
              <img src={explore} alt="Teacher Image" style={{ width: '150px', height: '150px' }} />
               <h2>Find new domains</h2>
               <p>Explore the tech world and discover domains to learn.</p>
             </Col>
             <Col lg={4} md={12} sm={12}>
              <img src={learn} alt="Teacher Image" style={{ width: '150px', height: '150px' }} />
               <h2>Try new things</h2>
               <p>Learn new skills and try new experiences.</p>
             </Col>
             <Col lg={4} md={12} sm={12}>
              <img src={connect} alt="Teacher Image" style={{ width: '150px', height: '150px' }} />
               <h2>Connect with others</h2>
               <p>Find like-minded people and share your experiences.</p>
             </Col>
           </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;