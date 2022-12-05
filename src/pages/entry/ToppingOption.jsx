import React, { useContext } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";

export default function ToppingOption({ name, imagePath }) {
  const { optionCounts, updateItemCount } = useOrderDetails();

  const handleChange = (e) => {
    updateItemCount(name, optionCounts.toppings[name] ? 0 : 1, "toppings");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-topping-checkbox`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Check
            type="checkbox"
            defaultChecked={false}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
