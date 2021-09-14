import { useHistory } from "react-router-dom";
import { Col, message, Row } from "antd";
import { useRef, useState } from "react";

import Table from "@components/Table";
import Button from "@components/Button";
import { getColumns } from "./config";
import {
  ErrorServices,
  useDeleteShortTermPlanMutation,
  useFetchShortTermPlansQuery,
} from "@services";
import { IShortTermPlan } from "@/types";
import { paths } from "@/router";
import AddShortTermPlan from "./AddShortTermPlan";
import UploadShortTermPlan from "./UploadShortTermPlan";

const ShortTermPlans = () => {
  const company_id = 1;
  const history = useHistory();
  const shortTermPlan_id = useRef<any>(null);
  const [page, setPage] = useState(1);

  const [isVisible, setIsVisible] = useState(false);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [selectedShortTermPlan, setSelectedShortTermPlan] =
    useState<IShortTermPlan | null>(null);
  const [deleteShortTermPlan, { isLoading: isDeleting }] =
    useDeleteShortTermPlanMutation();
  const { data: plansData, isLoading } = useFetchShortTermPlansQuery({
    company_id,
    page,
  });
  const { data, pagination } = plansData || {};

  const removeShortTermPlan = async (id: number) => {
    try {
      shortTermPlan_id.current = id;
      await deleteShortTermPlan({ company_id, id }).unwrap();
      message.success("Short term incentive plan successfully deleted!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const editShortTermPlan = (selectedShortTermPlan: IShortTermPlan) => {
    setSelectedShortTermPlan(selectedShortTermPlan);
    setIsVisible(true);
  };

  const columns = getColumns({
    isDeleting,
    shortTermPlan_id,
    removeShortTermPlan,
    editShortTermPlan,
  });

  return (
    <>
      {isUploadModal && (
        <UploadShortTermPlan
          isVisible={isUploadModal}
          setIsVisible={setIsUploadModal}
        />
      )}
      {isVisible && (
        <AddShortTermPlan
          selectedShortTermPlan={selectedShortTermPlan}
          setSelectedShortTermPlan={setSelectedShortTermPlan}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}

      <Row>
        <Col span={24}>
          <div className="main-heading">Short Term Plans</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            onClick={() => history.push(paths.client.short_term_ip.incentives)}
            icon={false}
            variant="download_client"
          >
            STI Data
          </Button>
          <Button
            onClick={() => setIsVisible(true)}
            variant="versions"
            icon={false}
          >
            Create STI Plan
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          scroll={1500}
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

export default ShortTermPlans;
