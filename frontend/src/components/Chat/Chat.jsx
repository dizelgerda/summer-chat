import "./Chat.css";

import { useEffect, useContext, useState } from "react";
import { api } from "../../utils/Api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Message from "../Message/Message";

const Chat = ({ chat }) => {
  const [messages, setMessages] = useState(null);
  const [data, setData] = useState({});
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (chat) {
      api.getMessages(chat._id).then((messages) => messageAnalysis(messages));
    }
  }, [chat]);

  function messageAnalysis(messages) {
    messages.sort(({ created }) => created);

    messages = messages.map((message) => {
      if (
        message.owner._id === currentUser._id ||
        message.owner === currentUser._id
      )
        message.isMine = true;
      else message.isMine = false;

      return message;
    });

    setMessages(messages);
  }

  function handelChange(e) {
    const {
      target: { name, value },
    } = e;
    setData({ ...data, [name]: value });
  }

  function handelSend(e) {
    e.preventDefault();
    api
      .addMessage(chat._id, data)
      .then((message) => messageAnalysis([...messages, message]))
      .finally(() => setData({}));
  }

  return (
    <section className="chat">
      <div className="chat__messages">
        {messages && messages.length > 0 ? (
          messages.map((message) => <Message {...message} key={message._id} />)
        ) : (
          <p>Ничего нет</p>
        )}
      </div>
      <form className="chat__footer">
        <input
          type="text"
          name="text"
          className="chat__input"
          onChange={handelChange}
          value={data.text ?? ""}
        />
        <button
          type="submit"
          className="chat__send-button"
          onClick={handelSend}
        >
          Отправить
        </button>
      </form>
    </section>
  );
};

export default Chat;
