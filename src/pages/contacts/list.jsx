import React from "react";
import { useTable, List, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Space, Button } from "antd";
import moment from "moment";
import { TrueFalseTag } from "../../components/common/TrueFalseTag";

export const ContactList = () => {
  const { tableProps } = useTable({
    resource: "/contacts",
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="Name"
          dataIndex="name"
          render={(_, record) => (
            <Space>{`${record.first_name} ${record.last_name}`}</Space>
          )}
        />
        <Table.Column
          title="Email"
          dataIndex="email"
          render={(_, record) => (
            <Space>
              <a href={`mailto:${record.email}`}>{record.email}</a>
            </Space>
          )}
        />
        <Table.Column
          title="Phone"
          dataIndex="phone"
          render={(_, record) => (
            <Space>
              <a href={`tel:${record.phone}`}>{record.phone}</a>
            </Space>
          )}
        />
        <Table.Column
          title="Phone consent"
          dataIndex="phoneConsent"
          render={(_, record) => <TrueFalseTag value={record.phoneConsent} />}
        />
        <Table.Column
          title="Registered At"
          dataIndex="cegisteredAt"
          render={(_, record) => (
            <div title={record.createdAt}>
              {moment(record.createdAt).fromNow()}
            </div>
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <a
                href={`/api/admin/contacts/${record.id}/redirect_to_ac`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  type="primary"
                  ghost
                  // icon={
                  //   <Image
                  //     src="/images/ac_mark-white-bluebg.svg"
                  //     alt="activecampaign logo"
                  //   />
                  // }
                >
                  &nbsp;ActiveCampaign...
                </Button>
              </a>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
