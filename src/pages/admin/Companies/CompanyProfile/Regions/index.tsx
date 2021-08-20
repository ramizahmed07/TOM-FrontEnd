import { Row } from "antd";
import { useState } from "react";

import "./regions.less";
import Button from "@/components/Button";
import Table from "@components/Table";
import EmptyMessage from "../EmptyMessage";
import Globe from "@assets/images/international.png";
import AddRegion from "./AddRegion";
import { useFetchRegionsQuery } from "@services";
import { columns } from "./config";

const Regions = () => {
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { data: regionsData, isLoading } = useFetchRegionsQuery({ page });
  const { data: regions, pagination } = regionsData || {};

  return (
    <div className="regions">
      <AddRegion isVisible={isVisible} setIsVisible={setIsVisible} />
      <div
        className={`${
          !regions?.length && "regions__addBtn--hidden"
        } regions__addBtn`}
      >
        <Button variant="add" onClick={() => setIsVisible(true)}>
          Create region
        </Button>
      </div>
      <Row>
        <Table
          data={regions}
          columns={columns}
          isLoading={isLoading}
          pagination={true}
          count={pagination?.count}
          onChangePage={setPage}
          page={page}
          locale={{
            emptyText: (
              <EmptyMessage
                img={Globe}
                title="No Regions found"
                message="You didn’t created any regions for this
            company yet!"
              >
                <Button variant="add" onClick={() => setIsVisible(true)}>
                  Create region
                </Button>
              </EmptyMessage>
            ),
          }}
        />
      </Row>
    </div>
  );
};

export default Regions;
