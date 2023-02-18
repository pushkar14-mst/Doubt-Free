import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/UI/NavBar/NavBar";

import "./DoubtPage.css";
const DoubtPage = () => {
  const { doubtId } = useParams();
  const [identifiedDoubt, setIdentifiedDoubt] = useState([]);
  console.log(doubtId);
  const getIdentifiedDoubt = async () => {
    await axios
      .get(`http://localhost:5000/identify-doubt/${doubtId}`)
      .then((res) => {
        setIdentifiedDoubt(res.data);
      });
  };
  useEffect(() => {
    getIdentifiedDoubt();
  }, []);
  return (
    <>
      <NavBar />
      <section className="doubt-page">
        <div className="container">
          <div className="row">
            <div className="col">
              {identifiedDoubt.map((doubt) => {
                return (
                  <>
                    <h1>{doubt.doubtTitle}</h1>
                    <h5>By {doubt.name}</h5>
                    <div className="doubt-description">
                      <p>{doubt.doubt}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default DoubtPage;
