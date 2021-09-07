import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Modal from "@components/Modal";
import { IModal } from "@/types";
import { useTypedSelector } from "@hooks";
import { ICountry } from "@store/countries";
import {
  ErrorServices,
  useCreateRegionMutation,
  useFetchAllBusinessUnitsQuery,
  useUpdateRegionMutation,
} from "@services";
import { showSuccessPopup } from "@utils";
import { IRegion } from "@store/companies";

const { Option } = Select;

interface IAddRegion extends IModal {
  selectedRegion: IRegion | null;
  setSelectedRegion: React.Dispatch<React.SetStateAction<IRegion | null>>;
}

const INITIAL_STATE: IRegion = {
  name: "",
  countries: [],
  business_units: [],
};

const AddRegion: React.FC<IAddRegion> = ({
  selectedRegion,
  setSelectedRegion,
  isVisible,
  setIsVisible,
}) => {
  const { company_id } = useParams<{ company_id: string }>();
  const [region, setRegion] = useState(INITIAL_STATE);
  const { data: businessUnits, isLoading } = useFetchAllBusinessUnitsQuery({
    company_id,
  });
  const { data } = businessUnits || {};
  const [createRegion, { isLoading: isCreating }] = useCreateRegionMutation();
  const [updateRegion, { isLoading: isUpdating }] = useUpdateRegionMutation();
  const { countries: countriesList } = useTypedSelector(
    state => state.countries
  );

  const {
    name,
    countries: country_ids,
    business_units: business_unit_ids,
    id,
  } = region || {};

  useEffect(() => {
    if (selectedRegion) {
      setRegion({
        ...selectedRegion,
        countries: selectedRegion?.countries.map((country: any) => country?.id),
        business_units: selectedRegion?.business_units.map(
          (unit: any) => unit?.id
        ),
      } as IRegion);
    }
    return () => {
      setSelectedRegion(null);
    };
  }, [selectedRegion, setSelectedRegion]);

  const onSubmit = async () => {
    try {
      if (selectedRegion) editRegion();
      else addRegion();
      setIsVisible(false);
      showSuccessPopup({
        title: `Region ${selectedRegion ? "Updated" : "Created"}`,
        desc: `You have successfully ${
          selectedRegion ? "updated" : "create"
        } a region.`,
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addRegion = async () =>
    await createRegion({
      body: {
        id,
        name,
        country_ids,
        business_unit_ids,
      },
      company_id,
    }).unwrap();

  const editRegion = async () =>
    await updateRegion({
      body: { id, name, country_ids, business_unit_ids },
      company_id,
    });

  return (
    <Modal
      footer={[
        <Button
          onClick={onSubmit}
          disabled={!region.name.length}
          key="1"
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : (
            `${selectedRegion ? "Update" : "Create"} Region`
          )}
        </Button>,
        <Button key="2" onClick={() => setIsVisible(false)}>
          Cancel
        </Button>,
      ]}
      title="Create a Region"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name of a region</label>
            <Input
              onChange={e =>
                setRegion(prev => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter business unit name here..."
              size="large"
              value={region.name}
            />
          </Col>
        </Row>
        <div className="sub-heading mb-32">
          Add Countries and Business Units
        </div>

        <Row justify="space-between">
          <Col span={11}>
            <label>Select countries</label>
            <Select
              value={region?.countries as number[]}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select countries from here..."
              showSearch={false}
              onChange={(val: number[]) =>
                setRegion(prev => ({
                  ...prev,
                  countries: val as number[],
                }))
              }
            >
              {countriesList.map(({ name, id }: ICountry) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Select business units</label>
            <Select
              value={region?.business_units as number[]}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select business units from here..."
              showSearch={false}
              onChange={(val: number[]) =>
                setRegion(prev => ({
                  ...prev,
                  business_units: val as number[],
                }))
              }
            >
              {data?.map(({ name, id }: { name: string; id: number }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddRegion;
