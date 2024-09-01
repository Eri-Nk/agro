import { Outlet, NavLink } from "react-router-dom";

const About = ({ isAboutOpen }) => {
  return (
    <div>
      <h1>Welcome to about</h1>
      <Outlet />
    </div>
  );
};

export default About;
