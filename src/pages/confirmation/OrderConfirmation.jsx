import React, { useState, useEffect } from "react";
import AlertBanner from "../common/AlertBanner";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();

  const [orderNumber, setOrderNumber] = useState(null);
  const [loadingOrderNumber, setLoadingOrderNumber] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoadingOrderNumber(true);
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
        setLoadingOrderNumber(false);
      })
      .catch((error) => {
        setError(true);
        setLoadingOrderNumber(false);
      });
  }, []);

  if (error) {
    return <AlertBanner message="An error ocurred while fetching the data" />;
  }

  return (
    <div>
      {loadingOrderNumber ? (
        <h1>Loading...</h1>
      ) : (
        orderNumber && (
          <>
            <h1>Thanks for your purchase!</h1>
            <h2>Your order number is {orderNumber}</h2>
          </>
        )
      )}
      <Button
        onClick={() => {
          resetOrder();
          setOrderPhase("inProgress");
        }}
        variant="primary"
      >
        Create new order
      </Button>
    </div>
  );
}
