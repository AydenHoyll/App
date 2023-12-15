import React from "react";
import { Collapse } from "antd";

const Accordion = ({
  body = "no data received",
  key = "1",
  title = "no header received",
  loading = false,
}) => {
  return (
    <Collapse className="mb-2">
      <Collapse.Panel header={title} key={key} collapsible>
        <p>{body}</p>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Accordion;
