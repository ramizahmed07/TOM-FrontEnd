import { Col, Row } from "antd";
import { useState } from "react";

import "./addOffer.less";
import CandidateDetails from "./CandidateDetails";
import OfferedPositionDetails from "./OfferedPositionDetails";

const components: any = ({ step, setStep }: any) => ({
  1: <OfferedPositionDetails setStep={setStep} />,
  2: <CandidateDetails setStep={setStep} />,
});

const AddOffer = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="offers">
      <Row>
        <Col span={24}>
          <div className="main-heading">Create Offer</div>
        </Col>
      </Row>
      <Row className="mt-32 offers__steps">
        <div
          className={`offers__steps__step ${
            step >= 1 && "offers__steps__step--active"
          }`}
        >
          <div className="offers__steps__step__circle">
            <span className="offers__steps__step__circle__num">1</span>
          </div>
          <div className="offers__steps__step__title">
            Offer
            <br /> Details
          </div>
          <div
            className={`offers__steps__step__border ${
              step >= 2 && "offers__steps__step__border--active"
            }`}
          />
        </div>
        <div
          className={`offers__steps__step  ${
            step >= 2 && "offers__steps__step--active"
          }`}
        >
          <div className="offers__steps__step__circle">
            <span className="offers__steps__step__circle__num">2</span>
          </div>
          <div className="offers__steps__step__title">
            Candidate
            <br /> Details
          </div>
          <div
            className={`offers__steps__step__border ${
              step === 3 && "offers__steps__step__border--active"
            }`}
          />
        </div>
        <div
          className={`offers__steps__step  ${
            step === 3 && "offers__steps__step--active"
          }`}
        >
          <div className="offers__steps__step__circle">
            <span className="offers__steps__step__circle__num">3</span>
          </div>
          <div className="offers__steps__step__title">
            Salary Offer
            <br /> Modeller
          </div>
        </div>
      </Row>
      <div className="offers__form mt-32">
        {components({ step, setStep })[step]}
      </div>
    </div>
  );
};

export default AddOffer;
