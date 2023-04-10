import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = ({ onSubmit, loggedIn }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, []);

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
    <form className="login__form">
      <p className="login__title">Вход</p>
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
      <label className="login__label">
        Password
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          className="login__input"
          onChange={handleChange}
          value={data.password ?? ""}
        />
      </label>
      <div className="login__footer">
        <button
          type="submit"
          className="login__button_submit"
          onClick={handleSubmit}
        >
          Войти
        </button>
        <Link to="/signup" className="login__link">
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
};

export default Login;
