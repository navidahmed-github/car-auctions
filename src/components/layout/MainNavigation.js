import { Link } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
      <div>React Auctions</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Auctions</Link>
          </li>
          <li>
            <Link to="/new-auction">Create new Auction</Link>
          </li>
          <li>
            <Link to="/watch-list">Watch List</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
