import { useParams } from "react-router-dom";
import { message, Row } from "antd";
import { useState } from "react";

import "./regions.less";
import Button from "@/components/Button";
import Table from "@components/Table";
import EmptyMessage from "../EmptyMessage";
import Globe from "@assets/images/international.png";
import AddRegion from "./AddRegion";
import {
  ErrorServices,
  useDeleteRegionMutation,
  useFetchRegionsQuery,
} from "@services";
import { getColumns } from "./config";
import { IRegion } from "@store/companies";

const Regions = () => {
  const [page, setPage] = useState(1);
  const { company_id } = useParams<{ company_id: string }>();
  const [isVisible, setIsVisible] = useState(false);
  const { data: regionsData, isLoading } = useFetchRegionsQuery({
    id: company_id,
    page,
  });
  const [deleteRegion] = useDeleteRegionMutation();
  const { data: regions, pagination } = regionsData || {};
  const [selectedRegion, setSelectedRegion] = useState<null | IRegion>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteRegion({ company_id, region_id: id }).unwrap();
      message.success("Sector deleted successfully!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const handleActionDropdown = ({
    item,
    key,
    domEvent,
  }: {
    key: string;
    domEvent:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>;
    item: IRegion;
  }) => {
    domEvent.stopPropagation();
    if (key === "2") {
      handleDelete(item?.id!);
    } else {
      setSelectedRegion(item);
      setIsVisible(true);
    }
  };

  const columns = getColumns(handleActionDropdown);

  return (
    <div className="regions">
      {isVisible ? (
        <AddRegion
          setSelectedRegion={setSelectedRegion}
          selectedRegion={selectedRegion}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      ) : null}
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
