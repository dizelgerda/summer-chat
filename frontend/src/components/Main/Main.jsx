import "./Main.css";

import ChatList from "../ChatList/ChatList";
import Chat from "../Chat/Chat";
import CreateChat from "../CreateChat/CreateChat";

import { api } from "../../utils/Api";
import { useEffect, useState } from "react";

const Main = ({ onLogout }) => {
  const [chats, setChats] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [mode, setMode] = useState("chat");

  function handleSelect(chat) {
    setSelectedChat(chat);
    setMode("chat");
  }

  function showCreateForm() {
    setSelectedChat(null);
    setMode("create");
  }

  function handleCreate(data) {
    api
      .createChat(data)
      .then(() => getChats())
      .finally(() => {
        setMode("chat");
      });
  }

  function render() {
    if (mode === "chat") {
      return selectedChat ? (
        <Chat chat={selectedChat} setMode={setMode} />
      ) : (
        <p className="main__no-chats">Чат не выбран</p>
      );
    } else if (mode === "create") {
      return <CreateChat onSubmit={handleCreate} />;
    }
  }

  function getChats() {
    api.getChats().then((chats) => setChats(chats));
  }

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="main">
      <ChatList
        chats={chats}
        onSelect={handleSelect}
        selectedChat={selectedChat}
        onLogout={onLogout}
        onCreate={showCreateForm}
      />
      {render()}
    </div>
  );
};

export default Main;
