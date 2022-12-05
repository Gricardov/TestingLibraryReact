import React from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button
        disabled={totals.scoops <= 0}
        onClick={() => setOrderPhase("review")}
        variant="primary"
      >
        Order summary
      </Button>
    </div>
  );
}
