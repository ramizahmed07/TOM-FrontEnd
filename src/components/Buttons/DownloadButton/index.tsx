import { Button } from "antd";
import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";
import { BtnInterface } from "@/types";

const DownloadBtn: React.FC<BtnInterface> = ({ text, callback }) => {
  return (
    <Button
      onClick={callback}
      className="btn btn--download"
      icon={<DownloadIcon />}
      size="large"
    >
      <span>{text}</span>
    </Button>
  );
};

export default DownloadBtn;
