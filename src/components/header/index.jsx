import { useContext, useEffect, useState } from "react";
import { useList } from "@refinedev/core";
import { useGetIdentity } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import {
  Layout as AntdLayout,
  Space,
  Avatar,
  Typography,
  Switch,
  theme,
  AutoComplete,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import { ColorModeContext } from "../../contexts/color-mode";

const { Link } = routerProvider;
const { Text } = Typography;
const { useToken } = theme;

// To be able to customize the option title
const renderTitle = (title) => {
  return (
    <Text strong style={{ fontSize: "16px" }}>
      {title}
    </Text>
  );
};

// To be able to customize the option item
const renderItem = (title, resource, id) => {
  return {
    value: title,
    label: (
      <Link to={`/${resource}/show/${id}`}>
        <Text>{title}</Text>
      </Link>
    ),
  };
};

export const Header = () => {
  const { token } = useToken();
  const { data: user } = useGetIdentity();
  const { mode, setMode } = useContext(ColorModeContext);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const { refetch: refetchContacts } = useList({
    resource: "contacts",
    filters: [{ field: "search", operator: "contains", value }],
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const contactOptionGroup = data.data.map((item) =>
          renderItem(
            `${item.first_name} ${item.last_name} - ${item.email}`,
            "contacts",
            item.id
          )
        );
        if (contactOptionGroup.length > 0) {
          setOptions([
            {
              label: renderTitle("Contacts"),
              options: contactOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchStudents } = useList({
    resource: "students",
    filters: [{ field: "name_or_email", operator: "contains", value }],
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const studentOptionGroup = data.data.map((item) =>
          renderItem(`${item.name} - ${item.email}`, "students", item.id)
        );
        if (studentOptionGroup.length > 0) {
          setOptions([
            {
              label: renderTitle("Students"),
              options: studentOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchPrograms } = useList({
    resource: "programs",
    filters: [{ field: "search", operator: "contains", value }],
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const programOptionGroup = data.data.map((item) =>
          renderItem(`${item.name}`, "programs", item.id)
        );
        if (programOptionGroup.length > 0) {
          setOptions([
            {
              label: renderTitle("Programs"),
              options: programOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchProgramCohorts } = useList({
    resource: "program_cohorts",
    filters: [{ field: "search", operator: "contains", value }],
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const programCohortOptionGroup = data.data.map((item) =>
          renderItem(`${item.program?.name}`, "program_cohorts", item.id)
        );
        if (programCohortOptionGroup.length > 0) {
          setOptions([
            {
              label: renderTitle("ProgramCohorts"),
              options: programCohortOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchCourses } = useList({
    resource: "courses",
    filters: [{ field: "search_text", operator: "contains", value }],
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const courseOptionGroup = data.data.map((item) =>
          renderItem(`${item.title}`, "courses", item.id)
        );
        if (courseOptionGroup.length > 0) {
          setOptions([
            {
              label: renderTitle("Courses"),
              options: courseOptionGroup,
            },
          ]);
        }
      },
    },
  });

  useEffect(() => {
    setOptions([]);
    refetchContacts();
    refetchStudents();
    refetchPrograms();
    refetchProgramCohorts();
    refetchCourses();
  }, [value]);

  return (
    <AntdLayout.Header
      style={{
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
      }}
    >
      <AutoComplete
        style={{ width: "100%", maxWidth: "550px" }}
        filterOption={false}
        options={options}
        onSearch={debounce((value) => setValue(value), 500)}
      >
        <Input
          size="large"
          placeholder="Search anything from the sider menu"
          suffix={<SearchOutlined />}
        />
      </AutoComplete>
      <Space>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.name && <Text strong>{user.name}</Text>}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
