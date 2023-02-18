import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/UI/NavBar/NavBar";
import SearchBox from "../components/SearchBox/SearchBox";
import { doubtsActions } from "../store/doubts-store";
import "./HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom";

import teacher from "../images/teacher.png";
import explore from "../images/explore.png";
import learn from "../images/learn.png";
import connect from "../images/connect.png";
import glass from "../images/glass.svg";
import { Container, Col, Row } from "react-bootstrap";

const HomePage = (props) => {
  const [name, setName] = useState("");
  const [doubtTitle, setDoubtTitle] = useState("");
  const [category, setCategory] = useState("");
  const [doubt, setDoubt] = useState("");
  const dispatch = useDispatch();
  const getName = useSelector((state) => state.doubts.name);
  const getTitle = useSelector((state) => state.doubts.doubtTitle);
  const getCategory = useSelector((state) => state.doubts.doubtCategory);
  const getDoubt = useSelector((state) => state.doubts.doubt);
  console.log(getName);
  dispatch(doubtsActions.addDoubt({ name, doubtTitle, category, doubt }));
  const addDoubt = async () => {
    await axios.post("http://localhost:5000/add-doubt", {
      name: getName,
      title: getTitle,
      category: getCategory,
      doubt: getDoubt,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addDoubt();
    setName("");
    setCategory("");
    setDoubt("");
    setDoubtTitle("");
  };

  return (
    <>
      <NavBar />
      <section>
        <Container>
          <Row className="hero-section">
            <Col lg={6} md={12} sm={12}>
              <div class="mb-5 mb-lg-0 text-center text-lg-start">
                <h1
                  class="display-1 lh-1 mb-3 d-flex "
                  style={{ fontSize: "80px", fontWeight: "650" }}
                >
                  Welcome to Doubt-Free
                </h1>
                <p class="lead fw-normal text-muted mb-5">
                  A website for finding and exploring new things.
                </p>
                <input
                  onChange={(e) => setQuery(e)}
                  onKeyPress={(e) => handleKey(e)}
                  autoFocus={true}
                />
                <img
                  className="glass"
                  alt="magnifying glass"
                  src={glass}
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            </Col>
            <Col lg={6} md={12} sm={12}>
              <img
                src={teacher}
                alt="Teacher Image"
                style={{ width: "450px", height: "450px" }}
              />
            </Col>
          </Row>
          <Row className="feature-section">
            <Col lg={4} md={12} sm={12}>
              <img
                src={explore}
                alt="Teacher Image"
                style={{ width: "150px", height: "150px" }}
              />
              <h2>Find new domains</h2>
              <p>Explore the tech world and discover domains to learn.</p>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <img
                src={learn}
                alt="Teacher Image"
                style={{ width: "150px", height: "150px" }}
              />
              <h2>Try new things</h2>
              <p>Learn new skills and try new experiences.</p>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <img
                src={connect}
                alt="Teacher Image"
                style={{ width: "150px", height: "150px" }}
              />
              <h2>Connect with others</h2>
              <p>Find like-minded people and share your experiences.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="add-your-doubt">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Ask your doubt in this space</h1>
              <div className="doubt-form">
                <form className="form" onSubmit={submitHandler}>
                  <label className="form-label">Enter Your Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="form-label">Your Doubt Title</label>
                  <input
                    className="form-control"
                    type="text"
                    value={doubtTitle}
                    onChange={(e) => setDoubtTitle(e.target.value)}
                  />
                  <label className="form-label">Enter category</label>
                  <input
                    className="form-control"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="form-label">Your Doubt</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    cols="4"
                    value={doubt}
                    onChange={(e) => setDoubt(e.target.value)}
                  />

                  <button className="btn btn-secondary m-3">
                    Post Your Doubt
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="latest-doubts mt-3">
        <h1>Latest Doubts</h1>
        <div className="container">
          <div className="row">
            {props.doubts.slice(0, 10).map((doubts) => {
              return (
                <div className="col-lg-12 doubt-card">
                  <Link to={`/doubts/${doubts._id}`}>
                    <h2>{doubts.doubtTitle}</h2>
                  </Link>
                  <h4>asked by {doubts.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
