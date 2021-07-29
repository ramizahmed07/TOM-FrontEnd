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
}

const Modal: FC<ModalProps> = ({
  title,
  isVisible,
  footer,
  width = 1092,
  children,
  className,
}) => {
  return (
    <AntModal
      title={<ModalTitle title={title} />}
      centered={true}
      visible={isVisible}
      closable={false}
      className={`modal ${className}`}
      maskClosable={false}
      destroyOnClose={true}
      footer={footer}
      width={width}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
