import React, { useEffect, useState } from "react";
import { Button, Form, Slider } from "antd";
import io from "socket.io-client";
import Accordion from "../../components/Outputs/Output";
import { useQuery } from "react-query";
import { apiFetchData } from "./utils";
import TextArea from "antd/es/input/TextArea";

const HomePage = () => {
  const [formData, setFormData] = useState(null);
  const [socketData, setSocketData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isLoading, data, isFetched } = useQuery(
    ["fetchData", formData?.prompt],
    () => apiFetchData(formData),
    {
      enabled: Boolean(formData?.prompt),
    },
  );
  const onFinish = (data) => {
    setSocketData([]);
    setFormData(data);
    setIsProcessing(true);
  };
  useEffect(() => {
    const socket = io();
    socket.connect();
    socket.on("onEnd", () => {
      setIsProcessing(false);
      setFormData(null);
    });
    socket.on("onStepUpdate", (data) => {
      console.log("onStepData received:", data);
      const newMessage = data;
      setSocketData((prevMessages) => [...prevMessages, newMessage]);
    });
    // Cleanup on component unmount
    return () => {
      socket.off("onStepUpdate");
      socket.off("onEnd");
      socket.off("onEnter");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="flex-col mb-5 w-1/2 mx-auto">
        <Form
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 600 }}
          initialValues={{ nSamples: 3 }}
        >
          <Form.Item
            label="nSamples"
            name="nSamples"
            rules={[
              { required: true, message: "Please specify a number of samples" },
            ]}
          >
            <Slider tooltip={{ open: true }} max={7} min={1} />
          </Form.Item>

          <Form.Item
            label="prompt"
            name="prompt"
            rules={[
              {
                required: true,
                message: "Please enter prompt",
                type: "string",
              },
            ]}
          >
            <TextArea
              placeholder={"Enter your prompt"}
              autoSize={{ minRows: 3, maxRows: 8 }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
            <Button type="primary" htmlType="submit" disabled={isProcessing}>
              {isProcessing ? "Loading..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
        <Accordion />
        {socketData.map((step) => (
          <Accordion title={step.title} body={step.body} key={step.step} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
