import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { FC, useEffect, useRef, useState } from "react";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

import {
  ICountry,
  ICurrency,
  IJobGrade,
  ILongTermPlan,
  IModal,
  IPlanType,
} from "@/types";
import Modal from "@components/Modal";
import { getDaysOfMonth, showSuccessPopup } from "@utils";
import { installment_types } from "../config";
import {
  ErrorServices,
  useCreateLongTermPlanMutation,
  useFetchCompanyJobGradesQuery,
  useFetchCurrenciesQuery,
  useFetchLongTermPlanTypesQuery,
  useUpdateLongTermPlanMutation,
} from "@services";
import { useTypedSelector } from "@hooks";

const { Option } = Select;

interface IAddLongTermPlan extends IModal {
  selectedLongTermPlan: ILongTermPlan | null;
  setSelectedLongTermPlan: React.Dispatch<
    React.SetStateAction<ILongTermPlan | null>
  >;
}

interface IFormValues {
  name: string;
  plan_type_id: number | null;
  currency_id: number | null;
  country_ids: number[];
  grades: string[];
  holding_period: boolean;
  is_installment: boolean;
  is_amount: boolean;
  is_adhoc: boolean;
  date_of_grant: number | null;
  month_of_grant: number | null;
  installment_type: string;
  year_of_grant?: number | null;
}

