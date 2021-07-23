import { Button } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

import "./successPopup.less";
import Modal from "../Modal";

interface Props {
  title: string;
  desc: string;
  isVisible: boolean;
  setIsVisible?: Dispatch<SetStateAction<boolean>>;
  callback?: () => void;
}

const SuccessPopup: FC<Props> = ({
  isVisible,
  setIsVisible,
  title,
  desc,
  callback,
}) => {
  return (
    <>
      <span>{title}</span>
      <span>{desc}</span>
      <Button>Done</Button>
    </>
  );
};

export default SuccessPopup;
