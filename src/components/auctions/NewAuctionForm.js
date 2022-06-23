import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Card from "../ui/Card";
import classes from "./NewAuctionForm.module.css";

function NewAuctionForm() {
  const [val, setVal] = useState();
  const history = useNavigate();

  const carModelInputRef = useRef();
  const carImageInputRef = useRef();
  const carDspInputRef = useRef();
  const startPriceRef = useRef();

  function validateHandler(e) {
    setVal((v) =>
      e.target.validity.valid || e.target.value === "" ? e.target.value : v
    );
  }

  function addAuctionHandler(e) {
    e.preventDefault();

    const inputCarModel = carModelInputRef.current.value;
    const inputCarImage = carImageInputRef.current.value;
    const inputCarDsp = carDspInputRef.current.value;
    const inputPrice = startPriceRef.current.value;

    const auctionItemData = {
      image: inputCarImage,
      auctionTitle: inputCarModel,
      description: inputCarDsp,
      price: inputPrice,
    };

    fetch(
      "https://car-auctions-dcddb-default-rtdb.firebaseio.com/auctionItems.json",
      {
        method: "POST",
        body: JSON.stringify(auctionItemData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      history("/", { replace: true });
    });
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={addAuctionHandler}>
        <div className={classes.control}>
          <label htmlFor="carModel">Car Model:</label>
          <input
            type="text"
            id="carModel"
            required
            name="carModel"
            ref={carModelInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="carImg">Link to Car Image:</label>
          <input
            type="text"
            id="carImg"
            required
            name="carImg"
            ref={carImageInputRef}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="carDescription">Car Description:</label>
          <textarea
            id="carDescription"
            required
            rows="5"
            ref={carDspInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="carStartPrice">Starting Auction Price:</label>
          <input
            type="int"
            id="carStartPrice"
            required
            name="carStartPrice"
            ref={startPriceRef}
            pattern="[1-9][0-9]*"
            value={val}
            onChange={validateHandler}
          ></input>
        </div>
        <div className={classes.actions}>
          <button>Add Car Auction</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </Card>
  );
}

export default NewAuctionForm;
