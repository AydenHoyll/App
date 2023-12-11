import "./App.css";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import HomePage from "./pages/homePage";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="text-white align-middle fixed w-full">CheckGPT</Header>
      <Content className="mt-28 ml-24">
        <HomePage />
      </Content>
      <Footer />
    </Layout>
  );
}
export default App;
