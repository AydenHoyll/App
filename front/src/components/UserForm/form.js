import React from "react";
import { Button, Form, Input, Select, Slider } from "antd";
import axios from "axios";

const UserForm = () => {
  const onFinish = (data) => {
    console.log(data);
    axios
      .get("http://127.0.0.1:5000/api/data", {
        params: data,
      })
      .then((response) => {
        console.log(response.data);
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  // write init values for the form "" for prompt and 1 for nSamples
  return (
    <Form onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
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
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
