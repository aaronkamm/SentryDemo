import { NavLink } from 'react-router-dom';
import './Toolbar.css';
function Toolbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink className="navbar-link" to="/">
          Report Export
        </NavLink>
        <NavLink className="navbar-link" to="/book-list">
          BookList
        </NavLink>
      </div>
    </nav>
  );
}
export default Toolbar;
