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

// import "./style.less";
import Layout from "@/components/Layout";
import { useAddSubAdminMutation, useEditSubAdminMutation, useGetSubAdminMutation } from "@/services/sub.admin";
import { useEffect } from "react";
import { ISubAdminReducer } from "@/store/sub-admin/sub.admin.types";
import { useSelector } from "react-redux";
import { ICombineReducerProps } from "@/store";
import { useHistory, useParams } from "react-router-dom";
import { ErrorServices } from "@/services";

const SubAdminsEdit = () => {
    let subAdminForm = useRef<any>(null);
    const history = useHistory();
    const subAdminReducer: ISubAdminReducer = useSelector((state: ICombineReducerProps) => state.subAdmin);
    const { first_name, last_name, phone_number, phone_code, role, email } = subAdminReducer.subAdmin;
    const [editSubAdmin, { isLoading }] = useEditSubAdminMutation();
    const [getSubAdmin] = useGetSubAdminMutation();
    const params: { sub_admin_id: string } = useParams();

    const id = params.sub_admin_id;

    const onSubmit = async (payload: any) => {
        try {
            // payload.phone_number = `+${payload.contact_number.code}${payload.contact_number.phone}`
            payload.phone_code = payload.contact_number.code;
            payload.phone_number = payload.contact_number.phone;
            delete payload.contact_number;
            await editSubAdmin({ id, payload }).unwrap();
            subAdminForm.current.resetFields();
            message.success('Sub Admin has been successfully updated.')
            history.goBack();
        } catch (error) {
            ErrorServices(error);
        }
    }

    useEffect(() => {
        onEditSubAdmin();
    }, []);

    const onEditSubAdmin = async () => {
        try {
            await getSubAdmin(params.sub_admin_id).unwrap();
        } catch (error) {
            ErrorServices(error);
        }
    }

    return (
        <>
            <h1 className="form_heading">Create sub admin</h1>
            <ConfigProvider locale={en}>

                <Form
                    initialValues={{
                        first_name, last_name, phone_number, role, email,
                        contact_number: {
                            code: phone_code,
                            phone: phone_number,
                        },

                        remember: true
                    }}
                    name="sub_admin"
                    ref={subAdminForm}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
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
                                        <CountryPhoneInput
                                        // value={{
                                        //     short: "us",
                                        // }}
                                        />
                                    </Form.Item>

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

                                    <div className="form__item select__option_item" />
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
                                Update Sub Admin
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                                className="login__btn"
                                size="large"
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </ConfigProvider>

        </>
    );
};

export default SubAdminsEdit;
