import { FC } from "react";
import { Col, Table as AntTable } from "antd";

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