const AddLongTermPlan: FC<IAddLongTermPlan> = ({
  isVisible,
  setIsVisible,
  selectedLongTermPlan,
  setSelectedLongTermPlan,
}) => {
  const company_id = 1;
  const { data: planTypesData, isLoading: isFetchingTypes } =
    useFetchLongTermPlanTypesQuery(null);
  const { data: planTypes } = planTypesData || {};
  const { data: currenciesData, isLoading: isFetchingCurrencies } =
    useFetchCurrenciesQuery(null);
  const { data: currencies } = currenciesData || {};
  const { data: jobGradesData, isLoading: isFetchingGrades } =
    useFetchCompanyJobGradesQuery({ company_id });
  const { data: jobGrades } = jobGradesData || {};
  const { countries } = useTypedSelector(state => state?.countries);
  const [createLongTermPlan, { isLoading: isCreating }] =
    useCreateLongTermPlanMutation();
  const [updateLongTermPlan, { isLoading: isUpdating }] =
    useUpdateLongTermPlanMutation();
  const [longTermPlan, setLongTermPlan] = useState<IFormValues>({
    name: "",
    plan_type_id: null,
    currency_id: null,
    country_ids: [],
    grades: [],
    holding_period: false,
    is_installment: false,
    is_amount: false,
    is_adhoc: false,
    date_of_grant: null,
    month_of_grant: null,
    installment_type: "",
    year_of_grant: null,
  });

  useEffect(() => {
    if (selectedLongTermPlan) {
      const {
        countries,
        currency: currency_id,
        holding_period,
        type,
      } = selectedLongTermPlan;
      const longTermPlan: any = {
        ...selectedLongTermPlan,
        country_ids: countries?.map(({ id }) => id),
        currency_id,
        holding_period: !!holding_period,
        plan_type_id: type?.id,
        year_of_grant: moment().year(),
      };
      delete longTermPlan?.countries;
      delete longTermPlan?.currency;
      delete longTermPlan?.id;
      delete longTermPlan?.is_global;
      delete longTermPlan?.is_all_grade;
      delete longTermPlan?.type;
      setLongTermPlan(longTermPlan);
    }
    return () => {
      setSelectedLongTermPlan(null);
    };
  }, [selectedLongTermPlan, setSelectedLongTermPlan]);

  const handleSubmit = async () => {
    try {
      const body = { ...longTermPlan };
      delete body.year_of_grant;
      if (selectedLongTermPlan) {
        await editShortTermPlan(body);
      } else {
        await addLongTermPlan(body);
      }
      setIsVisible(false);

      showSuccessPopup({
        title: `Long Team Incentives Plan ${
          selectedLongTermPlan ? "Updated!" : "Created!"
        }`,
        desc: `You have successfully ${
          selectedLongTermPlan ? "updated the" : "created new"
        } long term plan.`,
        role: "client",
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addLongTermPlan = async (body: IFormValues) =>
    await createLongTermPlan({ company_id, body }).unwrap();

  const editShortTermPlan = async (body: IFormValues) =>
    await updateLongTermPlan({
      company_id,
      id: selectedLongTermPlan?.id,
      body,
    }).unwrap();

  return (
    <Modal
      footer={[
        <Button
          disabled={
            !longTermPlan?.name ||
            !longTermPlan?.plan_type_id ||
            !longTermPlan?.date_of_grant ||
            !longTermPlan?.month_of_grant ||
            !longTermPlan?.installment_type ||
            !longTermPlan?.currency_id
          }
          onClick={handleSubmit}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedLongTermPlan ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create LTI Plan"
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Plan Name</label>
            <Input
              value={longTermPlan?.name}
              onChange={event =>
                setLongTermPlan(prev => ({
                  ...prev,
                  name: event?.target.value,
                }))
              }
              size="large"
              placeholder="Enter plan name here..."
            />
          </Col>
          <Col span={11}>
            <label>Installment Type</label>
            <Select
              size="large"
              showArrow={true}
              showSearch={false}
              value={longTermPlan?.installment_type || undefined}
              onChange={installment_type =>
                setLongTermPlan(prev => ({ ...prev, installment_type }))
              }
              placeholder="Select installment type from here..."
            >
              {installment_types.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Type of Stock</label>
            <Select
              loading={isFetchingTypes}
              size="large"
              showArrow={true}
              showSearch={false}
              value={longTermPlan?.plan_type_id || undefined}
              onChange={plan_type_id =>
                setLongTermPlan(prev => ({ ...prev, plan_type_id }))
              }
              placeholder="Select stock type from here..."
            >
              {planTypes?.map((type: IPlanType) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Currency</label>
            <Select
              showArrow={true}
              showSearch={true}
              loading={isFetchingCurrencies}
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={longTermPlan?.currency_id || undefined}
              onChange={currency_id =>
                setLongTermPlan(prev => ({
                  ...prev,
                  currency_id,
                }))
              }
              size="large"
              placeholder="Select currency from here..."
            >
              {currencies?.map(({ id, name, code }: ICurrency) => (
                <Option key={id} value={id}>
                  {`${name} (${code})`}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Grades</label>
            <Select
              value={longTermPlan?.grades}
              onChange={grades =>
                setLongTermPlan(prev => ({ ...prev, grades }))
              }
              loading={isFetchingGrades}
              showArrow={true}
              showSearch={true}
              size="large"
              mode="multiple"
              placeholder="Select grades from here..."
            >
              {jobGrades?.map(({ id, grade }: IJobGrade) => (
                <Option key={id} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Countries</label>
            <Select
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              loading={isFetchingGrades}
              showArrow={true}
              showSearch={true}
              mode="multiple"
              size="large"
              onChange={country_ids =>
                setLongTermPlan(prev => ({ ...prev, country_ids }))
              }
              value={longTermPlan?.country_ids}
              placeholder="Select grades from here..."
            >
              {countries?.map(({ id, name }: ICountry) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Month of Grant</label>
            <br />
            <DatePicker
              className="width-100"
              size="large"
              picker="month"
              value={
                selectedLongTermPlan
                  ? moment(
                      `${longTermPlan?.year_of_grant}-${longTermPlan?.month_of_grant}`
                    )
                  : undefined
              }
              onChange={date => {
                setLongTermPlan(prev => ({
                  ...prev,
                  month_of_grant: moment(date).month() + 1,
                  year_of_grant: moment(date).year(),
                }));
              }}
              placeholder="Select month of grant from here..."
            />
          </Col>
          <Col span={11}>
            <label>Date of Grant</label>

            <Select
              loading={isFetchingGrades}
              showArrow={true}
              showSearch={true}
              size="large"
              value={longTermPlan?.date_of_grant || undefined}
              onChange={date_of_grant =>
                setLongTermPlan(prev => ({ ...prev, date_of_grant }))
              }
              placeholder="Select date of grant from here..."
            >
              {getDaysOfMonth({
                month: longTermPlan?.month_of_grant || undefined,
                year: longTermPlan?.year_of_grant || undefined,
              })?.map(day => (
                <Option key={day} value={day}>
                  {day}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col className="align-center-vertically" span={11}>
            <Checkbox
              checked={longTermPlan?.holding_period}
              onChange={e =>
                setLongTermPlan(prev => ({
                  ...prev,
                  holding_period: e.target.checked,
                }))
              }
            >
              Holding Period
            </Checkbox>
            <Checkbox
              checked={longTermPlan?.is_installment}
              onChange={e =>
                setLongTermPlan(prev => ({
                  ...prev,
                  is_installment: e.target.checked,
                }))
              }
            >
              Installment
            </Checkbox>
            <Checkbox
              checked={longTermPlan?.is_amount}
              onChange={e =>
                setLongTermPlan(prev => ({
                  ...prev,
                  is_amount: e.target.checked,
                }))
              }
            >
              Amount
            </Checkbox>
            <Checkbox
              checked={longTermPlan?.is_adhoc}
              onChange={e =>
                setLongTermPlan(prev => ({
                  ...prev,
                  is_adhoc: e.target.checked,
                }))
              }
            >
              Adhoc
            </Checkbox>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddLongTermPlan;
