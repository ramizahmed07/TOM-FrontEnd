import { Col, message, Row } from "antd";
import { useState, useRef } from "react";

import Button from "@components/Button";
import Table from "@components/Table";
import {
  ErrorServices,
  useDeleteShortTermIncentiveMutation,
  useFetchShortTermIncentivesQuery,
} from "@services";
import { getColumns } from "./config";
import AddShortTermIncentive from "./AddIncentive";
import { IShortTermIncentive } from "@types";
import ShortTermIncentiveVersions from "./Versions";

const ShortTermIncentives = () => {
  const company_id = 1;
  const shortTermIncentive_id = useRef<any>(null);
  const [selectedShortTermIncentive, setSelectedShortTermIncentive] =
    useState<IShortTermIncentive | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVersionsModal, setIsVersionsModal] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteShortTermIncentive, { isLoading: isDeleting }] =
    useDeleteShortTermIncentiveMutation();
  const { data: incentives, isLoading } = useFetchShortTermIncentivesQuery({
    company_id,
    page,
  });
  const { data, pagination } = incentives || {};

  const editShortTermIncentive = (incentive: IShortTermIncentive) => {
    setSelectedShortTermIncentive(incentive);
    setIsVisible(true);
  };

  const removeShortTermIncentive = async (id: number) => {
    try {
      shortTermIncentive_id.current = id;
      await deleteShortTermIncentive({ company_id, id });
      message.success("Short term incentive deleted successfully!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  return (
    <>
      {isVisible && (
        <AddShortTermIncentive
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          selectedShortTermIncentive={selectedShortTermIncentive}
          setSelectedShortTermIncentive={setSelectedShortTermIncentive}
        />
      )}
      {isVersionsModal && (
        <ShortTermIncentiveVersions
          isVisible={isVersionsModal}
          setIsVisible={setIsVersionsModal}
        />
      )}
      <Row>
        <Col span={24}>
          <div className="main-heading">Short Term Incentives</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            // onClick={() => setIsUploadModal(true)}
            variant="upload_client"
          >
            Upload
          </Button>
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
            Create Short Term Incentive
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          scroll={1500}
          data={data}
          columns={getColumns({
            isDeleting,
            shortTermIncentive_id,
            removeShortTermIncentive,
            editShortTermIncentive,
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

export default ShortTermIncentives;
