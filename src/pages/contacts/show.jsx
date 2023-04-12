import React from "react";
import { useShow } from "@refinedev/core";
import {
  Show,
  TextField,
  EmailField,
  NumberField,
  BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ContactShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
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
  );
};
