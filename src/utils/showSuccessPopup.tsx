import { Button, Modal as AntdModal } from "antd";
import CheckLogo from "@assets/images/check.png";

export const showSuccessPopup = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  AntdModal.info({
    className: "success__popup",
    icon: null,
    okButtonProps: { style: { display: "none" } },
    bodyStyle: { textAlign: "center" },
    content: (
      <div>
        <img style={{ marginBottom: 24 }} src={CheckLogo} alt="check" />
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
          {title}
        </div>
        <p style={{ marginBottom: 32, color: "#435465" }}>{desc}</p>
        <Button
          onClick={() => AntdModal.destroyAll()}
          style={{
            height: 40,
            padding: "0px 40px",
            fontWeight: 600,
            fontSize: 16,
          }}
          type="primary"
        >
          Done
        </Button>
      </div>
    ),
  });
};
