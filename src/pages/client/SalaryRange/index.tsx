import { Col, message, Row } from "antd";
import { useRef, useState } from "react";

import UploadSalaryRange from "./UploadSalaryRange";
import Button from "@components/Button";
import Table from "@components/Table";
import { getColumns } from "./config";
import {
  ErrorServices,
  useDeleteSalaryRangeMutation,
  useFetchCompanySalaryRangesQuery,
} from "@services";
import AddSalaryRange from "./AddSalaryRange";
import { ISalaryRange } from "@/types";
import SalaryRangeVersions from "./Versions";

const SalaryRange = () => {
  const salary_range_id = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [selectedSalaryRange, setSelectedSalaryRange] =
    useState<ISalaryRange | null>(null);
  const [isVersionsModal, setIsVersionsModal] = useState(false);
  const { data: salaryRanges, isLoading } = useFetchCompanySalaryRangesQuery({
    company_id: 1,
    page,
  });
  const { data, pagination } = salaryRanges || {};
  const [deleteSalaryRange, { isLoading: isDeleting }] =
    useDeleteSalaryRangeMutation();

  const editSalaryRange = (salaryRange: ISalaryRange) => {
    setSelectedSalaryRange(salaryRange);
    setIsVisible(true);
  };

  const removeSalaryRange = async (id: number) => {
    try {
      salary_range_id.current = id;
      await deleteSalaryRange({ company_id: 1, id }).unwrap();
      message.success("Salary range deleted successfully!");
    } catch (error) {
      ErrorServices(error);
    }
  };

  const columns = getColumns({
    editSalaryRange,
    isDeleting,
    salary_range_id,
    removeSalaryRange,
  });

  return (
    <>
      {isUploadModal && (
        <UploadSalaryRange
          isVisible={isUploadModal}
          setIsVisible={setIsUploadModal}
        />
      )}
      {isVisible && (
        <AddSalaryRange
          selectedSalaryRange={selectedSalaryRange}
          setSelectedSalaryRange={setSelectedSalaryRange}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
      {isVersionsModal && (
        <SalaryRangeVersions
          isVisible={isVersionsModal}
          setIsVisible={setIsVersionsModal}
        />
      )}

      <Row>
        <Col span={24}>
          <div className="main-heading">Salary Range</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            onClick={() => setIsUploadModal(true)}
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
            Create Salary Range
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          isLoading={isLoading}
          data={data}
          columns={columns}
          scroll={1300}
          pagination={true}
          count={pagination?.count}
          onChangePage={setPage}
          page={page}
        />
      </Row>
    </>
  );
};

export default SalaryRange;
