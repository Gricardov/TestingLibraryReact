import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "Acepto los términos y condones",
  });
  expect(checkbox).not.toBeChecked();
});

test("checking checkbox enables button on first click and disables it on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "Acepto los términos y condones",
  });
  const button = screen.getByRole("button", {
    name: "Enviar",
  });

  await user.click(checkbox);

  expect(button).toBeEnabled();

  await user.click(checkbox);

  expect(button).toBeDisabled();
});

test("popover response to hover", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const nullPopover = screen.queryByText(/Este es un sistema de prueba!/i);
  expect(nullPopover).not.toBeInTheDocument();

  const tcLabel = screen.getByText(/términos y condones/i);
  await user.hover(tcLabel);

  const popover = screen.getByText(/Este es un sistema de prueba!/i);
  expect(popover).toBeInTheDocument();

  await user.unhover(tcLabel);
  expect(popover).not.toBeInTheDocument();
});
