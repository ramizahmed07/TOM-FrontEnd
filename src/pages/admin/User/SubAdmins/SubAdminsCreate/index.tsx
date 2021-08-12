import React from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Form,
  Select,
} from "antd";
import { Option } from "antd/lib/mentions";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";

import "./style.less";
import Layout from "@/components/Layout";

const SubAdminsCreate = () => {
  return (
    <>
      <h1 className="form_heading">Create sub admin</h1>
      <Form
        name="sub_admin"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={() => { }}
        layout="vertical"
        className="create__company__container"
      >
        <div className="sub__admin_details_container">
          <h1 className="section__heading">Basic information</h1>
          <div className="form__section">
            <div className="form__section_container">
              <div className="contact__person__sub_container">
                <Form.Item
                  className="form__item contact__person_item"
                  label={
                    <label className="input__label">First name</label>
                  }
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter first name",
                    },
                  ]}
                >
                  <Input
                    className="form__input"
                    type="text"
                    placeholder="Enter first name here..."
                  />
                </Form.Item>

                <Form.Item
                  className="form__item contact__person_item"
                  label={
                    <label className="input__label">Last name</label>
                  }
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter last name",
                    },
                  ]}
                >
                  <Input
                    className="form__input"
                    type="text"
                    placeholder="Enter last name here..."
                  />
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
                  <ConfigProvider locale={en}>
                    <CountryPhoneInput
                      value={{
                        short: "us",
                      }}
                    />
                  </ConfigProvider>
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

              <div className="contact__person__sub_container">
                <Form.Item
                  className="form__item contact__person_item"
                  label={<label className="input__label">Role</label>}
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please select role",
                    },
                  ]}
                >
                  <Select placeholder="Select role from here...">
                    <Option value="admin">Admin</Option>
                    <Option value="client">Client</Option>
                    <Option value="user">User</Option>
                  </Select>
                </Form.Item>

                <div className="contact__person__sub_container form__item contact__person_item" />
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
    </>
  );
};

export default SubAdminsCreate;
