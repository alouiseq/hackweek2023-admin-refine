import React from "react";
import moment from "moment";

import { useTable } from "@refinedev/antd";
import { Table, Space, Button } from "antd";

export const ClimbApplicationList = () => {
  const { tableProps } = useTable({
    resource: "climbApplications",
    syncWithLocation: true,
  });

  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column
        title="Created at"
        dataIndex="createdAt"
        render={(dom, record) => (
          <div title={dom}>{moment(dom).format("L LT")}</div>
        )}
      />
      <Table.Column
        title="Updated at"
        dataIndex="updatedAt"
        render={(dom, record) => (
          <div title={dom}>{moment(dom).format("L LT")}</div>
        )}
      />
      <Table.Column
        title="Program Code"
        dataIndex="programCode"
        render={(dom, record) => (
          <Space>
            <div>{dom}</div>
          </Space>
        )}
      />
      <Table.Column
        title="Plan"
        dataIndex="plan"
        render={(dom, record) => (
          <Space>
            <div>{dom}</div>
          </Space>
        )}
      />
      <Table.Column
        title="Start Date"
        dataIndex="startDate"
        render={(dom, record) => (
          <div title={dom}>{moment(dom).format("L LT")}</div>
        )}
      />
      <Table.Column
        title="Climb Applicant Id"
        dataIndex="applicantId"
        render={(dom, record) => {
          const linkUrl = `/api/admin/contacts/${record.contactId}/climb_applications/${record.id}/redirect_to_climb`;
          return (
            <Button type="link">
              <a href={linkUrl} target="_blank" rel="noreferrer">
                {dom}
              </a>
            </Button>
          );
        }}
      />
    </Table>
  );
};
