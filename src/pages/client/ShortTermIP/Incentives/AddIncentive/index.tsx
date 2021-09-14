import { LoadingOutlined } from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { FC, useEffect, useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import {
  ICountry,
  IJobGrade,
  IModal,
  IShortTermIncentive,
  IShortTermPlan,
} from "@/types";
import Modal from "@components/Modal";
import { showSuccessPopup } from "@utils";
import {
  ErrorServices,
  useCreateShortTermIncentiveMutation,
  useFetchCompanyJobGradesQuery,
  useFetchShortTermPlansQuery,
  useUpdateShortTermIncentiveMutation,
} from "@services";
import { useTypedSelector } from "@hooks";

const { Option } = Select;

interface IFormValues {
  grade: string | null;
  country_id: number | null;
  plan: { id: number; name: string } | null; // not-nullable
  is_all_grade: boolean;
  is_global: boolean;
  is_percentage: boolean;
  is_basic_pay: boolean;
  value: number | null; // not-nullable
}

interface IAddShortTermIncentive extends IModal {
  selectedShortTermIncentive: IShortTermIncentive | null;
  setSelectedShortTermIncentive: React.Dispatch<
    React.SetStateAction<IShortTermIncentive | null>
  >;
}

const AddShortTermIncentive: FC<IAddShortTermIncentive> = ({
  isVisible,
  setIsVisible,
  selectedShortTermIncentive,
  setSelectedShortTermIncentive,
}) => {
  const company_id = 1;
  const { data: plansData, isLoading: isFetchingPlans } =
    useFetchShortTermPlansQuery({ company_id });
  const { data: plans } = plansData || {};
  const { data: jobGradesData, isLoading: isFetchingGrades } =
    useFetchCompanyJobGradesQuery({ company_id });
  const { data: jobGrades } = jobGradesData || {};
  const { countries } = useTypedSelector(state => state?.countries);
  const [createShortTermIncentive, { isLoading: isCreating }] =
    useCreateShortTermIncentiveMutation();
  const [updateShortTermIncentive, { isLoading: isUpdating }] =
    useUpdateShortTermIncentiveMutation();
  const [planGrades, setPlanGrades] = useState<string[]>([]);
  const [planCountries, setPlanCountries] = useState<ICountry[]>([]);

  const [shortTermIncentive, setShortTermIncentive] = useState<IFormValues>({
    grade: null,
    country_id: null,
    plan: null,
    is_all_grade: false,
    is_global: false,
    is_percentage: false,
    is_basic_pay: false,
    value: null,
  });
  const gradeList = shortTermIncentive?.is_all_grade
    ? jobGrades?.map(({ grade }: IJobGrade) => grade)
    : planGrades;
  const countryList = shortTermIncentive?.is_global ? countries : planCountries;
  useEffect(() => {
    if (selectedShortTermIncentive) {
      console.log({ selectedShortTermIncentive });
      const {
        country,
        grade,
        plan,
        is_all_grade,
        is_basic_pay,
        is_percentage,
        is_global,
        value,
      } = selectedShortTermIncentive;
      setShortTermIncentive({
        country_id: country?.id || null,
        grade,
        value,
        is_all_grade,
        is_basic_pay,
        is_percentage,
        is_global,
        plan: { id: plan?.id, name: plan?.name },
      });
    }
    return () => {
      setSelectedShortTermIncentive(null);
    };
  }, [selectedShortTermIncentive, setSelectedShortTermIncentive]);

  const handleSubmit = async () => {
    try {
      console.log("shortTerm", shortTermIncentive);
      const { country_id, is_global, is_all_grade, grade, plan } =
        shortTermIncentive;
      const body = {
        ...shortTermIncentive,
        country_id: is_global ? null : country_id,
        grade: is_all_grade ? null : grade,
        plan: plan?.id,
        is_all_grade: grade ? is_all_grade : true,
        is_global: country_id ? is_global : true,
      };
      console.log("body", body);
      if (selectedShortTermIncentive) {
        await editShortTermIncentive(body);
      } else {
        await addShortTermIncentive(body);
      }
      setIsVisible(false);
      showSuccessPopup({
        title: `Short Team Incentive ${
          selectedShortTermIncentive ? "Updated!" : "Created!"
        }`,
        desc: `You have successfully ${
          selectedShortTermIncentive ? "updated the" : "created new"
        } short term incentive.`,
        role: "client",
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addShortTermIncentive = async (body: any) =>
    await createShortTermIncentive({ company_id, body }).unwrap();

  const editShortTermIncentive = async (body: any) =>
    await updateShortTermIncentive({
      company_id,
      id: selectedShortTermIncentive?.id,
      body,
    }).unwrap();

  return (
    <Modal
      width={544}
      footer={[
        <Button
          disabled={!shortTermIncentive?.value || !shortTermIncentive?.plan}
          onClick={handleSubmit}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedShortTermIncentive ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title={`${selectedShortTermIncentive ? "Update" : "Create"} a STI Plan`}
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={24}>
            <label>Plan</label>
            <Select
              disabled={!!selectedShortTermIncentive}
              loading={isFetchingPlans}
              size="large"
              showSearch={false}
              showArrow={true}
              value={shortTermIncentive?.plan?.name || undefined}
              placeholder="Select plan from here..."
              onChange={(serializedPlan: any) => {
                const { id, grades, name, countries } = JSON.parse(
                  serializedPlan
                ) as IShortTermPlan;
                console.log("TEST", JSON.parse(serializedPlan));
                setShortTermIncentive(prev => ({
                  ...prev,
                  plan: { id, name },
                  is_global: !countries.length,
                  is_all_grade: !grades.length,
                }));
                setPlanGrades(grades);
                setPlanCountries(countries);
              }}
            >
              {plans?.map((plan: IShortTermPlan) => (
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
              disabled={shortTermIncentive?.is_all_grade}
              value={shortTermIncentive?.grade || undefined}
              loading={
                selectedShortTermIncentive && isFetchingGrades ? true : false
              }
              showArrow={true}
              size="large"
              showSearch={false}
              placeholder="Select grade from here..."
              onChange={grade =>
                setShortTermIncentive(prev => ({
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
              disabled={shortTermIncentive?.is_global}
              value={shortTermIncentive?.country_id || undefined}
              showArrow={true}
              size="large"
              showSearch={false}
              placeholder="Select country from here..."
              onChange={country_id =>
                setShortTermIncentive(prev => ({
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
            <Checkbox
              checked={shortTermIncentive?.is_all_grade}
              onChange={event =>
                setShortTermIncentive(prev => ({
                  ...prev,
                  is_all_grade: event.target.checked,
                }))
              }
            >
              All Grades
            </Checkbox>
          </Col>
          <Col span={11}>
            <Checkbox
              checked={shortTermIncentive?.is_global}
              onChange={event =>
                setShortTermIncentive(prev => ({
                  ...prev,
                  is_global: event.target.checked,
                }))
              }
            >
              Global
            </Checkbox>
          </Col>
        </Row>
        <Row className="modal__row">
          <Col span={24}>
            <Input
              name="value"
              size="large"
              type="number"
              value={shortTermIncentive?.value || undefined}
              placeholder="Enter value here..."
              onChange={event =>
                setShortTermIncentive(prev => ({
                  ...prev,
                  value: +event?.target.value,
                }))
              }
            />
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <Checkbox
              checked={shortTermIncentive?.is_percentage}
              onChange={event =>
                setShortTermIncentive(prev => ({
                  ...prev,
                  is_percentage: event.target.checked,
                }))
              }
            >
              Percentage
            </Checkbox>
          </Col>
          <Col span={11}>
            <Checkbox
              checked={shortTermIncentive?.is_basic_pay}
              onChange={event =>
                setShortTermIncentive(prev => ({
                  ...prev,
                  is_basic_pay: event.target.checked,
                }))
              }
            >
              Basic Pay
            </Checkbox>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddShortTermIncentive;
