import { FC } from "react";
import style from "./ColorSelected.module.css";

const ColorSelected: FC<{ colors: String[] }> = (props) => {
  return (
    <div>
      {props.colors.map((color: String) => {
        return (
          <div
            className={style.ColorSelected}
            style={{
              backgroundColor: color.valueOf(),
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default ColorSelected;
