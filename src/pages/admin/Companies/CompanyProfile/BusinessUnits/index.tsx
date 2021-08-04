import { Dropdown, Menu, TableColumnsType } from "antd";

import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import BuildingImg from "@assets/images/building.png";
import Table from "@/components/Table";
import EmptyMessage from "@pages/admin/Companies/CompanyProfile/EmptyMessage";
import AddBtn from "@/components/Buttons/AddButton";
import AddBusinessUnit from "./AddBusinessUnit";
import { useState } from "react";

const columns: TableColumnsType<TableRow> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "business unit name",
    dataIndex: "businessUnitName",
    key: "businessUnitName",
    width: "18%",
  },
  {
    title: "sector",
    dataIndex: "sector",
    key: "sector",
    width: "15%",
  },
  {
    title: "industy",
    dataIndex: "industry",
    key: "industry",
    width: "22%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: "sub-industry",
    dataIndex: "subIndustry",
    key: "subIndustry",
    width: "20%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: "region",
    dataIndex: "region",
    key: "region",
    width: "10%",
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

type TableRow = {
  id: string;
  businessUnitName: string;
  sector: string;
  industry: string;
  subIndustry: string;
  region: string;
};

const data: TableRow[] = [];

const BusinessUnits = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <AddBusinessUnit isVisible={isVisible} setIsVisible={setIsVisible} />
      <Table
        data={data}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: (
            <EmptyMessage
              img={BuildingImg}
              title="No business unit found"
              message="You didn’t added any business unit for this
            company yet!"
            >
              <AddBtn onClick={() => setIsVisible(true)}>
                Create business unit
              </AddBtn>
            </EmptyMessage>
          ),
        }}
      />
    </div>
  );
};
export default BusinessUnits;
