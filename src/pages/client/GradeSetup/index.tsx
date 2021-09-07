import { useRef, useState } from "react";
import { Col, message, Row } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";
import {
  ErrorServices,
  useDeleteJobGradeMutation,
  useFetchCompanyJobGradesQuery,
} from "@services";
import { getColumns, IJobGrade } from "./config";
import AddGrade from "./AddGrade";
import Versions from "./Versions";

const GradeSetup = () => {
  const [page, setPage] = useState(1);
  let jobGrade_id = useRef<any>(null);
  const { data: jobGradesData, isLoading } = useFetchCompanyJobGradesQuery({
    company_id: 1,
    page,
  });
  const [deleteJobGrade, { isLoading: isDeleting }] =
    useDeleteJobGradeMutation();
  const [isVisible, setIsVisible] = useState(false);
  const [isVersionsModal, setIsVersionsModal] = useState(false);
  const [selectedJobGrade, setSelectedJobGrade] = useState<null | IJobGrade>(
    null
  );
  const { data, pagination } = jobGradesData || {};

  const removeJobGrade = async (id: number) => {
    try {
      jobGrade_id.current = id;
      await deleteJobGrade({ id, company_id: 1 });
      message.success("Job Grade deleted successfully!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const editJobGrade = (jobGrade: IJobGrade) => {
    setSelectedJobGrade(jobGrade);
    setIsVisible(true);
  };

  const columns = getColumns({
    deleteJobGrade: removeJobGrade,
    jobGrade_id,
    isDeleting,
    editJobGrade,
  });

  return (
    <>
      {isVisible && (
        <AddGrade
          selectedJobGrade={selectedJobGrade}
          setSelectedJobGrade={setSelectedJobGrade}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}

      {isVersionsModal && (
        <Versions
          isVisible={isVersionsModal}
          setIsVisible={setIsVersionsModal}
        />
      )}
      <Row>
        <Col span={24}>
          <div className="main-heading">Grade Setup</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button variant="upload_client">Upload</Button>
          <Button variant="download_client">Download</Button>{" "}
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
            Create Job Grade
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          data={data}
          isLoading={isLoading}
          columns={columns}
          pagination={true}
          count={pagination?.count}
          onChangePage={setPage}
          page={page}
        />
      </Row>
    </>
  );
};

export default GradeSetup;
