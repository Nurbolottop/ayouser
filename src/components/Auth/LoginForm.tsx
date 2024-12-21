import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message, Spin, Row, Col } from "antd";
import { GoogleOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';
import { GoogleLoginButton } from "../GoogleAuthButton/GoogleAuthButton";

const LoginForm: FC<any> = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string }) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("https://ayo.webtm.ru/api/v1/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        throw new Error("Error sending request");
      }

      navigate("/confirm", { state: { email: values.email } });
      message.success('Confirmation code sent to your email.');
    } catch (err) {
      setError("Failed to log in. Please check your input.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Form
        name="login"
        initialValues={{ email }}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ minWidth: '400px', padding: '1rem' }}
        className="login-form"
      >
        <h2 style={{ textAlign: 'center', fontWeight: 600 }}>Login</h2>
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{error}</div>}

        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              size="large"
            >
              {loading ? <Spin /> : "Log In"}
            </Button>
          </Col>

          <Col span={24}>
            <Divider>or</Divider>
          </Col>

          <Col span={24}>

            <GoogleLoginButton />
          </Col>

          {/* <Col span={24}>
              <Button
                block
                icon={<FacebookOutlined />}
                size="large"
                onClick={() => message.info('Facebook sign-in will be implemented soon!')}
              >
                Sign in with Facebook
              </Button>
            </Col>

            <Col span={24}>
              <Button
                block
                icon={<MailOutlined />}
                size="large"
                onClick={() => message.info('Telegram sign-in will be implemented soon!')}
              >
                Sign in with Telegram
              </Button>
            </Col> */}

          <Col span={24} style={{ marginTop: 16 }}>
            <Link to={"https://ayoadmin.vercel.app/login"} style={{ display: 'block', textAlign: 'center' }}>
              Log in to Your Company
            </Link>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default LoginForm;
