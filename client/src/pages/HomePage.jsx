import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/UI/NavBar/NavBar";
import SearchBox from "../components/SearchBox/SearchBox";
import { doubtsActions } from "../store/doubts-store";
import "./HomePage.css";
import axios from "axios";

import teacher from "../images/teacher.png";
import explore from "../images/explore.png";
import learn from "../images/learn.png";
import connect from "../images/connect.png";
import glass from "../images/glass.svg";
import { Container, Col, Row } from "react-bootstrap";

import DoubtBox from "../Components/UI/DoubtBox/DoubtBox";

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
      <section id="home">
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
                style={{ width: "380px", height: "380px" }}
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

      <section id="askdoubt">
        <div className="container contact-form">
          <div className="contact-image">
            <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
          </div>
          <form className="form" onSubmit={submitHandler}>
            <h3>Post your doubt in this space</h3>
            <div className="row">
              <div className="col-md-6 ">
                <div className="form-group m-2">
                  <input type="text" className="form-control" placeholder="Your Name *" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group m-2">
                  <input type="text" className="form-control" placeholder="Your doubt in short? *" value={doubtTitle} onChange={(e) => setDoubtTitle(e.target.value)} />
                </div>
                <div className="form-group m-2">
                  <input type="text" className="form-control" placeholder="Enter category *" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <textarea className="form-control m-2" placeholder="Description of your doubt *" style={{ width: '100%', height: '130px' }} value={doubt}
                    onChange={(e) => setDoubt(e.target.value)}></textarea>
                </div>
              </div>
              <div className="form-group" >
                <br></br>
                <button className="btn btn-secondary m-2">
                  Post Your Doubt
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="alldoubts" id="alldoubts">
        <div className="container">
          <h1>Latest Doubts</h1>
          <div className="row" >
            {props.doubts.slice(0, 5).map((doubts) => {
              return (
                <>
                  <DoubtBox id={doubts._id} doubtTitle={doubts.doubtTitle} doubtAuthor={doubts.name}/>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
