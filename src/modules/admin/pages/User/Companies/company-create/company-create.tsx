import React from "react";
import Layout from "@/components/Layout";
import {
  Col,
  Row,
  Table,
  Dropdown,
  Menu,
  TableColumnsType,
  Switch,
  Tag,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
} from "antd";
import { Option } from "antd/lib/mentions";

const CompanyCreate = () => {
  return (
    <>
      <Layout>
        <Row>
          <Col span={24}>
            <h1>Create new company</h1>
            {/* <div className=""> */}
            <Form
              name="login"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={() => {}}
              layout="vertical"
              className="create__company__container"
              // onFinishFailed={onFinishFailed}
            >
              <div className="basic__information_container">
                <h1>Basic information</h1>
                <Form.Item
                  className="form__item"
                  label={<label className="input__label">Company name</label>}
                  name="company_name"
                  rules={[
                    { required: true, message: "Please enter company name" },
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
                  rules={[{ required: true, message: "Please enter location" }]}
                >
                  <Select>
                    <Option value="khi">Karachi</Option>
                    <Option value="lhr">Lahore</Option>
                    <Option value="isl">Islamabad</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  className="form__item"
                  label={<label className="input__label">Address</label>}
                  name="address"
                  rules={[{ required: true, message: "Please enter address" }]}
                >
                  <Input
                    className="form__input"
                    type="text"
                    placeholder="Enter company address here..."
                  />
                </Form.Item>

                <Form.Item
                  className="form__item"
                  label={<label className="input__label">Postal code</label>}
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

              <div className="corporate__information_container">
                <h1>Corporate Information</h1>

                <Form.Item
                  className="form__item"
                  label={
                    <label className="input__label">Country Headquater </label>
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
                  label={<label className="input__label">Base Currency</label>}
                  name="base_currency"
                  rules={[
                    { required: true, message: "Please enter base currency" },
                  ]}
                >
                  <Select>
                    <Option value="AED">AED</Option>
                    <Option value="GBB">GBB</Option>
                    <Option value="GBB">GBB</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  className="form__item"
                  label={<label className="input__label">Financial Year</label>}
                  name="financial_year"
                  rules={[
                    { required: true, message: "Please enter financial year" },
                  ]}
                >
                  <div>
                    <DatePicker
                      onChange={() => console.log("Start Date")}
                      placeholder="Starting Date (DD/MM/YY)"
                    />
                    {" - "}
                    <DatePicker
                      onChange={() => console.log("Start Date")}
                      placeholder="Starting Date (DD/MM/YY)"
                    />
                  </div>
                </Form.Item>

                <Form.Item
                  className="form__item"
                  label={
                    <label className="input__label">Stock tracking ID</label>
                  }
                  name="stock_tracking_id"
                  rules={[
                    {
                      required: true,
                      message: "Please enter stock tracking id",
                    },
                  ]}
                >
                  <Input
                    className="form__input"
                    type="text"
                    placeholder="Enter stock ID here..."
                  />
                </Form.Item>
              </div>

              <div className='contact_details_container'>
              <Form.Item
                  className="form__item"
                  label={<label className="input__label">Contract Duration</label>}
                  name="contract_duration"
                  rules={[
                    { required: true, message: "Please enter contract duration" },
                  ]}
                >
                  <div>
                    <DatePicker
                      onChange={() => console.log("Start Date")}
                      placeholder="Starting Date (DD/MM/YY)"
                    />
                    {" - "}
                    <DatePicker
                      onChange={() => console.log("Start Date")}
                      placeholder="Starting Date (DD/MM/YY)"
                    />
                  </div>
                </Form.Item>

               


              </div>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login__btn"
                  size="large"
                  onClick={() => {
                    console.log("Create Company");
                  }}
                >
                  Create Company
                </Button>
              </Form.Item>
            </Form>
            {/* </div> */}
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default CompanyCreate;
