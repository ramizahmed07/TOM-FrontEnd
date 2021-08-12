import React from "react";

import "./emptyMessage.less";

interface IEmptyMessage {
  img?: string;
  title?: string;
  message?: string;
}

const EmptyMessage: React.FC<IEmptyMessage> = ({
  children,
  img,
  title,
  message,
}) => {
  return (
    <div className="empty">
      <img src={img} alt="message-img" />
      <div className="empty__title">{title}</div>
      <div className="empty__message">{message}</div>
      {children}
    </div>
  );
};

export default EmptyMessage;
