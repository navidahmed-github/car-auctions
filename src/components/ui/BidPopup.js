import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import classes from "./BidPopup.module.css";

function BidPopup(props) {
  const history = useNavigate();
  const addToPriceRef = useRef();

  function addToAuctionPriceHandler(e) {
    e.preventDefault();

    const addValue = addToPriceRef.current.value;

    fetch(
      "https://car-auctions-dcddb-default-rtdb.firebaseio.com/auctionItems.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let auctionItem = [];
        let auctionItems = [];
        let updatedItem = [];
        for (const key in data) {
          if (key === props.key) {
            auctionItem = {
              id: key,
              ...data[key],
            };
            updatedItem = auctionItem;
            const newPrice = auctionItem.price + addValue;
            updatedItem.price = newPrice;
          }
        }
        auctionItems.push(updatedItem);
        auctionItems.filter(
          (auctionDeleteItem) => auctionDeleteItem.id !== auctionItem.id
        );
      })
      .then(() => {
        history("/", { replace: true });
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
          <div className="header"> Place Bid </div>
          <form className="content" onSubmit={addToAuctionPriceHandler}>
            <div className={classes.control}>
              <label htmlFor="priceAddToAuctionP">
                Enter amount to add to current auction price:
              </label>
              <input
                type="text"
                id="priceAddToAuctionP"
                required
                name="priceAddToAuctionP"
                ref={addToPriceRef}
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
