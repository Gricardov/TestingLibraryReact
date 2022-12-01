import { render, screen } from "@testing-library/react";
import { text } from "express";
import Options from "../Options";

test("displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((e) => e.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

text("displays image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altTexts = toppingImages.map((e) => e.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&M topping",
    "Hot fudge topping",
  ]);
});
