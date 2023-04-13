import React, { useState } from "react";
import { useShow } from "@refinedev/core";

import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  useModalForm,
  Show,
  TextField,
  EmailField,
  NumberField,
  BooleanField,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Drawer,
  Typography,
} from "antd";
import moment from "moment";
import { TrueFalseTag } from "../../components/common/TrueFalseTag";

const { Title } = Typography;

export const ContactList = () => {
  const { tableProps } = useTable({
    resource: "contacts",
    syncWithLocation: true,
  });

  // Create Modal
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm({
    action: "create",
  });

  // // Edit Modal
  // const { show: editModalShow } = useModalForm({
  //   action: "edit",
  //   warnWhenUnsavedChanges: true,
  // });

  // Show Modal
  // const [visibleShowModal, setVisibleShowModal] = useState(false);
  const [visibleShowDrawer, setVisibleShowDrawer] = useState(false);

  const { queryResult, setShowId, showId } = useShow();

  const { data: showQueryResult, isLoading: showIsLoading } = queryResult;
  const record = showQueryResult?.data;

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createModalShow();
          },
        }}
      >
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
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  // onClick={() => editModalShow(record.id)}
                />
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => {
                    setShowId(record.id);
                    // setVisibleShowModal(true);
                    setVisibleShowDrawer(true);
                  }}
                />
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
      <Modal {...createModalProps}>
        <Form {...createModalProps} layout="vertical">
          <Form.Item
            label="First Name"
            name={["first_name"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name={["last_name"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name={["email"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name={["phone"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Consent"
            valuePropName="checked"
            name={["phone_consent"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        open={visibleShowDrawer}
        onClose={() => setVisibleShowDrawer(false)}
        width="500"
      >
        <Show
          isLoading={showIsLoading}
          headerButtons={
            <DeleteButton
              recordItemId={showId}
              onSuccess={() => setVisibleShowDrawer(false)}
            />
          }
        >
          <Title level={5}>First Name</Title>
          <TextField value={record?.first_name} />
          <Title level={5}>Last Name</Title>
          <TextField value={record?.last_name} />
          <Title level={5}>Email</Title>
          <EmailField value={record?.email} />
          <Title level={5}>Phone</Title>
          <NumberField value={record?.phone ?? ""} />
          <Title level={5}>Phone Consent</Title>
          <BooleanField value={record?.phone_consent} />
        </Show>
      </Drawer>
    </>
  );
};
