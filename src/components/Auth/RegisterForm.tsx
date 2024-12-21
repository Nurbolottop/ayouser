import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message, Row, Col, Spin } from "antd";
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: null })); // Clear error on field change
  };

  const onFormSubmit = async (values: { first_name: string; last_name: string; email: string }) => {
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("https://ayo.webtm.ru/api/v1/users/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send form data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const data = await response.json();
      console.log(data);
      navigate("/confirmregister", { state: { email: values.email } });
    } catch (err: any) {
      if (err.first_name || err.last_name || err.email) {
        setErrors(err); // Set field errors
      } else {
        setErrors({ general: "An error occurred during registration. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" >
      <Col xs={24} sm={18} md={12} lg={8}>
        <Form
          name="register"
          onFinish={onFormSubmit}
          initialValues={state}
          layout="vertical"
        >
          <h2 style={{ textAlign: "center", fontWeight: 600 }}>Register</h2>

          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: "Please input your first name!" }]}
            help={errors.first_name && errors.first_name[0]}
          >
            <Input
              name="first_name"
              value={state.first_name}
              onChange={onChange}
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please input your last name!" }]}
            help={errors.last_name && errors.last_name[0]}
          >
            <Input
              name="last_name"
              value={state.last_name}
              onChange={onChange}
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
            help={errors.email && errors.email[0]}
          >
            <Input
              name="email"
              value={state.email}
              onChange={onChange}
              disabled={loading}
            />
          </Form.Item>

          {errors.general && (
            <div style={{ color: "red", textAlign: "center", marginBottom: 16 }}>
              {errors.general}
            </div>
          )}

          <Form.Item style={{ width: "100%" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              size="large"
            >
              {loading ? <Spin /> : "Create Account"}
            </Button>
          </Form.Item>

          <Divider>or</Divider>

          <Form.Item style={{ width: "100%" }}>
            <Button
              block
              icon={<GoogleOutlined />}
              size="large"
              onClick={() => message.info("Google sign-in will be implemented soon!")}
              disabled={loading}
            >
              Sign up with Google
            </Button>
          </Form.Item>

          <Form.Item style={{ width: "100%" }}>
            <Button
              block
              icon={<FacebookOutlined />}
              size="large"
              onClick={() => message.info("Facebook sign-in will be implemented soon!")}
              disabled={loading}
            >
              Sign up with Facebook
            </Button>
          </Form.Item>


          <Form.Item style={{ width: "100%" }}>
            <a
              style={{ display: "block", textAlign: "center" }}
              href="https://ayoadmin.vercel.app/register"
            >
              Create Organization
            </a>
          </Form.Item>

        </Form>
      </Col>
    </Row>
  );
};

export default RegisterForm;
