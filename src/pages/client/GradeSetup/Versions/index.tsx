import { FC, useState } from "react";

import Table from "@components/Table";
import Modal from "@components/Modal";
import { IModal } from "@/types";
import { getVersionsColumns } from "../config";
import {
  ErrorServices,
  useFetchJobGradeVersionsQuery,
  useUpdateJobGradeVersionMutation,
} from "@/services";

const Versions: FC<IModal> = ({ isVisible, setIsVisible }) => {
  const { data: versions, isLoading } = useFetchJobGradeVersionsQuery({
    page: 1,
    company_id: 1,
  });
  const [updateJobGradeVersion, { isLoading: isUpdating }] =
    useUpdateJobGradeVersionMutation();
  const { pagination, data } = versions || {};
  const [active, setActive] = useState(false);

  const handleActive = async (id: number) => {
    console.log("ID: ", id);
    try {
      await updateJobGradeVersion({ id, company_id: 1 }).unwrap();
      setActive(active);
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const versionsColumns = getVersionsColumns({ handleActive, active });
  return (
    <Modal
      mode="versions"
      footer={null}
      title="Previous Versions of Salary Range"
      isVisible={isVisible}
      width={855}
      setIsVisible={setIsVisible}
    >
      <Table
        isLoading={isLoading}
        data={data}
        columns={versionsColumns}
        pagination={false}
      />
    </Modal>
  );
};

export default Versions;
