import { Dispatch, SetStateAction } from "react";

export interface IModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
