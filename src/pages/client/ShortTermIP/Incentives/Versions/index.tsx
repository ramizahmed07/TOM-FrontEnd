import { FC, useState } from "react";

import Table from "@components/Table";
import Modal from "@components/Modal";
import { IModal } from "@/types";
import {
  ErrorServices,
  useFetchShortTermIncentiveVersionsQuery,
  useUpdateShortTermIncentiveVersionMutation,
} from "@services";
import { getVersionsColumns } from "../config";

const ShortTermIncentiveVersions: FC<IModal> = ({
  isVisible,
  setIsVisible,
}) => {
  const company_id = 1;
  const { data: versions, isLoading } = useFetchShortTermIncentiveVersionsQuery(
    {
      company_id,
    }
  );
  const [updateShortTermIncentiveVersion] =
    useUpdateShortTermIncentiveVersionMutation();
  const { data } = versions || {};
  console.log("versions", versions);
  const [active, setActive] = useState(false);

  const handleActive = async (id: number) => {
    try {
      await updateShortTermIncentiveVersion({ id, company_id: 1 }).unwrap();
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
      title="Previous Versions of Salary Ranges"
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

export default ShortTermIncentiveVersions;
