import { Button } from "antd";
import { FC } from "react";

import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { btn_inferface } from "@/interfaces";

const AddBtn: FC<btn_inferface> = ({ text, callback }) => {
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
