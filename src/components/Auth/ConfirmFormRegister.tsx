import React, { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmFormRegister: FC<any> = () => {
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Getting email from the navigation state

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://ayo.webtm.ru/api/v1/users/users/confirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, confirmation_code: confirmationCode }),
      });

      if (!response.ok) {
        throw new Error("Error sending request");
      }

      const data = await response.json();

      // Save token in localStorage
      if (data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("user_id", data.id);
      } else {
        throw new Error("Token not received.");
      }

      // Redirect the user after successful confirmation
      navigate("/"); // or any other page
    } catch (err) {
      setError("Invalid confirmation code or email.");
    }
  };

  return (
    <form className="confirm__content" onSubmit={handleSubmit}>
      <h2 className="login__form-title">Confirmation Code</h2>
      <p className="confirm__content-text">
        Please check your email <span>{email}</span>. <br /> We have sent you a confirmation code.
      </p>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        className="login__form-input"
        name="confirmation_code"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
        required
      />
      <button className="login__form-submit" type="submit">
        Confirm
      </button>
    </form>
  );
};

export default ConfirmFormRegister;
