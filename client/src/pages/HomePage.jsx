import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/UI/NavBar/NavBar";
import { doubtsActions } from "../store/doubts-store";
import "./HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom";
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
