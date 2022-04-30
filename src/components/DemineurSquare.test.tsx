import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DemineurSquare from "./DemineurSquare";

describe("<DemineurSquare />", () => {
  describe("When a square is initialize", () => {
    it("should be closed", () => {
      const { container } = render(
        <DemineurSquare
          index={12}
          boardWidth={10}
          haveBomb={false}
          numberOfBombNext={5}
          revealed={false}
          revealFunct={() => {}}
          flagged={false}
          switchFlag={() => {}}
        />
      );
      expect(container.classList.contains("squareclose"));
    });
  });
  describe("When a square is flagged", () => {
    it("should be flagged", () => {
      const { container } = render(
        <DemineurSquare
          index={12}
          boardWidth={10}
          haveBomb={false}
          numberOfBombNext={5}
          revealed={false}
          revealFunct={() => {}}
          flagged={false}
          switchFlag={() => {}}
        />
      );
      expect(container.classList.contains("squareFlagged"));
    });
  });
  describe("When a square is left clicked", () => {
    it("should be execute reveal function", () => {
      const revealFunct = jest.fn();
      const { container } = render(
        <DemineurSquare
          index={12}
          boardWidth={10}
          haveBomb={false}
          numberOfBombNext={5}
          revealed={false}
          revealFunct={revealFunct}
          flagged={false}
          switchFlag={() => {}}
        />
      );

      fireEvent.click(screen.getByTestId("square-btn-12"));

      expect(revealFunct).toHaveBeenCalled();
    });
  });
  describe("When a square is right clicked", () => {
    it("should be execute reveal function", () => {
      const switchFlagFunct = jest.fn();
      const { container } = render(
        <DemineurSquare
          index={12}
          boardWidth={10}
          haveBomb={false}
          numberOfBombNext={5}
          revealed={false}
          revealFunct={() => {}}
          flagged={false}
          switchFlag={switchFlagFunct}
        />
      );

      fireEvent.contextMenu(screen.getByTestId("square-btn-12"));

      expect(switchFlagFunct).toHaveBeenCalled();
    });
  });
});
