import { Col, message, Row } from "antd";
import { useState, useRef } from "react";

import Button from "@components/Button";
import Table from "@components/Table";
import { getColumns } from "./config";
import AddCashAllowance from "./AddCashAllowance";
import {
  useFetchCashAllowancesQuery,
  useDeleteCashAllowanceMutation,
  ErrorServices,
  useFetchCashAllowanceVersionsQuery,
  useDownloadCashAllowancesQuery,
  useUploadCashAllowancesMutation,
} from "@services";
import { ICashAllowance, IVersion } from "@types";
import CashAllowanceVersions from "./Versions";
import Upload from "@components/Upload";

const CashAllowances = () => {
  const company_id = 1;
  const cashAllowance_id = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [isVersionsModal, setIsVersionsModal] = useState(false);
  const [selectedCashAllowance, setSelectedCashAllowance] =
    useState<null | ICashAllowance>(null);
  const { data: cashAllowancesData, isLoading } = useFetchCashAllowancesQuery({
    company_id,
    page,
  });
  const [deleteCashAllowance, { isLoading: isDeleting }] =
    useDeleteCashAllowanceMutation();
  const { data, pagination } = cashAllowancesData || {};
  const [download, setDownload] = useState(false);
  const [uploadFile, setUploadFile] = useState({
    file: null,
    active: false,
  });

  const { data: versionsData, isLoading: isFetchingVersions } =
    useFetchCashAllowanceVersionsQuery(
      {
        page: 1,
        company_id,
      },
      { skip: !download }
    );
  const { data: versions } = versionsData || {};
  const { isLoading: isDownloading } = useDownloadCashAllowancesQuery(
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
    useUploadCashAllowancesMutation();

  const removeCashAllowance = async (id: number) => {
    try {
      cashAllowance_id.current = id;
      await deleteCashAllowance({ company_id, id }).unwrap();
      message.success("Cash allowance deleted successfully!");
    } catch (error) {
      cashAllowance_id.current = null;
      ErrorServices(error);
      console.log(error);
    }
  };

  const editCashAllowance = (cashAllowance: ICashAllowance) => {
    setSelectedCashAllowance(cashAllowance);
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
    removeCashAllowance,
    isDeleting,
    cashAllowance_id,
    editCashAllowance,
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
        <AddCashAllowance
          selectedCashAllowance={selectedCashAllowance}
          setSelectedCashAllowance={setSelectedCashAllowance}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
      {isVersionsModal && (
        <CashAllowanceVersions
          isVisible={isVersionsModal}
          setIsVisible={setIsVersionsModal}
        />
      )}

      <Row>
        <Col span={24}>
          <div className="main-heading">Cash Allowances</div>
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
            onClick={() => setDownload(true)}
            isLoading={isFetchingVersions || isDownloading}
            variant="download_client"
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
            Create Cash Allowance
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
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
export default CashAllowances;
