import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { FC, useState, useEffect } from "react";

import { ICashAllowance, ICountry, IJobGrade, IModal } from "@/types";
import Modal from "@components/Modal";
import {
  ErrorServices,
  useCreateCashAllowanceMutation,
  useFetchCompanyCountriesQuery,
  useFetchCompanyJobGradesQuery,
  useUpdateCashAllowanceMutation,
} from "@services";
import { showSuccessPopup } from "@utils";

const { Option } = Select;

interface IAddCashAllowance extends IModal {
  selectedCashAllowance: ICashAllowance | null;
  setSelectedCashAllowance: React.Dispatch<
    React.SetStateAction<ICashAllowance | null>
  >;
}

const INITIAL_CASH_ALLOWANCE: ICashAllowance = {
  grade: "",
  country_id: null,
  city: null,
  is_all_grade: false,
  is_percentage: false,
  is_basic_pay: false,
  value: null,
};

const AddCashAllowance: FC<IAddCashAllowance> = ({
  isVisible,
  setIsVisible,
  selectedCashAllowance,
  setSelectedCashAllowance,
}) => {
  const company_id = 1;
  const [cashAllowance, setCashAllowance] = useState(INITIAL_CASH_ALLOWANCE);
  const [createCashAllowance, { isLoading: isCreating }] =
    useCreateCashAllowanceMutation();
  const [updateCashAllowance, { isLoading: isUpdating }] =
    useUpdateCashAllowanceMutation();
  const { data: countriesData, isLoading: isFetchingCountries } =
    useFetchCompanyCountriesQuery({
      company_id,
    });
  const { data: countries } = countriesData || {};
  const { data: jobGradesData, isLoading: isFetchingGrades } =
    useFetchCompanyJobGradesQuery({ company_id });
  const { data: jobGrades } = jobGradesData || {};

  useEffect(() => {
    if (selectedCashAllowance) {
      setCashAllowance({
        ...selectedCashAllowance,
        country_id: selectedCashAllowance?.country?.id,
      });
    }
    return () => {
      setSelectedCashAllowance(null);
      setCashAllowance(INITIAL_CASH_ALLOWANCE);
    };
  }, [selectedCashAllowance, setSelectedCashAllowance]);

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    setCashAllowance((prev: ICashAllowance) => ({
      ...prev,
      [name]: name?.includes("is_") ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const { city, value } = cashAllowance;
    const body = {
      ...cashAllowance,
      city: city || null,
      value: +value! || null,
    };
    body?.id && delete body?.id;
    body?.country && delete body?.country;
    try {
      if (selectedCashAllowance) {
        await editCashAllowance(body);
      } else {
        await addCashAllowance(body);
      }
      setIsVisible(false);
      showSuccessPopup({
        title: selectedCashAllowance
          ? "Cash Allowance Updated"
          : "New Cash Allowance Created",
        desc: `You have successfully ${
          selectedCashAllowance ? "updated the" : "created new"
        } cash allowance.`,
        role: "client",
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addCashAllowance = async (body: ICashAllowance) =>
    await createCashAllowance({
      company_id,
      body,
    }).unwrap();

  const editCashAllowance = async (body: ICashAllowance) =>
    updateCashAllowance({
      company_id,
      id: selectedCashAllowance?.id,
      body,
    }).unwrap();

  return (
    <Modal
      width={544}
      footer={[
        <Button
          disabled={
            !cashAllowance.grade ||
            !cashAllowance.country_id ||
            !cashAllowance.value
          }
          onClick={handleSubmit}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedCashAllowance ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title={`${selectedCashAllowance ? "Update" : "Create"} Job Grade`}
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Country</label>
            <Select
              disabled={!!selectedCashAllowance}
              loading={isFetchingCountries}
              size="large"
              showArrow
              placeholder="Select country from here..."
              showSearch={false}
              value={cashAllowance?.country_id || undefined}
              onChange={country_id =>
                setCashAllowance((prev: ICashAllowance) => ({
                  ...prev,
                  country_id,
                }))
              }
            >
              {countries?.map((country: ICountry) => (
                <Option key={country?.id} value={country?.id}>
                  {country?.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Grade</label>
            <Select
              disabled={!!selectedCashAllowance}
              loading={isFetchingGrades}
              size="large"
              showArrow
              placeholder="Select grade from here..."
              showSearch={false}
              value={cashAllowance?.grade || undefined}
              onChange={grade =>
                setCashAllowance((prev: ICashAllowance) => ({ ...prev, grade }))
              }
            >
              {jobGrades?.map((jobGrade: IJobGrade) => (
                <Option key={jobGrade.id} value={jobGrade.grade}>
                  {jobGrade?.grade}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>City</label>
            <Input
              name="city"
              value={cashAllowance?.city || ""}
              onChange={handleChange}
              size="large"
              placeholder="Enter city here..."
            />
          </Col>
          <Col span={11}>
            <label>Value</label>
            <Input
              name="value"
              value={cashAllowance?.value || ""}
              onChange={handleChange}
              type="number"
              size="large"
              placeholder="Enter value here..."
            />
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Checkbox
            checked={cashAllowance?.is_all_grade}
            name="is_all_grade"
            onChange={handleChange}
          >
            All Grade
          </Checkbox>
          <Checkbox
            checked={cashAllowance?.is_percentage}
            name="is_percentage"
            onChange={handleChange}
          >
            Percentage
          </Checkbox>
          <Checkbox
            checked={cashAllowance?.is_basic_pay}
            name="is_basic_pay"
            onChange={handleChange}
          >
            Basic Pay
          </Checkbox>
        </Row>
      </>
    </Modal>
  );
};

export default AddCashAllowance;
