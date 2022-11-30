import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((e) => e.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
