import { Tag } from "antd";

const TrueTag = () => {
  return <Tag color="green">TRUE</Tag>;
};

const FalseTag = () => {
  return <Tag color="red">FALSE</Tag>;
};

export const TrueFalseTag = ({ value }) => {
  if (value) {
    return <TrueTag />;
  } else {
    return <FalseTag />;
  }
};
