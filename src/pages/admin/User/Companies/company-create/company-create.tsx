import React from "react";
import Layout from "@/components/Layout";
import {
  Col,
  Row,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import { GoLocation } from "react-icons/go";
import "./style.less";

import ImgUpload from "@assets/images/img-upload.png";

const CompanyCreate = () => {
  return (
    <>
      <Layout>
        <Row>
          <Col span={24} className="container">
            <h1 className="form_heading">Create new company</h1>
            <Form
              name="login"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={() => {}}
              layout="vertical"
              className="create__company__container"
            >
              <div className="basic__information_container">
                <h1 className="section__heading basic_information_section_heading">
                  Basic information
                </h1>
                <div className="form__section">
                  <div className="form__section_container">
                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">Company name</label>
                      }
                      name="company_name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter company name",
                        },
                      ]}
                    >
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter company name here..."
                      />
                    </Form.Item>

                    <Form.Item
                      className="form__item"
                      label={<label className="input__label">Location</label>}
                      name="location"
                      rules={[
                        { required: true, message: "Please enter location" },
                      ]}
                    >
                      <Select placeholder="Enter company location here...">
                        <Option value="khi">Karachi</Option>
                        <Option value="lhr">Lahore</Option>
                        <Option value="isl">Islamabad</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="form__item"
                      label={<label className="input__label">Address</label>}
                      name="address"
                      rules={[
                        { required: true, message: "Please enter address" },
                      ]}
                    >
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter company address here..."
                        suffix={
                          // <Tooltip title="Extra information">
                          <GoLocation style={{ color: "rgba(0,0,0,.45)" }} />
                          // </Tooltip>
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">Postal code</label>
                      }
                      name="address"
                      rules={[
                        { required: true, message: "Please enter postal code" },
                      ]}
                    >
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter postal code here..."
                      />
                    </Form.Item>
                  </div>
                  <div className="form__section_upload">
                    <div className="form__section_upload_container">
                      <Upload>
                        <img src={ImgUpload} alt="avatar" />
                      </Upload>
                      <p className="img_description_text">UPLOAD LARGE LOGO</p>
                      <p className="img_description_size">1000 x 1000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="corporate__information_container">
                <h1 className="section__heading">Corporate Information</h1>
                <div className="form__section">
                  <div className="form__section_container">
                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">
                          Country Headquater{" "}
                        </label>
                      }
                      name="country_headquater"
                      rules={[
                        {
                          required: true,
                          message: "Please enter country headquater",
                        },
                      ]}
                    >
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter name of headquater"
                      />
                    </Form.Item>

                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">Base Currency</label>
                      }
                      name="base_currency"
                      rules={[
                        {
                          required: true,
                          message: "Please enter base currency",
                        },
                      ]}
                    >
                      <Select placeholder="Select base base currency">
                        <Option value="AED">AED</Option>
                        <Option value="GBB">GBB</Option>
                        <Option value="GBB">GBB</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="form__item "
                      label={
                        <label className="input__label">Financial Year</label>
                      }
                      name="financial_year"
                      rules={[
                        {
                          required: true,
                          message: "Please enter financial year",
                        },
                      ]}
                    >
                      <div className="financial_year_container">
                        <DatePicker
                          className="datepicker__container"
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                        {" - "}
                        <DatePicker
                          className="datepicker__container"
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                      </div>
                    </Form.Item>

                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">
                          Stock tracking ID
                        </label>
                      }
                      name="stock_tracking_id"
                      rules={[
                        {
                          required: true,
                          message: "Please enter stock tracking id",
                        },
                      ]}
                    >
                      <div className="stock_tracking_id__container">
                        <Input
                          className="form__input"
                          type="text"
                          placeholder="Enter stock ID here..."
                        />
                        <Button
                          type="primary"
                          // htmlType="submit"
                          // disabled={false}
                          size="large"
                          onClick={() => {
                            console.log("Create Company");
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Form.Item>
                  </div>

                  <div className="form__section_upload">
                    <div className="form__section_upload_container">
                      <Upload>
                        <img src={ImgUpload} alt="avatar" />
                      </Upload>
                      <p className="img_description_text">UPLOAD SMALL LOGO</p>
                      <p className="img_description_size">260 x 260</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contract_details_container">
                <h1 className="section__heading">Contract Details</h1>
                <div className="form__section">
                  <div className="form__section_container">
                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">
                          Contract Duration
                        </label>
                      }
                      name="contract_duration"
                      rules={[
                        {
                          required: true,
                          message: "Please enter contract duration",
                        },
                      ]}
                    >
                      <div className="contract__details_year_container">
                        <DatePicker
                          className="datepicker__container"
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                        {" - "}
                        <DatePicker
                          className="datepicker__container"
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="contract_details_container">
                <h1 className="section__heading">Contact person details</h1>
                <div className="form__section">
                  <div className="form__section_container">
                    <div className="contact__person__sub_container">
                      <Form.Item
                        className="form__item contact__person_item "
                        label={
                          <label className="input__label">Contact person</label>
                        }
                        name="contact_person"
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact person",
                          },
                        ]}
                      >
                        <Input
                          className="form__input"
                          type="text"
                          placeholder="Enter name of contact person..."
                        />
                      </Form.Item>

                      <Form.Item
                        className="form__item contact__person_item"
                        label={
                          <label className="input__label">
                            Contact person’s country
                          </label>
                        }
                        name="contact_person_country"
                        rules={[
                          {
                            required: true,
                            message: "Please select contact person country",
                          },
                        ]}
                      >
                        <Select placeholder="Select country from here...">
                          <Option value="pk">Pakistan</Option>
                          <Option value="uae">UAE</Option>
                          <Option value="china">China</Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div className="contact__person__sub_container">
                      <Form.Item
                        className="form__item contact__person_item "
                        label={
                          <label className="input__label">Contact number</label>
                        }
                        name="contact_number"
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact number",
                          },
                        ]}
                      >
                        <Input
                          className="form__input"
                          type="text"
                          placeholder="Enter name of contact number..."
                        />
                      </Form.Item>

                      <Form.Item
                        className="form__item contact__person_item"
                        label={
                          <label className="input__label">Email address</label>
                        }
                        name="email_address"
                        rules={[
                          {
                            required: true,
                            message: "Please enter email address",
                          },
                        ]}
                      >
                        <Input
                          className="form__input"
                          type="text"
                          placeholder="Enter email address here..."
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__submit__section">
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={false}
                    size="large"
                    onClick={() => {
                      console.log("Create Company");
                    }}
                  >
                    Create Company
                  </Button>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    className="login__btn"
                    size="large"
                    onClick={() => {
                      console.log("Create Company");
                    }}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default CompanyCreate;
