import { FC, useEffect, useState } from "react";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import moment from "moment";

import Modal from "@components/Modal";
import {
  ICountry,
  ICurrency,
  IJobGrade,
  ILongTermIncentive,
  ILongTermPlan,
  IModal,
} from "@/types";
import {
  ErrorServices,
  useCreateLongTermIncentiveMutation,
  useFetchCompanyJobGradesQuery,
  useFetchCurrenciesQuery,
  useFetchLongTermPlansQuery,
  useUpdateLongTermIncentiveMutation,
} from "@services";
import { useTypedSelector } from "@/hooks";
import { LoadingOutlined } from "@ant-design/icons";
import { showSuccessPopup } from "@/utils";

const { Option } = Select;

interface IFormValues {
  grade: null | string;
  country_id: null | number;
  currency_id: null | number;
  plan: { id: number; name: string } | null;
  is_all_grade: boolean;
  is_global: boolean;
  is_amount: boolean;
  range_type: string;
  year: number | null;
  equity_min: number | null;
  equity_mid: number | null;
  equity_max: number | null;
}

interface IAddLongTermIncentive extends IModal {
  selectedLongTermIncentive: ILongTermIncentive | null;
  setSelectedLongTermIncentive: React.Dispatch<
    React.SetStateAction<ILongTermIncentive | null>
  >;
}

