import { useState } from "react";
import { Col, Dropdown, Menu, message, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";

import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import Table from "@components/Table";
import AddSector from "./AddSector";
import Button from "@components/Button";
import { useDeleteSectorMutation, useFetchSectorsQuery } from "@services";
import { IIndustry, ISector } from "@store/sectors";

const Sectors = () => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSector, setSelectedSector] = useState<ISector | null>(null);
  const { data, isLoading } = useFetchSectorsQuery(null);
  const [deleteSector] = useDeleteSectorMutation();

  const onRowClick = (data: any) => {
    history.push(`/sectors/${data?.id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSector({ id }).unwrap();
      message.success("Sector deleted successfully!");
    } catch (error) {
      message.error(error?.message);
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
    item: ISector;
  }) => {
    domEvent.stopPropagation();
    console.log(item);
    if (key === "2") {
      handleDelete(item?.id);
    } else {
      setSelectedSector(item);
      setIsVisible(true);
    }
  };

  const columns: TableColumnsType<ISector> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Sector",
      dataIndex: "name",
      key: "sector",
      width: "20%",
    },
    {
      title: "Industry",
      dataIndex: "industries",
      key: "industry",
      width: "55%",
      render: industries => {
        const names = industries?.map((industry: IIndustry) => industry.name);
        return <span>{names.join(", ")}</span>;
      },
    },
    {
      title: <span className="align-center">Actions</span>,
      key: "action",
      fixed: "right",
      width: "15%",
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

  return (
    <>
      <AddSector
        selectedSector={selectedSector}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <Row>
        <Col span={24}>
          <div className="main-heading">Sectors, Industry & Sub-Industry</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            variant="upload"
            onClick={() => console.log("upload job function")}
          >
            Upload Industries
          </Button>
          <Button
            variant="download"
            onClick={() => console.log("Download Job Functions")}
          >
            Download Industries
          </Button>
        </Col>
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={() => setIsVisible(true)}>
            Add New Sector
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          onRowClick={onRowClick}
          data={data}
          columns={columns}
          isLoading={isLoading}
        />
      </Row>
    </>
  );
};

export default Sectors;
