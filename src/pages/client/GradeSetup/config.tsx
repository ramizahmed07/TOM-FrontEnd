import { Switch, TableColumnsType } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

import { ICountry, IJobGrade } from "@/types";

export const getColumns = ({
  deleteJobGrade,
  jobGrade_id,
  isDeleting,
  editJobGrade,
}: {
  isDeleting: boolean;
  deleteJobGrade: (id: number) => Promise<void>;
  jobGrade_id: React.MutableRefObject<any>;
  editJobGrade: (jobGrade: IJobGrade) => void;
}): TableColumnsType<any> => [
  {
    title: "job grade",
    dataIndex: "grade",
    key: "grade",
    width: 300,
  },
  {
    title: "countries",
    key: "countries",
    width: 250,
    render: (jobGrade: IJobGrade) =>
      jobGrade?.is_global! ? (
        "Global"
      ) : (
        <div>
          {jobGrade?.countries?.map(({ name }: ICountry) => name).join(", ")}
        </div>
      ),
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
    width: 250,
  },
  {
    title: "actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (jobGrade: IJobGrade) => (
      <>
        <div
          onClick={() => editJobGrade(jobGrade)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => deleteJobGrade(jobGrade?.id!)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && jobGrade?.id === jobGrade_id?.current ? (
            <LoadingOutlined color="red" className="spinner" />
          ) : (
            "Delete"
          )}
        </div>
      </>
    ),
  },
];

export const getVersionsColumns = ({
  handleActive,
  active,
}: {
  handleActive: (id: number) => Promise<void>;
  active: boolean;
}): TableColumnsType<any> => [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "15%",
  },
  {
    title: "created at",
    dataIndex: "created_at",
    key: "created_at",
    width: "35%",
    render: (date: string) => <div>{moment(date).format("do-MM-YYYY")}</div>,
  },
  {
    title: "Active",
    key: "active",
    width: "15%",
    align: "center",
    render: (version: any) => (
      <Switch
        onChange={checked => {
          if (!checked) return;
          handleActive(version?.id);
        }}
        checked={active || version?.is_active === "TRUE"}
        defaultChecked={version?.is_active === "TRUE"}
      />
    ),
  },
  {
    title: "action",
    key: "action",
    width: "15%",
    render: () => (
      <div className="table__action__btn table__action__btn--client">
        Download
      </div>
    ),
  },
];
