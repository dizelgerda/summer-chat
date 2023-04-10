import "./CreateChat.css";

import { useState } from "react";

const CreateChat = ({ onSubmit }) => {
  const [data, setData] = useState({});

  function handleChange(e) {
    const {
      target: { name, value },
    } = e;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(data);
    setData({});
  }

  return (
    <form className="create-chat">
      <p className="login__title">Создание чата</p>
      <label className="login__label">
        Email
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          required
          className="login__input"
          onChange={handleChange}
          value={data.email ?? ""}
        />
      </label>
      <button
        type="submit"
        className="login__button_submit"
        onClick={handleSubmit}
      >
        Создать
      </button>
    </form>
  );
};

export default CreateChat;
