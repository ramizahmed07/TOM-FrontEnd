import React, { useRef } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Form,
  Select,
  message,
} from "antd";
import { Option } from "antd/lib/mentions";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";

import "./style.less";
import Layout from "@/components/Layout";
import { useAddSubAdminMutation } from "@/services/sub.admin";

const SubAdminsCreate = () => {
  let subAdminForm = useRef<any>(null);
  const [addSubAdmin, { isLoading }] = useAddSubAdminMutation();

  const onSubmit = async (values: any) => {
    try {
      await addSubAdmin({ ...values, "phone_number": "+92336070015", });
      subAdminForm.current.resetFields();
      message.success('Sub Admin has been successfully created.')
    } catch (error) {
      message.error(error?.message);
    }
  }

  return (
    <>
      <h1 className="form_heading">Create sub admin</h1>
      <Form
        name="sub_admin"
        ref={subAdminForm}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
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
                {/* <Form.Item
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
                </Form.Item> */}

                <Form.Item
                  className="form__item contact__person_item"
                  label={
                    <label className="input__label">Email address</label>
                  }
                  name="email"
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
                    <Option value="TOM_SUPER_USER">Super User</Option>
                    <Option value="TOM_ADMIN">Admin</Option>
                    <Option value="TOM_SALES">Sales</Option>
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
              loading={isLoading}
            >
              Create Sub Admin
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              className="login__btn"
              size="large"
              onClick={() => {
                history.back();
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
