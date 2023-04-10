import "./ChatList.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const ChatList = ({ chats, onSelect, onLogout, selectedChat, onCreate }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="chats">
      <menu className="chats__menu">
        <button type="button" className="chats__menu-button" onClick={onCreate}>
          +
        </button>
        <button
          type="button"
          className="chats__menu-button"
          style={{ backgroundColor: "lightgrey" }}
          onClick={onLogout}
        >
          Выход
        </button>
      </menu>
      {chats
        ? chats.map(({ _id, members }) => {
            const user = members.find(({ _id }) => _id !== currentUser._id);

            return (
              <div
                key={_id}
                className="chats__item"
                onClick={() => {
                  onSelect({ _id, members });
                }}
              >
                <p
                  className={`chats__name ${
                    selectedChat && _id === selectedChat._id
                      ? "chats__name_selected"
                      : ""
                  }`}
                >
                  {user.name}
                </p>
                <p className="chats__email">{user.email}</p>
              </div>
            );
          })
        : null}
    </section>
  );
};

export default ChatList;
