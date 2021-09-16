import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import { Option } from "antd/lib/mentions";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";
import moment from "moment";

import "./createCompany.less";
import ImgUpload from "@assets/images/img-upload.png";
import { disabledDates, generateArrayOfYears, showSuccessPopup } from "@utils";
import { useTypedSelector } from "@hooks";
import {
  ErrorServices,
  useCreateCompanyMutation,
  useFetchCompanyQuery,
  useFetchCurrenciesQuery,
  useUpdateCompanyMutation,
} from "@/services";
import { ICurrency } from "@/types";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { paths } from "@router";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

function b64toBlob(dataURI: any) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

interface IFormValues {
  country_id: number | null;
  currency_id: number | null;
  name: string;
  address: string;
  postal_code: string;
  country_headquarter: string;
  financial_year: number | null;
  contract_start_date: string;
  contract_end_date: string;
  large_logo_url: string;
  small_logo_url: string;
  stock_tracking_ids: string[];
  person_name: string;
  person_phone_code: number | null;
  person_phone_number: string;
  person_email: string;
  person_country_id: number | null;
}

const INITIAL_VALUES: IFormValues = {
  country_id: null,
  currency_id: null,
  name: "",
  address: "",
  postal_code: "",
  country_headquarter: "",
  financial_year: null,
  contract_end_date: "",
  contract_start_date: "",
  small_logo_url:
    "https://cdn.sanity.io/images/92ui5egz/production/7c1c60e9afaaaa3cce61e5101717796d21b7f914-1426x1080.svg?auto=format",
  large_logo_url:
    "https://cdn.sanity.io/images/92ui5egz/production/7c1c60e9afaaaa3cce61e5101717796d21b7f914-1426x1080.svg?auto=format",
  stock_tracking_ids: [],
  person_name: "",
  person_phone_code: null,
  person_phone_number: "",
  person_email: "",
  person_country_id: null,
};

type IFormKeys = keyof IFormValues;

const validateValues = (data: IFormValues) => {
  let cond = false;
  for (var key in data) {
    if (data[key as IFormKeys] === "" || data[key as IFormKeys] === null) {
      cond = true;
    }
  }
  return cond;
};

