import "./Message.css";

const Message = ({ text, isMine, created }) => {
  const date = new Date(Date.parse(created));

  function renderDate(date) {
    let h = `${date.getHours()}`;
    let m = `${date.getMinutes()}`;

    if (h.length < 2) h = `0${h}`;
    if (m.length < 2) m = `0${m}`;

    return `${h}:${m}`;
  }

  return (
    <div className={`message ${isMine ? "message_is-mine" : null}`}>
      <p className="message__text">{text}</p>
      <p className="message__date">{renderDate(date)}</p>
    </div>
  );
};

export default Message;
