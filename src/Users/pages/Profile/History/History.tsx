import React, { FC, useState } from "react";
import { List, Button, Input, Card, Row, Col, Typography, Modal, Form, DatePicker, InputNumber, Space, Drawer, Tag, Badge } from "antd";
import { SearchOutlined, CloseOutlined, DollarOutlined, UserOutlined, BankOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { QRCode } from "antd";
import "./History.scss";
import useFetchData from "../../../../hooks/useFetchData";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface Transaction {
  id: number;
  sender_organization: number;
  recipient: number;
  amount: string;
  rebate: string;
  end_amount: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "orange";
    case "completed":
      return "green";
    case "failed":
      return "red";
    default:
      return "blue";
  }
};

const History: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSortModalVisible, setIsSortModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const { data, loading, error } = useFetchData(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`);

  const filteredTransactions = data.transactions?.filter((transaction: Transaction) =>
    transaction.id.toString().includes(searchTerm)
  );

  const openSortModal = () => {
    setIsSortModalVisible(true);
  };

  const closeSortModal = () => {
    setIsSortModalVisible(false);
  };

  const showDrawer = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div className="transaction-history">
      <Title level={3} style={{ marginBottom: "20px", color: "#4A90E2" }}>
        Transaction History
      </Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col>
          <Button
            type="primary"
            style={{ backgroundColor: "#f56a00", borderColor: "#f56a00", borderRadius: "8px" }}
            onClick={openSortModal}
            icon={<BankOutlined />}
          >
            Sort
          </Button>
        </Col>
        <Col>
          <Input
            placeholder="Search by ID"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, borderRadius: "8px" }}
          />
        </Col>
      </Row>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        dataSource={filteredTransactions}
        renderItem={(transaction: Transaction) => (
          <List.Item>
            <Badge.Ribbon text={transaction.status} color={getStatusColor(transaction.status)}>

              <Card
                hoverable
                bordered={false}
                style={{
                  marginBottom: 24,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  background: "#fafafa",
                  transition: "transform 0.2s ease-in-out",
                }}
                onClick={() => showDrawer(transaction)}
              >
                <Row gutter={24} align="middle">
                  <Col span={16}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <Text strong>Transaction ID: {transaction.id}</Text>
                      <Text>
                        <DollarOutlined /> Amount:{" "}
                        <span style={{ color: "#52c41a" }}>{transaction.amount} $</span>
                      </Text>
                      <Text>
                        <UserOutlined /> Recipient: {transaction.recipient}
                      </Text>
                      <Tag color={getStatusColor(transaction.status)}>{transaction.status}</Tag>
                    </Space>
                  </Col>
                  <Col span={8} style={{ textAlign: "center" }}>
                    <QRCode value={String(transaction.id)} size={96} />
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>

          </List.Item>
        )}
      />

      {/* Drawer for transaction details */}
      <Drawer
        title={<span style={{ color: "#4A90E2" }}>Transaction Details</span>}
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        width={400}
        bodyStyle={{ backgroundColor: "#f0f2f5" }}
      >
        {selectedTransaction && (
          <div>
            <p><strong>Transaction ID:</strong> {selectedTransaction.id}</p>
            <p><strong>Sender (Organization):</strong> {selectedTransaction.sender_organization}</p>
            <p><strong>Recipient:</strong> {selectedTransaction.recipient}</p>
            <p><strong>Amount:</strong> {selectedTransaction.amount} $</p>
            <p><strong>Rebate:</strong> {selectedTransaction.rebate} $</p>
            <p><strong>Final Amount:</strong> {selectedTransaction.end_amount} $</p>
            <p><strong>Status:</strong> <Tag color={getStatusColor(selectedTransaction.status)}>{selectedTransaction.status}</Tag></p>
            <p><strong>Creation Date:</strong> <ClockCircleOutlined /> {new Date(selectedTransaction.created_at).toLocaleString()}</p>
            <p><strong>Last Updated:</strong> <ClockCircleOutlined /> {new Date(selectedTransaction.updated_at).toLocaleString()}</p>
          </div>
        )}
      </Drawer>

      <Modal
        title={<span style={{ color: "#4A90E2" }}>Sorting</span>}
        visible={isSortModalVisible}
        onCancel={closeSortModal}
        footer={null}
        closeIcon={<CloseOutlined />}
        width={400}
      >
        <Form layout="vertical">
          <Title level={5}>Amount</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="amountFrom" label="From">
                <InputNumber min={0} placeholder="Ø" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="amountTo" label="To">
                <InputNumber min={0} placeholder="Ø" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Title level={5}>By Date</Title>
          <RangePicker style={{ width: "100%", borderRadius: "8px" }} />

          <Title level={5} style={{ marginTop: "20px" }}>By Status</Title>
          <Form.Item>
            <Input placeholder="Enter status (pending, success, etc.)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default History;
