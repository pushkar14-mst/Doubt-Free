import "./NavBar.css";
const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark px-2">
        <span className="navbar-brand mb-0 h1">Doubt Free</span>
        <ul className="navbar-nav" id="navbar-ul">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              All Doubts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Ask Doubts
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default NavBar;
