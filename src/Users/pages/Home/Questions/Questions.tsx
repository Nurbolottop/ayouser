import React, { useState, useCallback, useEffect } from "react";
import UpArrow from "../../../../img/icons/UpArrow.svg";
import DownArrow from "../../../../img/icons/DownArrow.svg";
import { Button, Input, Modal, message } from "antd";
import useFetchData2 from "../../../../hooks/useFetchData copy";

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};

const Questions = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const { data: questions, error, loading } = useFetchData2('https://ayo.webtm.ru/api/v1/cms/faq_index/');

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // Функция для отправки вопроса на сервер
  const handleAskQuestion = async () => {
    if (!question) {
      message.error("Please enter a question");
      return;
    }

    // Простая валидация email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      message.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch('https://ayo.webtm.ru/api/v1/users/users/user-ask-unauth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ask: question, // Вопрос, который отправляется
          email: email,   // Email, который отправляется
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send the question');
      }

      message.success("Your question has been submitted successfully!");
      setIsModalOpen(false); // Закрыть модал после отправки
      setQuestion(''); // Очистить поле ввода вопроса
      setEmail('');    // Очистить поле ввода email
    } catch (error) {
      message.error("Error: " + error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="faq container">
      <h1 className="faq__title">Frequently Asked Questions</h1>
      {questions?.map((item: any, index: number) => (
        <div key={item.id} className="faq__item">
          <div className="faq__question" onClick={() => toggleQuestion(index)}>
            {item.qutions} {/* Make sure this field is correctly spelled in the API response */}
            <button className="faq__toggle" id="arrow">
              {openQuestion === index ? (
                <img src={UpArrow} alt="Collapse" />
              ) : (
                <img src={DownArrow} alt="Expand" />
              )}
            </button>
          </div>
          <div className={`faq__answer ${openQuestion === index ? "faq__answer-open" : ""}`}>
            {item.answer}
          </div>
        </div>
      ))}
      <Button
        type="primary"
        className="faq__ask-button"
        style={{ color: 'white' }}
        onClick={() => setIsModalOpen(true)}
      >
        Ask a Question
      </Button>

      <Modal
        title="Ask a Question"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAskQuestion}>
            Send
          </Button>,
        ]}
      >
        <p>Your Question:</p>
        <Input
          type="text"
          placeholder="Enter your question"
          className="faq__modal-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)} // Обновляем состояние вопроса
        />
        <p>Your Email:</p>
        <Input
          type="email"
          placeholder="Enter your email"
          className="faq__modal-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email
        />
      </Modal>
    </div>
  );
};

export default Questions;
