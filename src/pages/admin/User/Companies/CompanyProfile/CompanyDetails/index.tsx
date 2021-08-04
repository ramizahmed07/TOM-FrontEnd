import React from "react";
import "./companyDetails.less";
import UnileverLogo from "@assets/images/unilever-logo.png";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import RoutePaths from "@/routes/RoutePaths";

const CompanyDetails = () => {
  const history = useHistory();

  return (
    <div className="company__details__container">
      <div className="company__profile_container">
        <div className="company__profile_sub_container">
          <img src={UnileverLogo} alt="Unilever Logo" />
          <div className="company__profile_credentials">
            <h1>UNILEVER</h1>
            <h4>United States of America</h4>
            <p>74 Elizabeth Drive Ridgewood, NJ </p>
          </div>
        </div>

        <Button type="primary" onClick={() => history.push(RoutePaths.User.companyCreate)}>Edit Company Details</Button>
      </div>

      <div className="company__details__section_container">
        <h1>Company Details</h1>

        <div className="company__details_item">
          <p className="company__details_item_heading">Company name</p>
          <p className="company__details_item_value">UNILEVER</p>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Location</p>
          <p className="company__details_item_value">
            United State of America (U.S.A)
          </p>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Address</p>
          <p className="company__details_item_value">
            74 Elizabeth Drive Ridgewood, NJ
          </p>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Postal code</p>
          <p className="company__details_item_value">07450</p>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Country Headquater</p>
          <p className="company__details_item_value">California</p>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Base currency </p>
          <p className="company__details_item_value">($) - Dollar</p>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Financial Year</p>
          <p className="company__details_item_value">
            16th May, 2021 - 13th May, 2022
          </p>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Stock tracking ID</p>
          <p className="company__details_item_value">10982227651110</p>
        </div>
      </div>

      <div className="contact__details__section_container">
        <div className='contact__details__heading_container'>
          <h1>Contact Person</h1>
          <Button type="primary">Edit Details</Button>
        </div>

        <div className="company__details_item">
          <p className="company__details_item_heading">Contact person</p>
          <p className="company__details_item_value">Allen Cole</p>
        </div>
        <div className="company__details_item">
          <p className="company__details_item_heading">Country</p>
          <p className="company__details_item_value">
            U.S.A (United States of America)
          </p>
        </div>
        <div className="company__details_item">
          <p className="company__details_item_heading">Contact number</p>
          <p className="company__details_item_value">+1 209 791 61 88</p>
        </div>
        <div className="company__details_item">
          <p className="company__details_item_heading">Email address</p>
          <p className="company__details_item_value">allen_cole@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
