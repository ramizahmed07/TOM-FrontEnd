import { useRef, useState } from "react";
import { Col, message, Row } from "antd";
import { useHistory } from "react-router-dom";

import Table from "@components/Table";
import AddSector from "./AddSector";
import Button from "@components/Button";
import {
  useDeleteSectorMutation,
  useDownloadSectorsQuery,
  useFetchSectorsQuery,
  useUploadSectorsMutation,
} from "@services";
import { ISector } from "@types";
import { checkPermission } from "@utils";
import { permissions } from "@router";
import { getColumns } from "./config";

const Sectors = () => {
  const history = useHistory();
  const [download, setDownload] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSector, setSelectedSector] = useState<ISector | null>(null);
  const { data, isLoading } = useFetchSectorsQuery(page);
  const [deleteSector] = useDeleteSectorMutation();
  const [uploadSectors, { isLoading: isUploading }] =
    useUploadSectorsMutation();
  const { isLoading: isDownloading } = useDownloadSectorsQuery(null, {
    skip: !download,
  });
  const { data: sectors, pagination } = data || {};
  const inputRef = useRef<any>(null);

  const onRowClick = (data: any) => {
    if (!checkPermission(permissions.VIEW_INDUSTRY)) return;
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
    if (key === "2") {
      handleDelete(item?.id);
    } else {
      setSelectedSector(item);
      setIsVisible(true);
    }
  };

  const uploadFile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event?.target?.files[0];
    try {
      const formData = new FormData();
      formData.append("attachment", file, file.name);
      await uploadSectors(formData).unwrap();
      message.success("CSV Data Uploaded Successfully");
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
  };

  const columns = getColumns({ handleActionDropdown });

  return (
    <>
      {isVisible ? (
        <AddSector
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      ) : null}

      <Row>
        <Col span={24}>
          <div className="main-heading">Sectors, Industry & Sub-Industry</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <input
            id="myInput"
            type="file"
            ref={inputRef}
            hidden={true}
            onChange={uploadFile}
          />
          {checkPermission(permissions.CREATE_SECTOR) && (
            <Button
              isLoading={isUploading}
              variant="upload"
              onClick={() => inputRef?.current?.click()}
            >
              Upload Sectors
            </Button>
          )}
          <Button
            isLoading={isDownloading}
            variant="download"
            onClick={() => setDownload(true)}
          >
            Download Sectors
          </Button>
        </Col>
        <Col className="align-end" span={8}>
          {checkPermission(permissions.CREATE_SECTOR) && (
            <Button variant="add" onClick={() => setIsVisible(true)}>
              Add New Sector
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Table
          onRowClick={onRowClick}
          data={sectors}
          columns={columns}
          isLoading={isLoading}
          pagination={true}
          count={pagination?.count}
          onChangePage={setPage}
          page={page}
        />
      </Row>
    </>
  );
};

export default Sectors;
