import { Col, message, Row } from "antd";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Table from "@components/Table";
import Button from "@components/Button";
import { getColumns } from "./config";
import AddLongTermPlan from "./AddLongTermPlan";
import {
  ErrorServices,
  useDeleteLongTermPlanMutation,
  useFetchLongTermPlansQuery,
} from "@services";
import { ILongTermPlan } from "@types";
import { paths } from "@router";

const LongTermPlans = () => {
  const company_id = 1;
  const history = useHistory();
  const longTermPlan_id = useRef<any>(null);
  const [page, setPage] = useState(1);
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

      <Row>
        <Col span={24}>
          <div className="main-heading">Long Term Incentive Plans</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            onClick={() => history.push(paths.client.long_term_ip.incentives)}
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
