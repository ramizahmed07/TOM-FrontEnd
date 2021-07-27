import { Dispatch, SetStateAction } from "react";

export interface modal_interface {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export interface btn_inferface {
  text: string;
  callback: () => void;
}
