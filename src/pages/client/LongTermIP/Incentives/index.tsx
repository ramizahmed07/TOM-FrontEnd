import { Col, message, Row } from "antd";
import { useState, useRef } from "react";

import Button from "@components/Button";
import Table from "@components/Table";
import {
  ErrorServices,
  useFetchLongTermIncentivesQuery,
  useDeleteLongTermIncentiveMutation,
} from "@services";
import { getColumns } from "./config";
import { ILongTermIncentive } from "@/types";
import AddLongTermIncentive from "./AddIncentive";
import LongTermIncentiveVersions from "./Versions";

const LongTermIncentives = () => {
  const company_id = 1;
  const longTermIncentive_id = useRef<any>(null);
  const [selectedLongTermIncentive, setSelectedLongTermIncentive] =
    useState<ILongTermIncentive | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVersionsModal, setIsVersionsModal] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteLongTermIncentive, { isLoading: isDeleting }] =
    useDeleteLongTermIncentiveMutation();
  const { data: incentives, isLoading } = useFetchLongTermIncentivesQuery({
    company_id,
    page,
  });
  const { data, pagination } = incentives || {};

  const editLongTermIncentive = (incentive: ILongTermIncentive) => {
    setSelectedLongTermIncentive(incentive);
    setIsVisible(true);
  };

  const removeLongTermIncentive = async (id: number) => {
    try {
      longTermIncentive_id.current = id;
      await deleteLongTermIncentive({ company_id, id });
      message.success("Long term incentive deleted successfully!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  return (
    <>
      {isVisible && (
        <AddLongTermIncentive
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          selectedLongTermIncentive={selectedLongTermIncentive}
          setSelectedLongTermIncentive={setSelectedLongTermIncentive}
        />
      )}
      {isVersionsModal && (
        <LongTermIncentiveVersions
          isVisible={isVersionsModal}
          setIsVisible={setIsVersionsModal}
        />
      )}
      <Row>
        <Col span={24}>
          <div className="main-heading">Long Term Incentives</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button variant="upload_client">Upload</Button>
          <Button variant="download_client">Download</Button>
          <Button
            onClick={() => setIsVersionsModal(true)}
            variant="versions"
            icon={false}
          >
            Versions
          </Button>
          <Button
            onClick={() => setIsVisible(true)}
            variant="versions"
            icon={false}
          >
            Create Long Term Incentive
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          scroll={1500}
          data={data}
          columns={getColumns({
            isDeleting,
            longTermIncentive_id,
            removeLongTermIncentive,
            editLongTermIncentive,
          })}
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

export default LongTermIncentives;
