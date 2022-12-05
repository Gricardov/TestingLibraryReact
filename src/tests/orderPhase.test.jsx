import { render, screen, waitFor } from "@testing-library/react";
import { render as renderWithContext } from "../testUtils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";
import OrderEntry from "../pages/entry/OrderEntry";
import Options from "../pages/entry/Options";

test("order phases for happy path", async () => {
  const user = userEvent.setup();

  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesCheckbox);

  // find and click order button
  const summaryButton = screen.getByRole("button", { name: /order summary/i });
  await user.click(summaryButton);

  // check summary based on OrderDetailsProvider
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsSummary = screen.getByRole("heading", {
    name: /scoops: \$/i,
  });
  expect(scoopsSummary).toHaveTextContent("2.00");

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /términos y condones/i,
  });

  await user.click(tcCheckbox);
  const sendButton = screen.getByRole("button", { name: /enviar/i });
  await user.click(sendButton);

  // confirm order number on confirmation page
  const loadingHeading = screen.getByRole("heading", {
    name: /loading/i,
  });
  expect(loadingHeading).toBeInTheDocument();

  const orderNumberText = await screen.findByRole("heading", {
    name: /your order number is/i,
  });
  expect(orderNumberText).toHaveTextContent("100000");

  const loadingHeadingGone = screen.queryByRole("heading", {
    name: /loading/i,
  });
  expect(loadingHeadingGone).not.toBeInTheDocument();

  // click "Create new order" button on confirmation page
  await user.click(tcCheckbox);
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotal are reset
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});

test("toppings summary not showing in summary if no toppings orderer", async () => {
  const user = userEvent.setup();

  // render app
  render(<App />);

  // add ice cream scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  // find and click order button
  const summaryButton = screen.getByRole("button", { name: /order summary/i });
  await user.click(summaryButton);

  // check summary based on OrderDetailsProvider
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsSummary = screen.getByRole("heading", {
    name: /scoops: \$/i,
  });
  expect(scoopsSummary).toHaveTextContent("2.00");

  const toppingsSummary = screen.queryByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(toppingsSummary).not.toBeInTheDocument();
});

test("toppings summary not showing in summary if toppings orderer and then removed", async () => {
  const user = userEvent.setup();

  // render app
  render(<App />);

  // add ice cream scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  // add toppings
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesCheckbox);

  // remove toppings
  await user.click(cherriesCheckbox);

  // find and click order button
  const summaryButton = screen.getByRole("button", { name: /order summary/i });
  await user.click(summaryButton);

  // check summary based on OrderDetailsProvider
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsSummary = screen.getByRole("heading", {
    name: /scoops: \$/i,
  });
  expect(scoopsSummary).toHaveTextContent("2.00");

  const toppingsSummary = screen.queryByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(toppingsSummary).not.toBeInTheDocument();
});

test("disable submit button if not scoops are selected", async () => {
  // render OrderSummay
  renderWithContext(<OrderEntry setOrderPhase={jest.fn()} />);

  // find and click order button
  const summaryButton = screen.getByRole("button", { name: /order summary/i });
  expect(summaryButton).toBeDisabled();
});

test("disable submit button if scoops are selected and then removed", async () => {
  const user = userEvent.setup();

  // render OrderSummay
  renderWithContext(<OrderEntry setOrderPhase={jest.fn()} />);

  // add scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "0");

  // find and click order button
  const summaryButton = screen.getByRole("button", { name: /order summary/i });
  expect(summaryButton).toBeDisabled();
});

test("check if spinbutton turns red when entered invalid values (negative, +10 or decimals)", async () => {
  const user = userEvent.setup();

  // render OrderSummay
  renderWithContext(<Options optionType="scoops" />);

  // add scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  expect(chocolateInput).not.toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");

  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);

  expect(chocolateInput).not.toHaveClass("is-invalid");

  await user.type(chocolateInput, "11");

  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);

  expect(chocolateInput).not.toHaveClass("is-invalid");

  await user.type(chocolateInput, "1.5");

  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(chocolateInput).not.toHaveClass("is-invalid");
});

test("dont update subtotals and totals if scoop value is invalid (negative, +10 or decimals)", async () => {
  const user = userEvent.setup();

  // render OrderSummay
  renderWithContext(<Options optionType="scoops" />);

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  const scoopsSummary = screen.getByText("scoops total: $", { exact: false });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  expect(scoopsSummary).toHaveTextContent("2.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");

  expect(scoopsSummary).toHaveTextContent("0.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSummary).toHaveTextContent("4.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "11");

  expect(scoopsSummary).toHaveTextContent("0.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "3");

  expect(scoopsSummary).toHaveTextContent("6.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1.5");

  expect(scoopsSummary).toHaveTextContent("0.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "4");

  expect(scoopsSummary).toHaveTextContent("8.00");
});
