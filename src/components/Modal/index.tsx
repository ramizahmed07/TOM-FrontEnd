import { FC, ReactElement } from "react";
import AntModal from "antd/lib/modal/Modal";

import "./modal.less";

const ModalTitle: FC<{ title: string }> = ({ title }) => {
  return <div className="sub-heading">{title}</div>;
};

interface ModalProps {
  title: string;
  isVisible: boolean;
  footer: null | ReactElement | ReactElement[];
  children: React.ReactNode;
  width?: number;
  className?: string;
  mode?: "versions" | "standard";
  setIsVisible?: any;
}

const Modal: FC<ModalProps> = ({
  title,
  isVisible,
  footer,
  width = 1092,
  children,
  className,
  setIsVisible,
  mode = "standard",
}) => {
  return (
    <AntModal
      title={<ModalTitle title={title} />}
      centered={true}
      visible={isVisible}
      closable={false}
      onCancel={() => setIsVisible(false)}
      className={`modal ${className} ${
        mode === "versions" && "modal--versions"
      }`}
      maskClosable={mode === "versions"}
      destroyOnClose={true}
      footer={footer}
      width={width}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