const AddLongTermIncentive: FC<IAddLongTermIncentive> = ({
  isVisible,
  setIsVisible,
  selectedLongTermIncentive,
  setSelectedLongTermIncentive,
}) => {
  const company_id = 1;
  const [longTermIncentive, setLongTermIncentive] = useState<IFormValues>({
    grade: null,
    country_id: null,
    currency_id: null,
    plan: null,
    is_all_grade: false,
    is_global: false,
    is_amount: false,
    range_type: "",
    year: null,
    equity_min: null,
    equity_mid: null,
    equity_max: null,
  });
  const { data: plansData, isLoading: isFetchingPlans } =
    useFetchLongTermPlansQuery({
      company_id,
    });
  const [planGrades, setPlanGrades] = useState<string[]>([]);
  const [planCountries, setPlanCountries] = useState<ICountry[]>([]);
  const { data: plans } = plansData || {};
  const { data: jobGradesData, isLoading: isFetchingGrades } =
    useFetchCompanyJobGradesQuery({ company_id });
  const { data: jobGrades } = jobGradesData || {};
  const { countries } = useTypedSelector(state => state?.countries);
  const gradeList = longTermIncentive?.is_all_grade
    ? jobGrades?.map(({ grade }: IJobGrade) => grade)
    : planGrades;
  const countryList = longTermIncentive?.is_global ? countries : planCountries;
  const { data: currenciesData, isLoading: isFetchingCurrencies } =
    useFetchCurrenciesQuery(null);
  const { data: currencies } = currenciesData || {};
  const [createLongTermIncentive, { isLoading: isCreating }] =
    useCreateLongTermIncentiveMutation();
  const [updateLongTermIncentive, { isLoading: isUpdating }] =
    useUpdateLongTermIncentiveMutation();

  useEffect(() => {
    if (selectedLongTermIncentive) {
      const { country, plan } = selectedLongTermIncentive;
      const longTermIncentive: any = {
        ...selectedLongTermIncentive,
        currency_id: 1,
        plan: { id: plan?.id, name: plan?.name },
        country_id: country?.id,
      };
      delete longTermIncentive?.country;
      console.log("longTer", longTermIncentive);
      setLongTermIncentive(longTermIncentive);
    }
    return () => {
      setSelectedLongTermIncentive(null);
    };
  }, [selectedLongTermIncentive, setSelectedLongTermIncentive]);

  const handleSubmit = async () => {
    try {
      const body = { ...longTermIncentive, plan: longTermIncentive?.plan?.id };
      console.log("body", body);
      if (selectedLongTermIncentive) {
        await editLongTermIncentive(body);
      } else {
        await addLongTermIncentive(body);
      }
      setIsVisible(false);
      showSuccessPopup({
        title: `Long Team Incentive ${
          selectedLongTermIncentive ? "Updated!" : "Created!"
        }`,
        desc: `You have successfully ${
          selectedLongTermIncentive ? "updated the" : "created new"
        } long term incentive.`,
        role: "client",
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addLongTermIncentive = async (body: any) =>
    await createLongTermIncentive({ company_id, body }).unwrap();

  const editLongTermIncentive = async (body: any) =>
    await updateLongTermIncentive({
      company_id,
      body,
      id: selectedLongTermIncentive?.id,
    }).unwrap();

  return (
    <Modal
      width={544}
      footer={[
        <Button
          disabled={
            !longTermIncentive?.equity_max ||
            !longTermIncentive?.equity_mid ||
            !longTermIncentive?.equity_mid ||
            !longTermIncentive?.year ||
            !longTermIncentive?.range_type ||
            !longTermIncentive?.currency_id
          }
          onClick={handleSubmit}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedLongTermIncentive ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title={`${
        selectedLongTermIncentive ? "Update" : "Create"
      } a Long Term Incentive`}
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={24}>
            <label>Plan</label>
            <Select
              disabled={!!selectedLongTermIncentive}
              loading={isFetchingPlans}
              size="large"
              showSearch={false}
              showArrow={true}
              value={longTermIncentive?.plan?.name || undefined}
              placeholder="Select plan from here..."
              onChange={(serializedPlan: any) => {
                const { id, grades, name, countries } = JSON.parse(
                  serializedPlan
                ) as ILongTermPlan;
                setLongTermIncentive(prev => ({
                  ...prev,
                  plan: { id, name },
                  is_global: !countries.length,
                  is_all_grade: !grades.length,
                  grade: null,
                  country_id: null,
                }));
                setPlanGrades(grades);
                setPlanCountries(countries);
              }}
            >
              {plans?.map((plan: ILongTermPlan) => (
                <Option key={plan?.id} value={JSON.stringify(plan)}>
                  {plan?.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Grade</label>
            <Select
              disabled={longTermIncentive?.is_all_grade}
              value={longTermIncentive?.grade || undefined}
              loading={
                selectedLongTermIncentive && isFetchingGrades ? true : false
              }
              showArrow={true}
              size="large"
              showSearch={false}
              placeholder="Select grade from here..."
              onChange={grade =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  grade,
                }))
              }
            >
              {gradeList?.map((grade: string) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Country</label>
            <Select
              disabled={longTermIncentive?.is_global}
              value={longTermIncentive?.country_id || undefined}
              showArrow={true}
              size="large"
              showSearch={false}
              placeholder="Select country from here..."
              onChange={country_id =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  country_id,
                }))
              }
            >
              {countryList?.map(({ id, name }: ICountry) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Currency</label>
            <Select
              showArrow={true}
              showSearch={true}
              loading={isFetchingCurrencies}
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={longTermIncentive?.currency_id || undefined}
              onChange={currency_id =>
                setLongTermIncentive(prev => ({
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
          <Col span={11}>
            <label>Range Type</label>
            <Input
              size="large"
              value={longTermIncentive?.range_type}
              onChange={e =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  range_type: e.target.value,
                }))
              }
              placeholder="Enter range type here..."
            />
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={7}>
            <label>Equity Min</label>
            <Input
              size="large"
              placeholder="Enter equity min"
              type="number"
              value={longTermIncentive?.equity_min || ""}
              onChange={e =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  equity_min: +e.target.value,
                }))
              }
            />
          </Col>
          <Col span={7}>
            <label>Equity Mid</label>
            <Input
              size="large"
              placeholder="Enter equity mid"
              type="number"
              value={longTermIncentive?.equity_mid || ""}
              onChange={e =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  equity_mid: +e.target.value,
                }))
              }
            />
          </Col>
          <Col span={7}>
            <label>Equity Max</label>
            <Input
              size="large"
              placeholder="Enter equity max"
              type="number"
              value={longTermIncentive?.equity_max || ""}
              onChange={e =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  equity_max: +e.target.value,
                }))
              }
            />
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={24}>
            <label>Year</label>
            <br />
            <DatePicker
              size="large"
              className="width-100"
              value={moment(`${longTermIncentive?.year}-1`)}
              onChange={(_, year) =>
                setLongTermIncentive(prev => ({ ...prev, year: +year }))
              }
              picker="year"
            />
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col className="align-center-vertically" span={7}>
            <Checkbox
              checked={longTermIncentive?.is_amount}
              onChange={event =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  is_amount: event.target.checked,
                }))
              }
            >
              Amount
            </Checkbox>
          </Col>
          <Col span={7}>
            <Checkbox
              checked={longTermIncentive?.is_all_grade}
              onChange={event =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  is_all_grade: event.target.checked,
                }))
              }
            >
              All Grades
            </Checkbox>
          </Col>
          <Col span={7}>
            <Checkbox
              checked={longTermIncentive?.is_global}
              onChange={event =>
                setLongTermIncentive(prev => ({
                  ...prev,
                  is_global: event.target.checked,
                }))
              }
            >
              Global
            </Checkbox>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddLongTermIncentive;
