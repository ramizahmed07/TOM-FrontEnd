import { Dropdown, Menu, TableColumnsType } from "antd";
import { useState } from "react";

import "./regions.less";
import Button from "@/components/Button";
import Table from "@components/Table";
import EmptyMessage from "../EmptyMessage";
import Globe from "@assets/images/international.png";
import AddRegion from "./AddRegion";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import { useFetchRegionsQuery } from "@/services";
import { ICountry } from "@/store/countries";

type TableRow = {
  id: string;
  businessUnitName: string;
  sector: string;
  industry: string;
  subIndustry: string;
  region: string;
};

const columns: TableColumnsType<TableRow> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "region name",
    dataIndex: "name",
    key: "name",
    width: "15%",
  },

  {
    title: "Countries",
    dataIndex: "countries",
    key: "countries",
    width: "35%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
    render: (countries: ICountry[]) => (
      <div className="regions__table__countries">
        {countries?.map(({ name }) => name).join(", ")}
      </div>
    ),
  },
  {
    title: "business unit",
    dataIndex: "businessUnit",
    key: "businessUnit",
    width: "35%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },

  {
    title: <span className="align-center">action</span>,
    key: "action",
    fixed: "right",
    width: "10%",
    render: () => {
      const menu = (
        <Menu>
          <Menu.Item className="table__action__item">Edit</Menu.Item>
          <Menu.Item danger className="table__action__item">
            Delete
          </Menu.Item>
        </Menu>
      );
      return (
        <div className="table__action__menu">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            className="table__action__dropdown"
          >
            <MenuIcon />
          </Dropdown>
        </div>
      );
    },
  },
];

const Regions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: regionsData, isLoading } = useFetchRegionsQuery({});
  const { data: regions, pagination } = regionsData || {};

  console.log("regionsData", regionsData);
  return (
    <div className="regions">
      <AddRegion isVisible={isVisible} setIsVisible={setIsVisible} />
      <div
        className={`${
          !regions.length && "regions__addBtn--hidden"
        } regions__addBtn`}
      >
        <Button variant="add" onClick={() => setIsVisible(true)}>
          Create region
        </Button>
      </div>

      <Table
        data={regions}
        columns={columns}
        pagination={false}
        isLoading={isLoading}
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
    </div>
  );
};

export default Regions;
