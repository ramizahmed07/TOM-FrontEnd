import { Col, message, Row } from "antd";
import { useState } from "react";

import Button from "@components/Button";
import Table from "@components/Table";
import Modal from "@components/Modal";
import UploadCashAllowance from "./UploadCashAllowance";
import { getColumns } from "./config";
import AddCashAllowance from "./AddCashAllowance";
import {
  useFetchCashAllowancesQuery,
  useDeleteCashAllowanceMutation,
  ErrorServices,
} from "@services";
import { useRef } from "react";
import { ICashAllowance } from "@/types";
import CashAllowanceVersions from "./Versions";

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

  const columns = getColumns({
    removeCashAllowance,
    isDeleting,
    cashAllowance_id,
    editCashAllowance,
  });

  return (
    <>
      {isVisible && (
        <AddCashAllowance
          selectedCashAllowance={selectedCashAllowance}
          setSelectedCashAllowance={setSelectedCashAllowance}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
      {isUploadModal && (
        <UploadCashAllowance
          isVisible={isUploadModal}
          setIsVisible={setIsUploadModal}
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
            Create Cash Allowance
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          //   onRowClick={onRowClick}
          data={data}
          columns={columns}
          // scroll={1300}
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
