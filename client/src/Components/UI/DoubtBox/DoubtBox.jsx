import quote from "./quotes.png"
import "./DoubtBox.css"
import { Link } from "react-router-dom";

const DoubtBox = (props) => {
    return(
        <>
            <section className="py-2">
                <div className="container">

                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                            <div className="blockquote-custom-icon shadow-sm"><img src={quote} style={{height:"40px", width:"40px"}}/></div>
                                    <Link to={`/doubts/${props.id}`}>
                                        <p className="mb-0 mt-2 font-italic">{props.doubtTitle}</p>
                                    </Link>
                            <footer className="blockquote-footer pt-4 mt-4 border-top">
                            <cite title="Source Title">{props.doubtAuthor}</cite>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
};

export default DoubtBox;