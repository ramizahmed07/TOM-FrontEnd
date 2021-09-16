import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Row } from "antd";

import "./companyDetails.less";
import UnileverLogo from "@assets/images/unilever-logo.png";
import { useFetchCompanyQuery } from "@services";

const CompanyDetails = () => {
  const { company_id } = useParams<{ company_id: string }>();
  const history = useHistory();
  const { data: companyData, isLoading: isFetchingCompany } =
    useFetchCompanyQuery({ company_id });
  const { data: company } = companyData || {};

  return (
    <div className="companyDetails">
      <Row className="companyDetails__header">
        <div className="companyDetails__header__leftCol">
          <img src={UnileverLogo} alt="Unilever Logo" />
          <div className="companyDetails__header__leftCol__info">
            <div className="main-heading">{company?.name}</div>
            <div className="main-heading">{company?.country?.name}</div>
            <p>{company?.address} </p>
          </div>
        </div>

        <Button
          onClick={() => history.push(`${window.location.pathname}/edit`)}
          type="primary"
        >
          Edit Company Details
        </Button>
      </Row>
      <Row className="companyDetails__row">
        <Col span={24}>
          <div className="sub-heading">Company details</div>
        </Col>

        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">Company Name</div>
            <div className="companyDetails__row__field__value">
              {company?.name}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">Location</div>
            <div className="companyDetails__row__field__value">
              {company?.country?.name}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">Address</div>
            <div className="companyDetails__row__field__value">
              {company?.address}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">Postal Code</div>
            <div className="companyDetails__row__field__value">
              {company?.postal_code}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">Base Currency</div>
            <div className="companyDetails__row__field__value">
              {`${company?.currency?.code} - ${company?.currency?.name}`}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">
              Financial Year
            </div>
            <div className="companyDetails__row__field__value">
              {company?.financial_year}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">
              Stock Tracking ID
            </div>
            <div className="companyDetails__row__field__value">N/A</div>
          </div>
        </div>
      </Row>
      <Row className="companyDetails__row">
        <Col span={24} className="companyDetails__row__col">
          <div className="sub-heading">Contact Person</div>
          <Button type="primary">Edit Details</Button>
        </Col>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">
              Contact Person
            </div>
            <div className="companyDetails__row__field__value">
              {company?.user?.first_name + company?.user?.last_name}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">Country</div>
            <div className="companyDetails__row__field__value">
              {company?.person_country?.name}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">
              Contact Number
            </div>
            <div className="companyDetails__row__field__value">
              {`+${company?.user?.phone_code} ${company?.user?.phone_number}`}
            </div>
          </div>
        </div>
        <div>
          <div className="companyDetails__row__field">
            <div className="companyDetails__row__field__key">Email Address</div>
            <div className="companyDetails__row__field__value">
              {company?.user?.email}
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default CompanyDetails;
