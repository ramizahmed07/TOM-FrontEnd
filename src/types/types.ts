import { Dispatch, SetStateAction } from "react";

export interface ModalInterface {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
