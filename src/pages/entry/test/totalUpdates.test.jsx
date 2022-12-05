import { render, screen } from "../../../testUtils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoop changes", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  // Total starts out 0
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // Update vanilla scoop to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // Update chocolate scoop to 1 and check the subtotal
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when topping changes", async () => {
  const user = userEvent.setup();

  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesTopping);

  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const mmTopping = await screen.findByRole("checkbox", {
    name: "M&M",
  });

  await user.click(mmTopping);

  expect(toppingsSubtotal).toHaveTextContent("3.00");

  await user.click(mmTopping);

  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const grandTotalText = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotalText).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotalText).toHaveTextContent("2.00");

    await user.click(cherriesTopping);

    expect(grandTotalText).toHaveTextContent("3.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const grandTotalText = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesTopping);

    expect(grandTotalText).toHaveTextContent("1.50");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotalText).toHaveTextContent("3.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const grandTotalText = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotalText).toHaveTextContent("2.00");

    await user.clear(vanillaInput);

    expect(grandTotalText).toHaveTextContent("0.00");
  });
});
