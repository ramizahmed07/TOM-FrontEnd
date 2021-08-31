import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";
import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";

type Icon = React.SVGProps<SVGSVGElement>;

interface IIcons {
  download: Icon;
  upload: Icon;
  add: Icon;
  download_client: Icon;
  upload_client: Icon;
}

export interface IButton {
  variant: "download" | "add" | "upload" | "download_client" | "upload_client";
  isLoading?: boolean;
}

export const Icons: IIcons = {
  download: <DownloadIcon fill="#23A7D0" />,
  upload: <UploadIcon />,
  add: <PlusIcon fill="white" />,
  download_client: <DownloadIcon fill="white" />,
  upload_client: <UploadIcon />,
};

export type Variant = keyof IIcons;
