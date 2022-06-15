import { useContext } from "react";
import WatchlistContext from "../../store/watchlist-context";
import Card from "../ui/Card";
import classes from "./AuctionItem.module.css";

function AuctionItem(props) {
  const watchlistCtx = useContext(WatchlistContext);

  const auctionItemOnWatchlist = watchlistCtx.auctionItemInWatchlist(props.id);

  function toggleWatchlistHandler() {
    if (auctionItemOnWatchlist) {
      watchlistCtx.removeFromWatchlist(props.id);
    } else {
      watchlistCtx.addToWatchlist({
        id: props.id,
        key: props.id,
        image: props.image,
        auctionTitle: props.auctionTitle,
        description: props.description,
        price: props.price,
      });
    }
  }

  return (
    <Card>
      <div className={classes.item}>
        <div className={classes.image}>
          <img src={props.image} alt={props.alt}></img>
        </div>
        <div className={classes.content}>
          <h3>{props.auctionTitle}</h3>
          <p>{props.description}</p>
          <h2>Current Auction Price: ${props.price}</h2>
        </div>
        <div className={classes.actions}>
          <ul>
            <li>
              <button className={classes.bid}>Place Bid</button>
            </li>
            <li>
              <button onClick={toggleWatchlistHandler}>{auctionItemOnWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</button>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default AuctionItem;
