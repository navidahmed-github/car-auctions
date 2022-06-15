import { useContext } from "react";
import { Link } from "react-router-dom";
import WatchlistContext from "../../store/watchlist-context";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const watchlistCtx = useContext(WatchlistContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Car Auctions</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Auctions</Link>
          </li>
          <li>
            <Link to="/new-auction">Create new Auction</Link>
          </li>
          <li>
            <Link to="/watch-list">Watchlist</Link>
          </li>
          <div className={classes.badge}>{watchlistCtx.watchlist.length}</div>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
