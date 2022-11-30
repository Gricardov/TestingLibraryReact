import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function SummaryForm() {
  const [accepts, setAccepts] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>Este es un sistema de prueba!</Popover.Body>
    </Popover>
  );

  const handleSubmit = () => {};

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={accepts}
            onChange={() => setAccepts(!accepts)}
            label={
              <span>
                Acepto los
                <OverlayTrigger placement="right" overlay={popover}>
                  <span style={{ color: "blue" }}> términos y condones</span>
                </OverlayTrigger>
              </span>
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!accepts}>
          Enviar
        </Button>
      </Form>
    </>
  );
}

export default SummaryForm;
