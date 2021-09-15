import { Col, message, Row } from "antd";
import { useRef, useState } from "react";

import Button from "@components/Button";
import Table from "@components/Table";
import { getColumns } from "./config";
import {
  ErrorServices,
  useDeleteSalaryRangeMutation,
  useDownloadSalaryRangesQuery,
  useFetchCompanySalaryRangesQuery,
  useFetchSalaryRangeVersionsQuery,
  useUploadSalaryRangesMutation,
} from "@services";
import AddSalaryRange from "./AddSalaryRange";
import { ISalaryRange, IVersion } from "@types";
import SalaryRangeVersions from "./Versions";
import Upload from "@components/Upload";

const SalaryRange = () => {
  const company_id = 1;
  const salary_range_id = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [selectedSalaryRange, setSelectedSalaryRange] =
    useState<ISalaryRange | null>(null);
  const [isVersionsModal, setIsVersionsModal] = useState(false);
  const { data: salaryRanges, isLoading } = useFetchCompanySalaryRangesQuery({
    company_id,
    page,
  });
  const { data, pagination } = salaryRanges || {};
  const [deleteSalaryRange, { isLoading: isDeleting }] =
    useDeleteSalaryRangeMutation();
  const [download, setDownload] = useState(false);
  const [uploadFile, setUploadFile] = useState({
    file: null,
    active: false,
  });

  const { data: versionsData, isLoading: isFetchingVersions } =
    useFetchSalaryRangeVersionsQuery(
      {
        page: 1,
        company_id,
      },
      { skip: !download }
    );
  const { data: versions } = versionsData || {};
  const { isLoading: isDownloading } = useDownloadSalaryRangesQuery(
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
    useUploadSalaryRangesMutation();

  const editSalaryRange = (salaryRange: ISalaryRange) => {
    setSelectedSalaryRange(salaryRange);
    setIsVisible(true);
  };

  const removeSalaryRange = async (id: number) => {
    try {
      salary_range_id.current = id;
      await deleteSalaryRange({ company_id, id }).unwrap();
      message.success("Salary range deleted successfully!");
    } catch (error) {
      ErrorServices(error);
    }
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
    editSalaryRange,
    isDeleting,
    salary_range_id,
    removeSalaryRange,
  });

  return (
    <>
      {isUploadModal && (
        <Upload
          onSubmit={handleUpload}
          isVisible={isUploadModal}
          setIsVisible={setIsUploadModal}
          file={uploadFile}
          setFile={setUploadFile}
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
            isLoading={isUploading}
          >
            Upload
          </Button>
          <Button
            isLoading={isFetchingVersions || isDownloading}
            variant="download_client"
            onClick={() => setDownload(true)}
          >
            Download
          </Button>
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
