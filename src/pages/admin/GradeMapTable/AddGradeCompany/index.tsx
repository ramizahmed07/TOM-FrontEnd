/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Input, message, Row, Select } from "antd";
import { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./addGradeCompany.less";
import Table from "@components/Table";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import {
  useCreateGradeCompanyMutation,
  useFetchGradeClientCompaniesQuery,
  useFetchGradeCompaniesQuery,
  useUpdateGradeCompanyMutation,
} from "@services";
import { useTypedSelector } from "@hooks";
import {
  IGradeClientCompany,
  IGradeCompany,
  IGradeCompanyRank,
} from "@store/grade";
import { getRows, showSuccessPopup } from "@utils";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

const default_cols = [
  {
    title: "ta rank",
    dataIndex: "rank",
    key: "taRank",
    width: "10%",
  },
];

const AddGradeCompany = () => {
  const { pathname, state } = useLocation<{
    grade_company: IGradeCompany;
  }>();
  const history = useHistory();
  const isEdit =
    pathname.includes("edit") && state?.grade_company?.grade_company_ranks;
  const { allGradeCompanies, taRanks } = useTypedSelector(state => state.grade);
  const [companies, setCompanies] = useState<string[]>([]);
  const { data: gradeClientCompanies, isLoading: isLoadingClientCompanies } =
    useFetchGradeClientCompaniesQuery(null);
  const { data: gradeCompanies, isLoading: isLoadingGradeCompanies } =
    useFetchGradeCompaniesQuery(null);
  const [createGradeCompany, { isLoading: isCreating }] =
    useCreateGradeCompanyMutation();
  const [updateGradeCompany, { isLoading: isUpdating }] =
    useUpdateGradeCompanyMutation();

  const [companyName, setCompanyName] = useState<string>(
    isEdit ? state?.grade_company?.name : ""
  );
  const [newCompany, setNewCompany] = useState(() =>
    isEdit
      ? state?.grade_company?.grade_company_ranks?.map(
          ({ rank, ta_rank_id }: IGradeCompanyRank) => ({
            rank: !rank?.length ? null : rank,
            ta_rank_id,
          })
        )
      : taRanks?.map(rank => ({ ta_rank_id: rank.id, rank: null }))
  );
  console.log("newCompany", newCompany);
  const additional_cols: any = useMemo(() => {
    return (
      allGradeCompanies?.map((company: IGradeCompany) => ({
        title: company.name,
        dataIndex: company.name.replace(" ", ""),
        key: company.id,
        width: "10%",
      })) || []
    );
  }, [allGradeCompanies]);
  const columns = [...default_cols, ...additional_cols];

  const rows = getRows(taRanks, allGradeCompanies) || [];

  // @TODO == DELETE GRADE COMPANY
  // const handleDeleteGradeCompany = async (
  //   id: number,
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   event.stopPropagation();
  //   grade_company_id.current = id;
  //   try {
  //     await deleteGradeCompany({ id });
  //     message.success("Industry deleted successfully!");
  //   } catch (error) {
  //     message.error("Could not delete industry.");
  //     console.log(error);
  //   }
  // };

  /**
   * The purpose below is to show/hide and sort the columns
   * it relies on companies dropdown
   */
  const cols = useMemo(() => {
    const cols = [
      ...columns
        .filter(
          column =>
            companies.includes(column.title) || column.dataIndex === "rank"
        )
        .slice()
        .sort(function (a, b) {
          if (a.dataIndex === "name") return 1;
          return (
            companies.indexOf(a.dataIndex) - companies.indexOf(b.dataIndex)
          );
        }),
      {
        title: companyName || "Name here...",
        dataIndex: "name",
        key: "name",
        width: 50,

        render: (_: any, item: any) => {
          return (
            <Input
              className="table__input"
              size="middle"
              value={newCompany[item?.rank - 1]?.rank || ""}
              onChange={e =>
                setNewCompany((prev: any) => {
                  const arr = [...prev];
                  arr[item?.rank - 1].rank = e.target.value;
                  return arr;
                })
              }
              placeholder="Enter grade here..."
            />
          );
        },
      },
    ];
    return cols;
  }, [companies, columns]);

  const handleDropdown = (value: string[]) => {
    setCompanies(value);
  };

  const addGrade = () => {};

  const onCancel = () => {
    setInitialState();
    history.goBack();
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await editGradeCompany();
      } else {
        await addGradeCompany();
      }
      showSuccessPopup({
        title: isEdit ? "Grade Company Updated" : "New Grade Company Added",
        desc: `You have successfully ${
          isEdit ? "updated the" : "added new"
        } grade company`,
      });
    } catch (error) {
      message.success(error?.message);
      console.log(error);
    }
  };

  const addGradeCompany = async () => {
    const company_id = gradeClientCompanies.find(
      (company: IGradeClientCompany) => company.name === companyName
    ).id;
    await createGradeCompany({
      company_id,
      grades: newCompany,
    });
    setInitialState();
  };

  const editGradeCompany = async () =>
    await updateGradeCompany({
      id: state?.grade_company?.id,
      grades: newCompany,
    });

  const setInitialState = () => {
    setNewCompany(taRanks?.map(rank => ({ ta_rank_id: rank.id, rank: null })));
    setCompanyName("");
  };
  console.log("newCompany", newCompany);
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">
            {isEdit ? "Update company" : "Add new company"}
          </div>
        </Col>
      </Row>
      <div className="addGradeCompany">
        <Row className="addGradeCompany__header">
          <div className="sub-heading">Basic information</div>
        </Row>
        <Row justify="space-between" className="addGradeCompany__fields">
          <Col span={9}>
            <label>Company name</label>
            <Select
              loading={isLoadingClientCompanies}
              value={companyName.length ? companyName : undefined}
              size="large"
              showArrow
              placeholder="Select company name from here..."
              showSearch={false}
              onChange={(name: string) => setCompanyName(name)}
            >
              {gradeClientCompanies?.map(
                ({ name, id }: IGradeClientCompany) => (
                  <Option key={id} value={name}>
                    {name}
                  </Option>
                )
              )}
            </Select>
          </Col>
          {!isEdit ? (
            <>
              <Col span={9}>
                <label>
                  Choose company{" "}
                  <span className="addGradeCompany__fields--optional">
                    (optional)
                  </span>
                </label>
                <Select
                  loading={isLoadingGradeCompanies}
                  value={companies}
                  size="large"
                  showArrow
                  mode="multiple"
                  placeholder="Select industry from here..."
                  showSearch={false}
                  onChange={handleDropdown}
                >
                  {gradeCompanies?.map(
                    ({ name, id }: { name: string; id: number }) => (
                      <Option key={id} value={name}>
                        {name}
                      </Option>
                    )
                  )}
                </Select>
              </Col>
              <Col span={3} />
            </>
          ) : null}
        </Row>
        <Row>
          <div className="sub-heading addGradeCompany__title">
            {`${isEdit ? "Update" : "Create"} Grade Table`}
          </div>

          <Table pagination={false} columns={[...cols]} data={rows} />
          <div className="addGradeCompany__lastRow">
            <div
              onClick={addGrade}
              className="addGradeCompany__lastRow__button"
            >
              <PlusIcon fill="#2f49d1" />
              Add Grade
            </div>
          </div>
        </Row>
      </div>
      <div className="addGradeCompany__buttons">
        <Button
          disabled={!isEdit && !companyName.length}
          onClick={handleSubmit}
          type="primary"
        >
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : (
            `${isEdit ? "Update" : "Add"} Grade Company`
          )}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </>
  );
};

export default AddGradeCompany;
