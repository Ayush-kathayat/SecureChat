import "./connect.css";
import { Button } from "../../components/index";

const Connect = () => {
  return (
    <>
      <div className="four-wrapper">
        <div className="four-left">
          <h1 className="four-title">Install METAMASK</h1>
          <p className="four-info">
            The page you are looking for does not exist.
          </p>
          <Button
            text="Install MetaMask"
            onClick={() =>
              (window.location.href = "https://metamask.io/download.html")
            }
          />{" "}
        </div>

        <div className="four-right">
          <img src="404.svg" alt="404-image" />
        </div>
      </div>
    </>
  );
};

export default Connect;
