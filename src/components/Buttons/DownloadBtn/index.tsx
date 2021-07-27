import { Button } from "antd";
import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";
import { btn_inferface } from "@/interfaces";

const DownloadBtn: React.FC<btn_inferface> = ({ text, callback }) => {
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
