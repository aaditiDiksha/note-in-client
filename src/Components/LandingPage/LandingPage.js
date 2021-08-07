import './LandingPage.css';

const LandingPage = ({ onRouteChange }) => {
    return (
      <div className="landing-container">
        <div className="landing">
          <h1>
            Take notes, <br /> organize your life
          </h1>
          <h3>
            {/* Remember everything and tackle <br />
            any project with <br />
            your notes and tasks */}
            Create Notes in <br />{" "}
            <span className="tag">Notebooks & Pages</span> <br />
            Manage your work, with <br />
            <span className='tag'>To-do's</span>
          </h3>
          <button className="submit" onClick={() => onRouteChange("register")}>
            Sign up for free
          </button>
          <p onClick={() => onRouteChange("signin")}>
            already have an account? Log in
          </p>
        </div>
      </div>
    );
}

export default LandingPage;