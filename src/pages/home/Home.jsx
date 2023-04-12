import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import classnames from "classnames";

import { devEnv, backendEnv, getEnvTagColor } from "../../helpers/environment";
// import stylesCommon from "../../assets/styles/сommon.module.scss";
import { Breadcrumb, Card, Col, Row, Tag, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const dev = devEnv();
const backend = backendEnv();

export const Home = () => {
  const [changelog, setChangelog] = useState("");

  useEffect(() => {
    fetch("/CHANGELOG.md").then((response) => {
      response.text().then((text) => {
        setChangelog(text);
      });
    });
  }, []);

  return (
    <>
      <Space direction="vertical">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">
              <Space>
                <HomeOutlined alt="Home" />
                Home
              </Space>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2>Home</h2>
      </Space>
      <Row gutter={16}>
        <Col span="12">
          <HomeContent />
        </Col>
        {/* <Col span="12">
          <Card>
            <ReactMarkdown>{changelog}</ReactMarkdown>
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

const TitleAndEnvironmentTags = () => {
  return (
    <>
      Welcome to Glinda&nbsp;&nbsp;
      {dev && <Tag color="blue">{dev}</Tag>}
      <Tag color={getEnvTagColor(backend)}>{backend}</Tag>
    </>
  );
};

const HomeContent = () => (
  <Card title={<TitleAndEnvironmentTags />}>
    <Space direction="vertical">
      <div
      // className={classnames(
      //   stylesCommon.displayFlex,
      //   stylesCommon.displayFlexCentered,
      //   stylesCommon.displayFlexColumn
      // )}
      >
        <img src="/logo.png" alt="logo" />
      </div>

      <p>
        Glinda is your one-stop solution for exploring the student journey. Use
        this tool to look up and link to student information without
        inadvertently leaking private student information. For more information
        on how to use Glinda, check out the{" "}
        <a
          href="https://www.notion.so/6b24c19b0b3e4f1187c6315ae23c5f44"
          target="_blank"
          rel="noreferrer"
        >
          Notion page
        </a>
        .
      </p>
    </Space>
  </Card>
);
