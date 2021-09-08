import { LoadingOutlined } from "@ant-design/icons";
import { FC, useState, useEffect } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import Modal from "@components/Modal";
import {
  ErrorServices,
  useCreateJobGradeMutation,
  useFetchCompanyCountriesQuery,
  useUpdateJobGradeMutation,
} from "@services";
import { ICountry, IJobGrade, IModal } from "@/types";
import { showSuccessPopup } from "@utils";

const { Option } = Select;

interface IAddGrade extends IModal {
  selectedJobGrade: IJobGrade | null;
  setSelectedJobGrade: React.Dispatch<React.SetStateAction<IJobGrade | null>>;
}

const AddGrade: FC<IAddGrade> = ({
  isVisible,
  setIsVisible,
  selectedJobGrade,
  setSelectedJobGrade,
}) => {
  const [jobGrade, setJobGrade] = useState<IJobGrade>({
    grade: "",
    type: null,
    country_ids: [],
  });
  const { data: countries, isLoading: isFetchingCountries } =
    useFetchCompanyCountriesQuery({
      company_id: 1,
    });
  const { data } = countries || {};
  const [createJobGrade, { isLoading: isCreating }] =
    useCreateJobGradeMutation();
  const [updateJobGrade, { isLoading: isUpdating }] =
    useUpdateJobGradeMutation();

  useEffect(() => {
    if (selectedJobGrade) {
      const { grade, type, countries } = selectedJobGrade;
      setJobGrade({
        grade,
        type,
        country_ids: countries?.map(country => country.id),
      });
    }
    return () => {
      setSelectedJobGrade(null);
    };
  }, [selectedJobGrade, setSelectedJobGrade]);

  const handleSubmit = async () => {
    try {
      if (selectedJobGrade) {
        await editJobGrade();
      } else {
        await addJobGrade();
      }
      setIsVisible(false);
      showSuccessPopup({
        title: selectedJobGrade ? "Job Grade Updated" : "New Job Grade Created",
        desc: `You have successfully ${
          selectedJobGrade ? "updated the" : "created new"
        } job grade.`,
        role: "client",
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addJobGrade = async () =>
    await createJobGrade({
      company_id: 1,
      body: { ...jobGrade },
    }).unwrap();

  const editJobGrade = async () =>
    await updateJobGrade({
      company_id: 1,
      id: selectedJobGrade?.id,
      body: { ...jobGrade },
    }).unwrap();

  return (
    <Modal
      width={544}
      footer={[
        <Button
          disabled={!jobGrade.grade}
          onClick={handleSubmit}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedJobGrade ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title={`${selectedJobGrade ? "Update" : "Create"} Job Grade`}
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Grade</label>
            <Input
              size="large"
              name="grade"
              value={jobGrade.grade}
              onChange={e =>
                setJobGrade(prev => ({ ...prev, grade: e.target.value }))
              }
              placeholder="Enter grade here..."
            />
          </Col>
          <Col span={11}>
            <label>Type</label>
            <Input
              size="large"
              name="type"
              value={jobGrade.type || ""}
              onChange={e =>
                setJobGrade(prev => ({ ...prev, type: e.target.value }))
              }
              placeholder="Enter type here..."
            />
          </Col>
        </Row>
        <Row className="modal__row">
          <Col span={24}>
            <label>Countries</label>
            <Select
              size="large"
              showArrow
              placeholder="Select industry from here..."
              showSearch={false}
              loading={isFetchingCountries}
              value={jobGrade?.country_ids}
              mode="multiple"
              onChange={val =>
                setJobGrade(prev => ({ ...prev, country_ids: val }))
              }
            >
              {data?.map((country: ICountry) => (
                <Option key={country?.id} value={country?.id}>
                  {country?.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddGrade;
