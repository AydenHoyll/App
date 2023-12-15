import "./App.css";
import React from "react";
import { Layout } from "antd";
import HomePage from "./pages/homePage";
import { QueryClient, QueryClientProvider } from "react-query";

const { Header, Content, Footer } = Layout;
const queryClient = new QueryClient();
function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="text-white w-full">CheckGPT</Header>
      <Content className="mt-28 ml-24">
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </Content>
      <Footer />
    </Layout>
  );
}
export default App;
