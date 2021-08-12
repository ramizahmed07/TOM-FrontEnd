import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";
import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";

type Icon = React.SVGProps<SVGSVGElement>;

interface IIcons {
  download: Icon;
  upload: Icon;
  add: Icon;
}

export interface IButton {
  variant: "download" | "add" | "upload";
  isLoading?: boolean;
}

export const Icons: IIcons = {
  download: <DownloadIcon />,
  upload: <UploadIcon />,
  add: <PlusIcon fill="white" />,
};

export type Variant = keyof IIcons;
