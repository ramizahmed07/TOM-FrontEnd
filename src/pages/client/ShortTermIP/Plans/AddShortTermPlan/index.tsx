import { LoadingOutlined } from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { FC, useEffect, useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import {
  ICountry,
  IJobGrade,
  IModal,
  IShortTermPlan,
  IPlanType,
} from "@/types";
import Modal from "@components/Modal";
import { showSuccessPopup } from "@utils";
import {
  ErrorServices,
  useCreateShortTermPlanMutation,
  useFetchCompanyJobGradesQuery,
  useFetchShortTermPlanTypesQuery,
  useUpdateShortTermPlanMutation,
} from "@services";
import { useTypedSelector } from "@hooks";

const { Option } = Select;

interface IFormValues {
  name: string;
  plan_type_id: null | number;
  country_ids: number[];
  grades: string[];
}

interface IAddShortTermPlan extends IModal {
  selectedShortTermPlan: IShortTermPlan | null;
  setSelectedShortTermPlan: React.Dispatch<
    React.SetStateAction<IShortTermPlan | null>
  >;
}

const AddShortTermPlan: FC<IAddShortTermPlan> = ({
  isVisible,
  setIsVisible,
  selectedShortTermPlan,
  setSelectedShortTermPlan,
}) => {
  const company_id = 1;
  const [isGlobal, setIsGlobal] = useState(false);
  const [isAllGrades, setIsAllGrades] = useState(false);
  const { data: planTypesData, isLoading: isFetchingTypes } =
    useFetchShortTermPlanTypesQuery(null);
  const { data: planTypes } = planTypesData || {};
  const { data: jobGradesData, isLoading: isFetchingGrades } =
    useFetchCompanyJobGradesQuery({ company_id });
  const { data: jobGrades } = jobGradesData || {};
  const { countries } = useTypedSelector(state => state?.countries);
  const [createShortTermPlan, { isLoading: isCreating }] =
    useCreateShortTermPlanMutation();
  const [updateShortTermPlan, { isLoading: isUpdating }] =
    useUpdateShortTermPlanMutation();
  const [shortTermPlan, setShortTermPlan] = useState<IFormValues>({
    name: "",
    plan_type_id: null,
    country_ids: [],
    grades: [],
  });

  useEffect(() => {
    if (selectedShortTermPlan) {
      console.log({ selectedShortTermPlan });
      const { grades, is_all_grade, is_global, name, countries, type } =
        selectedShortTermPlan;
      setShortTermPlan({
        grades,
        name,
        plan_type_id: type?.id,
        country_ids: countries?.map(({ id }) => id),
      });
      setIsGlobal(is_global);
      setIsAllGrades(is_all_grade);
    }
    return () => {
      setSelectedShortTermPlan(null);
    };
  }, [selectedShortTermPlan, setSelectedShortTermPlan]);

  const handleSubmit = async () => {
    try {
      const { grades, country_ids } = shortTermPlan;
      const body = {
        ...shortTermPlan,
        grades: isAllGrades ? [] : grades,
        country_ids: isGlobal ? [] : country_ids,
      };
      if (selectedShortTermPlan) {
        await editShortTermPlan(body);
      } else {
        await addShortTermPlan(body);
      }
      setIsVisible(false);
      showSuccessPopup({
        title: `Short Term Incentives Plan ${
          selectedShortTermPlan ? "Updated!" : "Created!"
        }`,
        desc: `You have successfully ${
          selectedShortTermPlan ? "updated the" : "created new"
        } short term plan.`,
        role: "client",
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addShortTermPlan = async (body: IFormValues) =>
    await createShortTermPlan({ company_id, body }).unwrap();

  const editShortTermPlan = async (body: IFormValues) =>
    await updateShortTermPlan({
      company_id,
      id: selectedShortTermPlan?.id,
      body,
    }).unwrap();

  return (
    <Modal
      footer={[
        <Button
          disabled={!shortTermPlan?.name || !shortTermPlan?.plan_type_id}
          onClick={handleSubmit}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedShortTermPlan ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title={`${selectedShortTermPlan ? "Update" : "Create"} a STI Plan`}
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Plan Name</label>
            <Input
              value={shortTermPlan?.name}
              onChange={e =>
                setShortTermPlan(prev => ({ ...prev, name: e?.target.value }))
              }
              size="large"
              placeholder="Enter plan name here..."
            />
          </Col>
          <Col span={11}>
            <label>Plan Type</label>
            <Select
              value={shortTermPlan?.plan_type_id || undefined}
              loading={isFetchingTypes}
              size="large"
              showSearch={false}
              showArrow={true}
              placeholder="Select plan type from here..."
              onChange={plan_type_id =>
                setShortTermPlan(prev => ({
                  ...prev,
                  plan_type_id,
                }))
              }
            >
              {planTypes?.map(({ id, name }: IPlanType) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Grades</label>
            <Select
              disabled={isAllGrades}
              loading={isFetchingGrades}
              mode="multiple"
              showArrow={true}
              size="large"
              showSearch={false}
              placeholder="Select grades from here..."
              value={shortTermPlan?.grades}
              onChange={grades =>
                setShortTermPlan(prev => ({ ...prev, grades }))
              }
            >
              {jobGrades?.map(({ grade, id }: IJobGrade) => (
                <Option key={id} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
            <Checkbox
              checked={isAllGrades}
              onChange={event => setIsAllGrades(event.target.checked)}
              className="mt-32"
            >
              All Grades
            </Checkbox>
          </Col>
          <Col span={11}>
            <label>Coverages</label>
            <Select
              disabled={isGlobal}
              mode="multiple"
              size="large"
              showSearch={true}
              showArrow={true}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={shortTermPlan?.country_ids}
              onChange={country_ids =>
                setShortTermPlan(prev => ({ ...prev, country_ids }))
              }
              placeholder="Select coverages from here..."
            >
              {countries?.map(({ id, name }: ICountry) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
            <br />
            <Checkbox
              checked={isGlobal}
              onChange={event => setIsGlobal(event.target.checked)}
              className="mt-32"
            >
              Global
            </Checkbox>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddShortTermPlan;
