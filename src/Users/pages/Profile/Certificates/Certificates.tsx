import React, { useState } from "react";
import { Tabs, Button } from "antd";
import Application from "../../../../components/Application/Application";
import ActiveCertificates from "./ActiveCertificates/ActiveCertificates";
import Archive from "./Archive/Archive";
import "./Certificates.scss";
import Skoro from "../../../../components/Skoro/Skoro";

const { TabPane } = Tabs;

const Certificates = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="certificates" style={{ position: 'relative' }}>
      <Skoro />
      <h2 className="data__title">My Certificates</h2>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        size="large"
        tabBarExtraContent={<Button type="primary">Add Certificate</Button>}
      >
        <TabPane tab="Active" key="active">
          <ActiveCertificates />
        </TabPane>
        <TabPane tab="Archive" key="archive">
          <Archive />
        </TabPane>
      </Tabs>

    </div>
  );
};

export default Certificates;
