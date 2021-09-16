import { FC, useState } from "react";

import Table from "@components/Table";
import Modal from "@components/Modal";
import { IModal } from "@types";
import {
  ErrorServices,
  useFetchLongTermIncentiveVersionsQuery,
  useUpdateLongTermIncentiveVersionMutation,
} from "@services";
import { getVersionsColumns } from "../config";

const LongTermIncentiveVersions: FC<IModal> = ({ isVisible, setIsVisible }) => {
  const company_id = 1;
  const { data: versions, isLoading } = useFetchLongTermIncentiveVersionsQuery({
    company_id,
  });
  const [updateLongTermIncentiveVersion] =
    useUpdateLongTermIncentiveVersionMutation();
  const { data } = versions || {};
  const [active, setActive] = useState(false);

  const handleActive = async (id: number) => {
    try {
      await updateLongTermIncentiveVersion({ id, company_id: 1 }).unwrap();
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
      title="Previous Versions of Long Term Incentives"
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

export default LongTermIncentiveVersions;
