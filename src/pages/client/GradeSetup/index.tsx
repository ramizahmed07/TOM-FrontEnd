import { useRef, useState } from "react";
import { Col, message, Row } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";
import {
  ErrorServices,
  useDeleteJobGradeMutation,
  useDownloadJobGradesQuery,
  useFetchCompanyJobGradesQuery,
  useFetchJobGradeVersionsQuery,
  useUploadJobGradesMutation,
} from "@services";
import { getColumns } from "./config";
import AddGrade from "./AddGrade";
import GradeSetupVersions from "./Versions";
import { IJobGrade, IVersion } from "@types";
import Upload from "@/components/Upload";

const GradeSetup = () => {
  const company_id = 1;
  const [page, setPage] = useState(1);
  let jobGrade_id = useRef<any>(null);
  const { data: jobGradesData, isLoading } = useFetchCompanyJobGradesQuery({
    company_id,
    page,
  });
  const { data, pagination } = jobGradesData || {};
  const [deleteJobGrade, { isLoading: isDeleting }] =
    useDeleteJobGradeMutation();
  const [isVisible, setIsVisible] = useState(false);
  const [isVersionsModal, setIsVersionsModal] = useState(false);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [selectedJobGrade, setSelectedJobGrade] = useState<null | IJobGrade>(
    null
  );
  const [download, setDownload] = useState(false);
  const [uploadFile, setUploadFile] = useState({
    file: null,
    active: false,
  });
  const { data: versionsData, isLoading: isFetchingVersions } =
    useFetchJobGradeVersionsQuery(
      {
        page: 1,
        company_id,
      },
      { skip: !download }
    );
  const { data: versions } = versionsData || {};
  const { isLoading: isDownloading } = useDownloadJobGradesQuery(
    {
      company_id,
      version_id: versions?.find(
        (version: IVersion) => version?.is_active === "TRUE"
      )["id"],
    },
    {
      skip: !versions?.length,
    }
  );
  const [uploadJobGrades, { isLoading: isUploading }] =
    useUploadJobGradesMutation();

  const removeJobGrade = async (id: number) => {
    try {
      jobGrade_id.current = id;
      await deleteJobGrade({ id, company_id });
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

  const handleUpload = async () => {
    const { file, active }: { file: any; active: boolean } = uploadFile;
    setIsUploadModal(false);
    try {
      const formData = new FormData();
      formData.append("attachment", file!, file?.name!);
      const res = await uploadJobGrades({
        company_id,
        active,
        body: formData,
      }).unwrap();
      message.success(res?.message);
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
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
        <GradeSetupVersions
          isVisible={isVersionsModal}
          setIsVisible={setIsVersionsModal}
        />
      )}
      {isUploadModal && (
        <Upload
          onSubmit={handleUpload}
          isVisible={isUploadModal}
          setIsVisible={setIsUploadModal}
          file={uploadFile}
          setFile={setUploadFile}
        />
      )}
      <Row>
        <Col span={24}>
          <div className="main-heading">Grade Setup</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            isLoading={isUploading}
            variant="upload_client"
            onClick={() => setIsUploadModal(true)}
          >
            Upload
          </Button>
          <Button
            isLoading={isFetchingVersions || isDownloading}
            onClick={() => setDownload(true)}
            variant="download_client"
          >
            Download
          </Button>{" "}
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
