import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = ({ onSubmit, loggedIn }) => {
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
      <p className="login__title">Регистрация</p>
      <label className="login__label">
        Имя
        <input
          type="text"
          name="name"
          placeholder="Anton"
          required
          className="login__input"
          onChange={handleChange}
          value={data.name ?? ""}
        />
      </label>
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
          Зарегистрироваться
        </button>
        <Link to="/signin" className="login__link">
          Войти
        </Link>
      </div>
    </form>
  );
};

export default Register;
