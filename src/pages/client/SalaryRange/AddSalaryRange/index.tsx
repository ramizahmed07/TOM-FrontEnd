import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, FC, useState } from "react";

import Modal from "@components/Modal";
import { generateArrayOfYears, showSuccessPopup } from "@utils";
import { ICountry, IJobGrade, ISalaryRange, IModal } from "@/types";
import {
  ErrorServices,
  useCreateSalaryRangeMutation,
  useFetchCompanyJobGradesQuery,
  useUpdateSalaryRangeMutation,
} from "@/services";

const { Option } = Select;

interface IAddSalaryRange extends IModal {
  selectedSalaryRange: ISalaryRange | null;
  setSelectedSalaryRange: React.Dispatch<
    React.SetStateAction<ISalaryRange | null>
  >;
}

const INITIAL_SALARY_RANGE = {
  grade: "",
  year: null,
  tier: null,
  country_id: null,
  city: "",
  range_type: "",
  salary_min: null,
  salary_mid: null,
  salary_max: null,
};

const AddSalaryRange: FC<IAddSalaryRange> = ({
  isVisible,
  setIsVisible,
  selectedSalaryRange,
  setSelectedSalaryRange,
}) => {
  const [salaryRange, setSalaryRange] =
    useState<ISalaryRange>(INITIAL_SALARY_RANGE);
  const [createSalaryRange, { isLoading: isCreating }] =
    useCreateSalaryRangeMutation();
  const [updateSalaryRange, { isLoading: isUpdating }] =
    useUpdateSalaryRangeMutation();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const { data: jobGradesData, isLoading: isFetchingGrades } =
    useFetchCompanyJobGradesQuery({ company_id: 1 });
  const { data: jobGrades } = jobGradesData || {};

  useEffect(() => {
    if (selectedSalaryRange) {
      const clonedSalaryRange = { ...selectedSalaryRange };
      delete clonedSalaryRange.country;
      delete clonedSalaryRange.id;
      setSalaryRange({
        ...clonedSalaryRange,
        country_id: selectedSalaryRange.country?.id,
      });
      setCountries([selectedSalaryRange?.country!]);
    }
    return () => {
      setSelectedSalaryRange(null);
      setSalaryRange(INITIAL_SALARY_RANGE);
    };
  }, [selectedSalaryRange, setSelectedSalaryRange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedSalaryRange) {
        await editSalaryRange();
      } else {
        await addSalaryRange();
      }
      setIsVisible(false);
      showSuccessPopup({
        title: selectedSalaryRange
          ? "Salary Range Updated"
          : "New Salary Range Created",
        desc: `You have successfully ${
          selectedSalaryRange ? "updated the" : "created new"
        } salary range.`,
        role: "client",
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addSalaryRange = async () =>
    await createSalaryRange({
      company_id: 1,
      body: { ...salaryRange },
    }).unwrap();

  const editSalaryRange = async () =>
    await updateSalaryRange({
      company_id: 1,
      id: selectedSalaryRange?.id,
      body: { ...salaryRange },
    }).unwrap();
  console.log("jobGrades", salaryRange);
  return (
    <Modal
      footer={[
        <Button
          disabled={
            !salaryRange.grade ||
            !salaryRange.country_id ||
            !salaryRange.city ||
            !salaryRange.range_type ||
            !salaryRange.salary_min ||
            !salaryRange.salary_mid ||
            !salaryRange.salary_max
          }
          onClick={handleSubmit}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedSalaryRange ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title={`${selectedSalaryRange ? "Update" : "Create"} Salary Range`}
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Grade</label>
            <Select
              // disabled={!!selectedSalaryRange}
              loading={isFetchingGrades}
              size="large"
              showArrow
              placeholder="Select grade from here..."
              showSearch={false}
              value={salaryRange?.grade || undefined}
              onChange={(serializedJobGrade: any) => {
                const { grade, countries } = JSON.parse(
                  serializedJobGrade
                ) as IJobGrade;

                setSalaryRange(prev => ({ ...prev, grade, country_id: null }));
                setCountries(countries!);
              }}
            >
              {jobGrades?.map((jobGrade: IJobGrade) => (
                <Option key={jobGrade.id} value={JSON.stringify(jobGrade)}>
                  {jobGrade?.grade}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Country</label>
            <Select
              disabled={!salaryRange?.grade}
              size="large"
              showArrow
              placeholder="Select country from here..."
              showSearch={false}
              value={salaryRange?.country_id || undefined}
              onChange={country_id =>
                setSalaryRange((prev: any) => ({
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
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>City</label>
            <Input
              onChange={handleChange}
              size="large"
              name="city"
              value={salaryRange?.city}
              placeholder="Enter city here..."
            />
          </Col>
          <Col span={11}>
            <label>Tier</label>
            <Input
              size="large"
              type="number"
              name="tier"
              onChange={handleChange}
              value={salaryRange?.tier || ""}
              placeholder="Enter tier here..."
            />
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Range Type</label>
            <Input
              size="large"
              name="range_type"
              onChange={handleChange}
              value={salaryRange?.range_type}
              placeholder="Enter range type here..."
            />
          </Col>
          <Col span={11}>
            <label>Year</label>
            <Select
              size="large"
              showArrow
              placeholder="Select year from here..."
              showSearch={false}
              value={salaryRange?.year || undefined}
            >
              {generateArrayOfYears(50)?.map(year => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={8}>
            <label>Min</label>
            <Input
              size="large"
              type="number"
              name="salary_min"
              onChange={handleChange}
              placeholder="Enter min here..."
              value={salaryRange?.salary_min || ""}
            />
          </Col>
          <Col span={7}>
            <label>Mid</label>
            <Input
              size="large"
              type="number"
              name="salary_mid"
              onChange={handleChange}
              placeholder="Enter mid here..."
              value={salaryRange?.salary_mid || ""}
            />
          </Col>
          <Col span={8}>
            <label>Max</label>
            <Input
              size="large"
              type="number"
              name="salary_max"
              onChange={handleChange}
              placeholder="Enter max here..."
              value={salaryRange?.salary_max || ""}
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddSalaryRange;
