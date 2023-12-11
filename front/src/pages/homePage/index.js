import React from "react";
import UserForm from "../../components/UserForm/form";
import { useDataContext } from "../../context/context";
import { Skeleton } from "antd";

const HomePage = () => {
  const { responseData, isLoading } = useDataContext();
  return (
    <>
      <div className="inline-flex w-full items-center m-0 gap-10">
        <UserForm />

        {isLoading && <Skeleton active className="pb-16 w-1/3" />}
        {responseData && <div>{responseData.result}</div>}
      </div>
    </>
  );
};

export default HomePage;
