import React, { FC, useState } from "react";
import { Input, Select, Button, Form, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const RequestForm: FC<any> = ({ onSubmit }) => {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState({
    name: "",
    lost_name: "",
    email: "",
    company_name: "",
    city: "",
    country: "",
    business_areas: "",
  });

  const navigate = useNavigate();

  const onFormSubmit = async (values: any) => {
    const formData = { ...values, phone_number: phone };
    await onSubmit(formData);
    navigate("/expectation");
  };

  return (
    <Form onFinish={onFormSubmit} className="request__form">
      <h2 className="login__form-title">Отправить запрос</h2>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
          >
            <Input placeholder="Имя" className="login__dform-input" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lost_name"
            rules={[{ required: true, message: 'Пожалуйста, введите вашу фамилию!' }]}
          >
            <Input placeholder="Фамилия" className="logdin__form-input" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите вашу электронную почту!' }]}
      >
        <Input type="email" placeholder="Электронная почта" className="login__form-dinput" />
      </Form.Item>

      <Form.Item
        name="phone_number"
        rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}
      >
        <Input
          placeholder="Номер телефона"
          className="login__form-inpdut"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="company_name"
        rules={[{ required: true, message: 'Пожалуйста, введите название компании!' }]}
      >
        <Input placeholder="Название компании" className="login__form-indput" />
      </Form.Item>

      <Form.Item
        name="country"
        rules={[{ required: true, message: 'Пожалуйста, выберите страну!' }]}
      >
        <Select placeholder="Страна" className="login__form-select">
          <Option value="1">Страна 1</Option>
          <Option value="2">Страна 2</Option>
          {/* Добавьте сюда ваши страны */}
        </Select>
      </Form.Item>

      <Form.Item
        name="city"
        rules={[{ required: true, message: 'Пожалуйста, выберите город!' }]}
      >
        <Select placeholder="Город" className="login__form-select">
          <Option value="1">Город 1</Option>
          <Option value="2">Город 2</Option>
          {/* Добавьте сюда ваши города */}
        </Select>
      </Form.Item>

      <Form.Item
        name="business_areas"
        rules={[{ required: true, message: 'Пожалуйста, выберите сферу бизнеса!' }]}
      >
        <Select placeholder="Сфера бизнеса" className="login__form-select">
          <Option value="1">Сфера 1</Option>
          <Option value="2">Сфера 2</Option>
          {/* Добавьте сюда ваши сферы бизнеса */}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button style={{height:'60px'}} type="primary" htmlType="submit" className="login__form-submit">
          Запросить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestForm;
