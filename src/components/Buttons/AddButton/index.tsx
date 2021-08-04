import { Button } from "antd";
import { FC } from "react";

import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";

const AddBtn: FC<React.HTMLProps<HTMLButtonElement>> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="btn btn--add"
      type="primary"
      icon={<PlusIcon fill="white" />}
      size="large"
    >
      <span>{children}</span>
    </Button>
  );
};

export default AddBtn;
