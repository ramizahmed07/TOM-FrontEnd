import { Col, message, Row } from "antd";
import { useRef, useState } from "react";

import Modal from "@components/Modal";
import Table from "@components/Table";
import Button from "@components/Button";
import { versionsColumns, getColumns } from "./config";
import AddLongTermPlan from "./AddLongTermPlan";
import {
  ErrorServices,
  useDeleteLongTermPlanMutation,
  useFetchLongTermPlansQuery,
} from "@services";
import { ILongTermPlan } from "@/types";

const LongTermPlans = () => {
  const company_id = 1;
  const longTermPlan_id = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [versionsModal, setVersionsModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLongTermPlan, setSelectedLongTermPlan] =
    useState<ILongTermPlan | null>(null);
  const [deleteLongTermPlan, { isLoading: isDeleting }] =
    useDeleteLongTermPlanMutation();
  const { data: plansData, isLoading } = useFetchLongTermPlansQuery({
    company_id,
    page,
  });
  const { data, pagination } = plansData || {};

  const removeLongTermPlan = async (id: number) => {
    try {
      longTermPlan_id.current = id;
      await deleteLongTermPlan({ company_id, id }).unwrap();
      message.success("Long term incentive plan deleted successfully!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const editLongTermPlan = (selectedLongTermPlan: ILongTermPlan) => {
    setSelectedLongTermPlan(selectedLongTermPlan);
    setIsVisible(true);
  };

  const columns = getColumns({
    isDeleting,
    longTermPlan_id,
    removeLongTermPlan,
    editLongTermPlan,
  });

  return (
    <>
      {isVisible && (
        <AddLongTermPlan
          selectedLongTermPlan={selectedLongTermPlan}
          setSelectedLongTermPlan={setSelectedLongTermPlan}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}

      <Modal
        mode="versions"
        footer={null}
        title="Previous Versions of Cash Allowances"
        isVisible={versionsModal}
        width={855}
        setIsVisible={setVersionsModal}
      >
        <Table
          data={[
            {
              name: "2019_salary_range.xls",
              date: "29th-may-2019",
            },
            {
              name: "2020_salary_range.xls",
              date: "11th-may-2019",
            },
          ]}
          columns={versionsColumns}
          pagination={false}
        />
      </Modal>

      <Row>
        <Col span={24}>
          <div className="main-heading">Long Term Incentive Plans</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button variant="upload_client">Upload</Button>
          <Button variant="download_client">Download</Button>
          <Button
            onClick={() => setVersionsModal(true)}
            icon={false}
            variant="download_client"
          >
            LTI Data
          </Button>
          <Button
            onClick={() => setIsVisible(true)}
            variant="versions"
            icon={false}
          >
            Create LTI Plan
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          scroll={1800}
          data={data}
          columns={columns}
          isLoading={isLoading}
          pagination={true}
          count={pagination?.count}
          onChangePage={setPage}
          page={page}
        />
      </Row>
    </>
  );
};

export default LongTermPlans;
