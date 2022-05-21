import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { gameStatus } from "../../Mastermind.component";

const ModaleEndGame: FC<{
  gameStatus: gameStatus;
}> = (props) => {
  console.log("Render Modal");

  const [openned, setOpenned] = useState(false);

  useEffect(() => {
    setOpenned(props.gameStatus != gameStatus.inProgress);
  }, [props.gameStatus]);

  return (
    <Modal
      isOpen={openned}
      onRequestClose={() => {
        setOpenned(false);
      }}
    >
      <p>Modal Content</p>
    </Modal>
  );
};

export default ModaleEndGame;
