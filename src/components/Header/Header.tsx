import { Languages } from "../Language/LanguageManager";
import styles from "./Header.module.css";

function Header(props: any) {
  return (
    <>
      <img
        className={styles.lang_btn}
        src="image/flag_eng.png"
        onClick={() => {
          props.switchLanguage(Languages.English);
        }}
      />
      <img
        className={styles.lang_btn}
        src="image/flag_fr.png"
        onClick={() => {
          props.switchLanguage(Languages.French);
        }}
      />
    </>
  );
}

export default Header;
