import { Dispatch, SetStateAction } from "react";

export interface ModalInterface {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export interface BtnInterface {
  text: string;
  callback: () => void;
}