const CreateCompany = () => {
  const history = useHistory();
  const { company_id } = useParams<{ company_id: string }>();
  const { path } = useRouteMatch<{ path: string }>();
  const [stockId, setStockId] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { countries } = useTypedSelector(state => state.countries);
  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();
  const { data: currenciesData, isLoading: isFetchingCurrencies } =
    useFetchCurrenciesQuery(null);
  const { data: currencies } = currenciesData || {};
  const [company, setCompany] = useState(INITIAL_VALUES);
  const isEdit = path === paths.admin.users.companies.edit;
  const { data: companyData, isLoading: isFetchingCompany } =
    useFetchCompanyQuery(
      { company_id },
      {
        skip: !isEdit,
      }
    );
  const { data: selectedCompany } = companyData || {};
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  function disabledDate(current: any) {
    return disabledDates(
      current,
      moment(moment(company?.contract_start_date)).endOf("day")
    );
  }

  useEffect(() => {
    if (isEdit && selectedCompany) {
      const { country, currency, user, person_country } = selectedCompany;
      const company = {
        ...selectedCompany,
        country_id: country?.id,
        currency_id: currency?.id,
        person_country_id: person_country?.id,
        person_email: user?.email,
        person_name: user?.first_name + user?.last_name,
        person_phone_code: user?.phone_code,
        person_phone_number: user?.phone_number,
      };
      delete company?.country;
      delete company?.currency;
      delete company?.user;
      delete company?.person_country;
      setCompany(company);
    }
  }, [selectedCompany, path, isEdit]);

  const handleImage = (info: any) => {
    // if (info.file.status === 'uploading') {

    //   return;
    // }
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl: string) => {
      const blob = b64toBlob(imageUrl);
      const blobUrl = URL.createObjectURL(blob);
    });
  };

  const onChange = (event: any) => {
    setCompany(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (isEdit) {
        await editCompany(company);
      } else {
        await addCompany(company);
      }
      history.push(paths.admin.users.companies.listing);
      showSuccessPopup({
        title: false ? "Industry Updated" : "New Company Created",
        desc: `You have successfully ${
          false ? "updated the" : "created new"
        } company.`,
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addCompany = async (body: IFormValues) =>
    await createCompany({ body }).unwrap();

  const editCompany = async (body: IFormValues) =>
    await updateCompany({ body, company_id }).unwrap();

  return (
    <div className="container">
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">{`${
            isEdit ? "Update" : "Create"
          } New Company`}</div>
        </Col>
      </Row>
      <div className="addCompany">
        <Row className="addCompany__header">
          <div className="sub-heading">Basic information</div>
        </Row>
        <div className="addCompany__content">
          <Row className="addCompany__row" justify="space-between">
            <Col span={9}>
              <Row>
                <label>Company Name</label>
                <Input
                  onChange={onChange}
                  name="name"
                  value={company?.name}
                  size="large"
                  type="text"
                  placeholder="Enter company name here..."
                />
              </Row>
              <Row>
                <label className="mt-32">Address</label>
                <Input
                  onChange={onChange}
                  value={company?.address}
                  name="address"
                  size="large"
                  type="text"
                  placeholder="Enter company address here..."
                />
              </Row>
              <label className="mt-32">Postal Code</label>
              <Input
                value={company?.postal_code}
                onChange={onChange}
                name="postal_code"
                className="mb-32"
                size="large"
                type="text"
                placeholder="Enter postal code here..."
              />
            </Col>
            <Col className="addCompany__col2" span={9}>
              <div>
                <Upload
                  onChange={handleImage}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  <img src={ImgUpload} alt="avatar" />
                </Upload>
                <p className="img_description_text">UPLOAD LARGE LOGO</p>
                <p className="img_description_size">1000 x 1000</p>
              </div>
            </Col>
          </Row>
          <div className="mt-24 mb-32 sub-heading">Corporate Information</div>
          <Row className="addCompany__row" justify="space-between">
            <Col span={9}>
              <Row>
                <label>Countries</label>
                <Select
                  onChange={country_id => {
                    setCompany(prev => ({
                      ...prev,
                      country_id,
                    }));
                  }}
                  value={company?.country_id || undefined}
                  showArrow={true}
                  showSearch={true}
                  size="large"
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="Select country from here..."
                >
                  {countries?.map(({ id, name }) => (
                    <Option key={"" + id} value={"" + id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Row>
              <Row>
                <label className="mt-32">Headquarter Location</label>
                <Input
                  value={company?.country_headquarter}
                  name="country_headquarter"
                  onChange={onChange}
                  className="form__input"
                  type="text"
                  placeholder="Enter location of headquater"
                />
              </Row>
              <Row>
                <label className="mt-32">Currency</label>
                <Select
                  value={company?.currency_id || undefined}
                  loading={isFetchingCurrencies}
                  onChange={currency_id =>
                    setCompany(prev => ({
                      ...prev,
                      currency_id,
                    }))
                  }
                  showArrow={true}
                  showSearch={true}
                  size="large"
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="Select currency from here..."
                >
                  {currencies?.map(({ id, name, code }: ICurrency) => (
                    <Option key={"" + id} value={"" + id}>
                      {`${name} (${code})`}
                    </Option>
                  ))}
                </Select>
              </Row>
              <Row>
                <label className="mt-32">Financial Year</label>
                <Select
                  onChange={financial_year =>
                    setCompany(prev => ({ ...prev, financial_year }))
                  }
                  value={company?.financial_year || undefined}
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toString().toLowerCase()) >= 0
                  }
                  showSearch={true}
                  size="large"
                  placeholder="Select financial year from here..."
                >
                  {generateArrayOfYears(50)?.map((year: number) => (
                    <Option key={year.toString()} value={year.toString()}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </Row>
              <Row justify="space-between">
                <label className="mt-32">Stock tracking ID</label>
                <div
                  className={`${
                    !company?.stock_tracking_ids?.length && "mb-32"
                  } addCompany__stockIds`}
                >
                  <Input
                    size="large"
                    onChange={e => setStockId(e.target.value)}
                    value={stockId}
                    type="text"
                    placeholder="Enter stock ID here..."
                  />
                  <Button
                    type="primary"
                    disabled={!stockId}
                    size="large"
                    onClick={() => {
                      setCompany(prev => ({
                        ...prev,
                        stock_tracking_ids: [
                          ...company?.stock_tracking_ids,
                          stockId,
                        ],
                      }));
                      setStockId("");
                      message.success("Stock tracking id added!");
                    }}
                  >
                    +
                  </Button>
                </div>
                {company?.stock_tracking_ids?.length ? (
                  <div className="addCompany__stockIds__list mb-32">
                    {company?.stock_tracking_ids?.map(id => (
                      <div className="addCompany__stockIds__list__id">
                        <span className="addCompany__stockIds__list__id__txt">
                          {id}
                        </span>
                        <CloseOutlined
                          onClick={() =>
                            setCompany(prev => ({
                              ...prev,
                              stock_tracking_ids:
                                company?.stock_tracking_ids?.filter(
                                  x => x !== id
                                ),
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </Row>
            </Col>
            <Col className="addCompany__col2" span={9}>
              <div>
                <Upload
                  onChange={handleImage}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  <img src={ImgUpload} alt="avatar" />
                </Upload>
                <p className="img_description_text">UPLOAD SMALL LOGO</p>
                <p className="img_description_size">260 x 260</p>
              </div>
            </Col>
          </Row>
          <div className="mt-24 mb-32 sub-heading">Contract Details</div>
          <label>Contract Duration</label>
          <Row className="addCompany__row" justify="space-between">
            <Col span={12}>
              <Row justify="space-between">
                <Col span={11}>
                  <DatePicker
                    className="width-100"
                    value={
                      !company?.contract_start_date
                        ? undefined
                        : moment(company?.contract_start_date)
                    }
                    onChange={date => {
                      setCompany(prev => ({
                        ...prev,
                        contract_start_date: moment(date)
                          .format("YYYY-MM-DD HH:mm:ss")
                          ?.toString() as string,
                      }));
                      setIsDisabled(false);
                    }}
                    placeholder="Starting Date (DD/MM/YY)"
                  />
                </Col>
                <Col className="mb-32" span={11}>
                  <DatePicker
                    disabled={isDisabled}
                    disabledDate={disabledDate}
                    className="width-100"
                    value={
                      !company?.contract_end_date
                        ? undefined
                        : moment(company?.contract_end_date)
                    }
                    onChange={date =>
                      setCompany(prev => ({
                        ...prev,
                        contract_end_date: moment(date)
                          .format("YYYY-MM-DD HH:mm:ss")
                          ?.toString() as string,
                      }))
                    }
                    placeholder="Ending Date (DD/MM/YY)"
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}></Col>
          </Row>
          <div className="mt-24 mb-32 sub-heading">Contact Person Details</div>
          <Row className="addCompany__row" justify="space-between">
            <Col span={11}>
              <Row>
                <label>Contact Person</label>
                <Input
                  size="large"
                  name="person_name"
                  onChange={onChange}
                  value={company?.person_name}
                  placeholder="Enter name of contact person..."
                />
              </Row>
              <label className="mt-32"> Contact Number</label>
              <Row className="addCompany__number">
                <ConfigProvider locale={en}>
                  <CountryPhoneInput
                    placeholder="Enter contact number here..."
                    onChange={e => {
                      console.log("e", e);
                      setCompany(prev => ({
                        ...prev,
                        person_phone_code: e.code as number,
                        person_phone_number: e.phone as string,
                      }));
                    }}
                    value={{
                      phone: company?.person_phone_number,
                      code: company?.person_phone_code || 92,
                    }}
                  />
                </ConfigProvider>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <label>Contact Person's Country</label>
                <Select
                  onChange={person_country_id => {
                    setCompany(prev => ({
                      ...prev,
                      person_country_id,
                    }));
                  }}
                  value={company?.person_country_id || undefined}
                  showArrow={true}
                  showSearch={true}
                  size="large"
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="Select country from here..."
                >
                  {countries?.map(({ id, name }) => (
                    <Option key={"" + id} value={"" + id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Row>
              <Row className="mt-32 mb-32">
                <label>Email Address</label>
                <Input
                  name="person_email"
                  value={company?.person_email}
                  onChange={onChange}
                  size="large"
                  placeholder="Enter email address here..."
                />
              </Row>
            </Col>
          </Row>
          <Row className="addCompany__btns">
            <Col span={24}>
              <Button
                type="primary"
                disabled={validateValues(company)}
                size="large"
                onClick={onSubmit}
              >
                {isCreating || isUpdating ? (
                  <LoadingOutlined className="spinner" />
                ) : (
                  `${isEdit ? "Update" : "Create"} Company`
                )}
              </Button>

              <Button
                size="large"
                onClick={() =>
                  history.push(
                    isEdit
                      ? `/companies/${company_id}`
                      : paths.admin.users.companies.listing
                  )
                }
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
