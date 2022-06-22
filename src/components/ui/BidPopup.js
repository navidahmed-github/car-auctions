import { useRef, useContext } from "react";
import Popup from "reactjs-popup";
import classes from "./BidPopup.module.css";
import WatchlistContext from "../../store/watchlist-context";

function BidPopup(props) {
  const addToPriceRef = useRef();
  const watchlistCtx = useContext(WatchlistContext);

  function addToAuctionPriceHandler(e) {
    e.preventDefault();
    const addValue = addToPriceRef.current.value;

    const auctionItemOnWatchlist = watchlistCtx.auctionItemInWatchlist(
      props.itemId
    );

    fetch(
      "https://car-auctions-dcddb-default-rtdb.firebaseio.com/auctionItems.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let auctionItem = [];
        let updatedItem = [];
        for (const key in data) {
          if (key === props.itemId) {
            auctionItem = {
              id: key,
              ...data[key],
            };
            updatedItem = auctionItem;
            const newPrice =
              parseInt(auctionItem.price, 10) + parseInt(addValue, 10);
            updatedItem.price = newPrice;
          }
        }

        const auctionItemData = {
          image: updatedItem.image,
          auctionTitle: updatedItem.auctionTitle,
          description: updatedItem.description,
          price: updatedItem.price,
        };

        fetch(
          `https://car-auctions-dcddb-default-rtdb.firebaseio.com/auctionItems/${props.itemId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(auctionItemData),
            header: { "Content-Type": "application/json" },
          }
        );
        if (auctionItemOnWatchlist) {
          watchlistCtx.removeFromWatchlist(props.itemId);
          watchlistCtx.addToWatchlist({
            id: props.itemId,
            key: props.itemId,
            image: updatedItem.image,
            auctionTitle: updatedItem.auctionTitle,
            description: updatedItem.description,
            price: updatedItem.price,
          });
        }
      });
  }

  return (
    <Popup
      trigger={<button className="classes"> Place Bid </button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className={classes.close} onClick={close}>
            &times;
          </button>
          <div className="header">
            {" "}
            <h2>Place Bid</h2>{" "}
          </div>
          <form className="content" onSubmit={addToAuctionPriceHandler}>
            <div className={classes.control}>
              <label htmlFor="priceAddToAuctionP">
                <p>Enter amount to add to current auction price:</p>
              </label>
              <input
                type="text"
                id="priceAddToAuctionP"
                required
                name="priceAddToAuctionP"
                ref={addToPriceRef}
                className={classes.input}
              ></input>
            </div>
            <div className={classes.actions}>
              <button>Submit Bid</button>
              <button
                type="reset"
                onClick={() => {
                  close();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default BidPopup;
