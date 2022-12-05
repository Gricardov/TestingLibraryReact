import React from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { isScoopQuantityInvalid } from "../../utilities";

export default function ScoopOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    const invalid = isScoopQuantityInvalid(value);
    setIsValid(!invalid);
    updateItemCount(name, invalid ? 0 : value, "scoops");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
        <Form.Control.Feedback type="invalid">
          Please provide a valid value
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
}
