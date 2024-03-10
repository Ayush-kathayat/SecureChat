import { useContext } from 'react';
import "./home.css";
import Nav from "../../components/nav/nav";
import { ChatAppContext } from '../../../context/ChatAppContext';

const Home = () => {
  const title  = useContext(ChatAppContext);

  return (
    <>
      <Nav />
      <h1>{title}</h1>
    </>
  );
};

export default Home;