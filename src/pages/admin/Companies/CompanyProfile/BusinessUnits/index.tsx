import React from "react";
import { Dropdown, Menu, TableColumnsType } from "antd";
import { useSelector } from "react-redux";

import AddBusinessUnit from "./AddBusinessUnit";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import BuildingImg from "@assets/images/building.png";
import Table from "@components/Table";
import Button from "@components/Button";
import EmptyMessage from "@pages/admin/Companies/CompanyProfile/EmptyMessage";
import {
  ErrorServices,
  useDeleteBusinessUnitMutation,
  useFetchBusinessUnitMutation,
} from "@services";
import { ICombineReducerProps } from "@store";
import { IBusinessUnitItem, IBusinessUnitState } from "@store/business-unit";
import { useParams } from "react-router-dom";

const BusinessUnits = () => {
  const businessUnitReducer: IBusinessUnitState = useSelector(
    (state: ICombineReducerProps) => state.businessUnit
  );
  const [isVisible, setIsVisible] = React.useState(false);
  const [getBusinsesUnits, { isLoading }] = useFetchBusinessUnitMutation();
  const [deleteBusinessUnit] = useDeleteBusinessUnitMutation();
  const params: { company_id: string } = useParams();
  const company_id = params.company_id;

  React.useEffect(() => {
    fetchListFromApi();
  }, []);

  const fetchListFromApi = async () => {
    await getBusinsesUnits({ company_id });
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
    item: IBusinessUnitItem;
  }) => {
    domEvent.stopPropagation();
    if (key === "2") {
      deleteBUFromApi(item?.id.toString());
    } else {
      // onEditJf(item);
    }
  };

  const columns: TableColumnsType<IBusinessUnitItem> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "business unit name",
      dataIndex: "name",
      key: "name",
      width: "18%",
    },
    {
      title: "sector",
      key: "sector",
      width: "15%",
      render: item => item.sector.name,
    },
    {
      title: "industy",
      key: "industry",
      width: "22%",
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
      render: item => item.industry.name,
    },
    {
      title: "sub-industry",
      key: "sub_industry",
      width: "20%",
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
      render: item => item.sub_industry.name,
    },
    {
      title: "region",
      dataIndex: "region_count",
      key: "region_count",
      width: "10%",
    },
    {
      title: <span className="align-center">action</span>,
      key: "action",
      fixed: "right",
      width: "10%",
      render: item => {
        const menu = (
          <Menu
            onClick={({ key, domEvent }) =>
              handleActionDropdown({ item, key, domEvent })
            }
            tabIndex={1}
          >
            <Menu.Item key="1">Edit</Menu.Item>
            <Menu.Item key="2" danger>
              Delete
            </Menu.Item>
          </Menu>
        );
        return (
          <div className="table__action__menu">
            <Dropdown overlay={menu} trigger={["click"]}>
              <MenuIcon
                onClick={e => {
                  e.stopPropagation();
                }}
              />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const deleteBUFromApi = async (business_unit_id: string) => {
    alert("inside del");
    try {
      await deleteBusinessUnit({ company_id, business_unit_id }).unwrap();
      fetchListFromApi();
    } catch (error) {
      ErrorServices(error);
    }
  };

  return (
    <div>
      <AddBusinessUnit isVisible={isVisible} setIsVisible={setIsVisible} />
      <Table
        isLoading={isLoading}
        data={businessUnitReducer.list}
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
              <Button variant="add" onClick={() => setIsVisible(true)}>
                Create business unit
              </Button>
            </EmptyMessage>
          ),
        }}
      />
    </div>
  );
};
export default BusinessUnits;
