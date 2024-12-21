import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Radio, Button, Form, InputNumber, Select, Card, message, Skeleton } from "antd";
import edit from "../../../../img/Icons.svg";
import Application from "../../../../components/Application/Application";
import "./Data.scss";

const { Option } = Select;

const initialState = {
  id: "",
  first_name: "",
  last_name: "",
  gender: "",
  age: "",
  email: "",
  phone_number: "",
};

const UserEdit: FC<any> = ({ onSubmit }) => {
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  // Execute GET request to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        setUserData(data); // Fill form with data
        setLoading(false); // Disable loading after successful request
        setError(null); // Reset error on successful load
      } catch (err) {
        setError((err as Error).message); // Set error message
        setLoading(false); // Disable loading
        message.error("Error loading user data."); // Display notification
      }
    };

    fetchUserData();
  }, []);

  // Submit form data on edit
  const onFinish = async (values: any) => {
    setLoading(true); // Enable loading state on form submission
    try {
      const response = await fetch(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`, {
        method: "PUT", // PUT method to update data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send modified data
      });

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error("Failed to update data.");
      }

      const data = await response.json();
      setUserData(data); // Update form data without reloading
      message.success("Data successfully updated!"); // Notification of successful update
      setError(null); // Reset error on successful update
      onSubmit && onSubmit(data); // Call onSubmit if provided
    } catch (err) {
      setError((err as Error).message); // Set error message
      message.error("Error updating data."); // Notification of error
    } finally {
      setLoading(false); // Disable loading after completion
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Please check the correctness of the form filling.");
  };

  return (
    <Skeleton active loading={loading} paragraph={{ rows: 8 }}>
      <Form
        name="userEdit"
        initialValues={userData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="profile-form"
      >
        <div>
          {/* About You */}
          <Form.Item label="About You" className="form-title">
            <div className="data__first-col">
              {/* First Name */}
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: "Please enter your first name!" }]}
              >
                <Input
                  placeholder="Enter your first name"
                  suffix={<img src={edit} width={18} alt="Edit Icon" />}
                  disabled={loading}
                />
              </Form.Item>

              {/* Last Name */}
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: "Please enter your last name!" }]}
              >
                <Input
                  placeholder="Enter your last name"
                  suffix={<img src={edit} width={18} alt="Edit Icon" />}
                  disabled={loading}
                />
              </Form.Item>

              {/* Gender */}
              <Form.Item name="gender" label="Gender">
                <Radio.Group disabled={loading}>
                  <Radio value={1}>Male</Radio>
                  <Radio value={2}>Female</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </Form.Item>

          {/* Contact Information */}
          <Form.Item label="Contact Information" className="form-title">
            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: "email", message: "Please enter a valid email!" }]}
            >
              <Input placeholder="email@gmail.com" disabled={loading} />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item name="phone_number" label="Phone Number">
              <InputNumber style={{ width: "100%" }} disabled={loading} />
            </Form.Item>
          </Form.Item>

          {/* Preferences */}
          {/* <Form.Item name="preference" label="Preferences">
            <Select defaultValue="1" className="data__select" disabled={loading}>
              <Option value="1">Not specified</Option>
              <Option value="2">Specified</Option>
              <Option value="3">!Specified</Option>
            </Select>
          </Form.Item> */}

          {/* Buttons */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="data__save" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </div>

        {/* Log Out */}
        <p className="data__delete">
          <Button danger type="link" onClick={() => navigate("/")} disabled={loading}>
            Log Out
          </Button>
        </p>

        {/* Application */}
        <Application />

        </Form>
    </Skeleton>
  );
};

export default UserEdit;
