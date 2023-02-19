import "./NavBar.scss";
const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav" style={{ height: "60px" }}>
        <div className="container px-5">
          <a className="navbar-brand fw-bold" href="/home">
            Doubts-Free
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="bi-list"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="#alldoubts">
                  All Doubts
                </a>
              </li>
              <li className="nav-item" >
                <a className="nav-link" href="#askdoubt">
                  Ask Doubts
                </a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
