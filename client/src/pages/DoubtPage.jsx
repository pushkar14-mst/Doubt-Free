import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import NavBar from "../components/UI/NavBar/NavBar";
import { commentsActions } from "../store/doubts-store";

import "./DoubtPage.css";
const DoubtPage = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const [currentCommenter, setCurrentCommenter] = useState("");
  const { doubtId } = useParams();
  const [identifiedDoubt, setIdentifiedDoubt] = useState([]);
  const commenter = useSelector((state) => state.comments.name);
  const finalComment = useSelector((state) => state.comments.comment);
  const commentsDoubt = useSelector((state) => state.comments.doubtId);
  const [allComments, setAllComments] = useState([]);
  //   const [identifiedComments, setIdentifiedComments] = useState([]);
  let identifiedComments = [];
  const dispatch = useDispatch();
  dispatch(
    commentsActions.addComments({
      name: currentCommenter,
      comment: currentComment,
      doubtId,
    })
  );
  const getIdentifiedDoubt = async () => {
    await axios
      .get(`http://localhost:5000/identify-doubt/${doubtId}`)
      .then((res) => {
        setIdentifiedDoubt(res.data);
      });
  };

  const postComment = async () => {
    await axios.post("http://localhost:5000/add-comment", {
      name: commenter,
      comment: finalComment,
      doubtId: commentsDoubt,
    });
  };

  const getComments = async () => {
    await axios.get("http://localhost:5000/get-doubts").then((res) => {
      setAllComments(res.data);
      console.log(res.data);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postComment();
    setCurrentComment("");
    setCurrentCommenter("");
    setIsCommenting(false);
    getComments();
  };
  useEffect(() => {
    getIdentifiedDoubt();
    getComments();
  }, [currentComment]);

  allComments.map((doubts) => {
    if (doubts._id === doubtId) {
      doubts.comments.map((comment) => {
        identifiedComments.push({
          name: comment.name,
          comment: comment.comment,
        });
      });
    }
  });

  return (
    <>
      <NavBar />
      <section className="doubt">
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
      <section className="comments-sections">
        <div className="container my-4">
          <h1>Comments</h1>
          <div className="row">
            <div className="col">
              <div className="m-2">
                {identifiedComments.map((comment) => {
                  return (
                    <div className="row">
                      <div className="comments-box col">
                        <h2>{comment.name}</h2>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  );
                })}

                <button
                  className="btn btn-dark add-comment-btn1"
                  onClick={() => {
                    setIsCommenting(!isCommenting);
                  }}
                >
                  {isCommenting ? "Cancel" : "Add Your Comment"}
                </button>
                {isCommenting && (
                  <div className="comment-form my-2">
                    <form className="form" onSubmit={submitHandler}>
                      <label className="form-label">Enter Your Name:</label>
                      <input
                        className="form-control"
                        type="text"
                        value={currentCommenter}
                        onChange={(e) => {
                          setCurrentCommenter(e.target.value);
                        }}
                      />
                      <label className="form-label">Your Comment</label>
                      <textarea
                        className="form-control"
                        type="text"
                        rows={3}
                        cols={4}
                        value={currentComment}
                        onChange={(e) => {
                          setCurrentComment(e.target.value);
                        }}
                      />
                      <button className="btn add-comment-btn2 my-2">
                        Post Comment
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default DoubtPage;
