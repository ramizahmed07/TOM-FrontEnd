import React from "react";
import { Dropdown, Menu, message, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./style.less";
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
  useFetchAllSectorsMutation,
  useFetchBusinessUnitMutation,
} from "@services";
import { ICombineReducerProps } from "@store";
import { IBusinessUnitItem, IBusinessUnitState } from "@store/business-unit";

const BusinessUnits = () => {
  const sectorReducer = useSelector(
    (state: ICombineReducerProps) => state.sectors
  );
  const businessUnitReducer: IBusinessUnitState = useSelector(
    (state: ICombineReducerProps) => state.businessUnit
  );
  const history = useHistory();
  const [isVisible, setIsVisible] = React.useState(false);
  const [editBusinessUnitItem, setEditBusinessUnitItem] = React.useState(null);
  const [businessUnitId, setBusinessUnitId] = React.useState("");
  const [getBusinsesUnits, { isLoading }] = useFetchBusinessUnitMutation();
  const [deleteBusinessUnit] = useDeleteBusinessUnitMutation();
  const [fetchAllSectors] = useFetchAllSectorsMutation();
  const params: { company_id: string } = useParams();
  const company_id = params.company_id;

  React.useEffect(() => {
    fetchListFromApi();
  }, []);

  const fetchListFromApi = async () => {
    try {
      await getBusinsesUnits({ company_id }).unwrap();
      await fetchAllSectors("").unwrap();
      message.success("Successfully fetched list");
    } catch (error) {
      ErrorServices(error);
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
    item: IBusinessUnitItem;
  }) => {
    setBusinessUnitId(item?.id.toString());
    domEvent.stopPropagation();
    if (key === "2") {
      deleteBUFromApi(item?.id.toString());
    } else {
      editBUFromApi(item);
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
      render: ({ sector }) => sector && sector.name,
    },
    {
      title: "industy",
      key: "industry",
      width: "22%",
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
      render: ({ industry }) => industry && industry.name,
    },
    {
      title: "sub-industry",
      key: "sub_industry",
      width: "20%",
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
      render: ({ sub_industry }) => sub_industry && sub_industry.name,
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
    try {
      await deleteBusinessUnit({ company_id, business_unit_id }).unwrap();
      fetchListFromApi();
      setBusinessUnitId("");
    } catch (error) {
      ErrorServices(error);
    }
  };

  const editBUFromApi = (item: any) => {
    setEditBusinessUnitItem(item);
    setIsVisible(true);
  };

  const onCloseModal = () => {
    setBusinessUnitId("");
    setIsVisible(false);
    setEditBusinessUnitItem(null);
  };

  const onRowClick = (data: any) => {
    history.push(`${window.location.pathname}/${data?.id}`);
  };

  return (
    <div>
      <AddBusinessUnit
        allSectorList={sectorReducer.allSectors}
        isVisible={isVisible}
        setIsVisible={onCloseModal}
        company_id={company_id}
        editBusinessUnitItem={editBusinessUnitItem}
        fetchListFromApi={fetchListFromApi}
        businessUnitId={businessUnitId}
      />
      <Button
        variant="add"
        className="add__business_unit_btn"
        onClick={() => setIsVisible(true)}
      >
        Create business unit
      </Button>
      <Table
        isLoading={isLoading}
        data={businessUnitReducer.list}
        columns={columns}
        onRowClick={onRowClick}
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
