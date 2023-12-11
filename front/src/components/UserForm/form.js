import React from "react";
import { Button, Form, Input, Select, Slider } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { useDataContext } from "../../context/context";

const UserForm = () => {
  const { updateResponseData, isLoading, updateLoadingStatus } =
    useDataContext();

  const onFinish = (data) => {
    updateLoadingStatus(true);
    console.log(data);
    axios
      .get("http://127.0.0.1:5000/api/data", {
        params: data,
      })
      .then((response) => {
        console.log(response.data);
        updateResponseData(response.data);
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      })
      .finally(() => updateLoadingStatus(false));
  };

  return (
    <Form
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      style={{ minWidth: 600 }}
      initialValues={{ nSamples: 3 }}
    >
      <Form.Item
        label="nSamples"
        name="nSamples"
        rules={[
          { required: true, message: "Please specify a number of samples" },
        ]}
      >
        <Slider tooltip={{ open: true }} max={10} min={1} />
      </Form.Item>

      <Form.Item
        label="prompt"
        name="prompt"
        rules={[
          { required: true, message: "Please enter prompt", type: "string" },
        ]}
      >
        <TextArea
          placeholder={"Enter your prompt"}
          autoSize={{ minRows: 3, maxRows: 8 }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
