import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Demineur from ".";

describe("<Demineur />", () => {
  describe("When its initialize", () => {
    it("evry square should be close", () => {
      let width = 10;
      let container = render(<Demineur width={width} nmbBomb={20} />);
      let demineur = screen.getByTestId("demineur") as HTMLDivElement;

      expect(demineur.getElementsByClassName("squareclose").length).toBe(
        width * width
      );
    });
  });
  describe("When a square is clicked", () => {
    it("the square shuld be revealed", () => {
      let container = render(<Demineur width={10} nmbBomb={20} />);
      let demineur = screen.getByTestId("demineur") as HTMLDivElement;
      let firstSquare = demineur.getElementsByClassName("squareclose")[0];
      fireEvent.click(firstSquare);
      expect(!firstSquare.classList.contains("squareclose"));
    });
  });
});
