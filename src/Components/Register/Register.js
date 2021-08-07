import React, { useState } from "react";


const Register = ({onSetLoading}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  const [password, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitRegister = () => {

    if (!name || !email || !password) {
      alert("Please fill the required details");
      return;
    }
onSetLoading(true)
    fetch("https://shielded-earth-87111.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.userid) {
          onSetLoading(false);

          setRegistered(true);
        } else if (user === "incorrect form submission") {
          onSetLoading(false);

          console.log("Error"); //access the error component here
          alert("incorrect form submission");
        } else if (user === "err") {
          onSetLoading(false);

          alert("email already used");
        }
        onSetLoading(false);
      })
      .catch((err) => {
        console.log(err);
        onSetLoading(false);

        alert("email used");
      });
  };

  return (
    <div className="form-main">
      <div className="form">
        <h4 className={registered ? "registered" : "failed"}>
          Registered
        </h4>
        <div className="title">Welcome</div>
        <div className={registered?"failed":'subtitle'}>Let's create your account!</div>

        <div className="input-container ic2">
          <input
            className="input"
            placeholder="Name "
            type="text"
            name="name"
            id="name"
            onChange={onNameChange}
            autoComplete="off"
            required
          />
          <label htmlFor="name" className="placeholder"></label>
        </div>
        <div className="input-container ic2">
          <input
            className="input"
            placeholder="Email "
            type="email"
            name="email-address"
            id="email-address"
            onChange={onEmailChange}
            autoComplete="off"
            required
          />
          <label htmlFor="email-address" className="placeholder"></label>
        </div>
        <div className="input-container ic2">
          <input
            className="input"
            placeholder="Password"
            onChange={onPasswordChange}
            type="password"
            name="password"
            id="password"
            required
          />
          <label htmlFor="password" className="placeholder"></label>
        </div>
        <div className="">
          <input
            className="submit"
            type="submit"
            value="Register"
            onClick={() => onSubmitRegister()}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
