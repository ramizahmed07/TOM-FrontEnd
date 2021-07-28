import { Button } from "antd";
import { FC } from "react";

import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { BtnInterface } from "@/types";

const AddBtn: FC<BtnInterface> = ({ text, callback }) => {
  return (
    <Button
      onClick={callback}
      className="btn btn--add"
      type="primary"
      icon={<PlusIcon />}
      size="large"
    >
      <span>{text}</span>
    </Button>
  );
};

export default AddBtn;
