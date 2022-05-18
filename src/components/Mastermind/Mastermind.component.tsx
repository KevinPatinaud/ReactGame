import { FC } from "react";
import "./Mastermind.module.css";
import ColorSelector from "./Component/ColorSelectorComponent/ColorSelector.component";

const Mastermind: FC = () => {
  return (
    <>
      <div>Mastermind</div>
      <ColorSelector />
    </>
  );
};

export default Mastermind;
