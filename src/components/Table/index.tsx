import React, { FC } from "react";
import {
  Col,
  Row,
  Table as AntTable,
  Dropdown,
  Menu,
  TableColumnsType,
} from "antd";

import "./table.less";

interface TableProps {
  data: any[];
  columns: any[];
}

const Table: FC<TableProps> = ({ columns, data }) => {
  return (
    <Col span={24}>
      <AntTable
        className="table"
        scroll={{ x: 1300 }}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </Col>
  );
};

export default Table;
