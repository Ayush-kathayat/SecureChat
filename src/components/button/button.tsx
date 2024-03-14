import "./button.css";

const Button = () => {
  return (
    <div className="btn-container">
      <a href="#" className="button">
        {" "}
        <div className="button__content">
          <span className="button__text">Download</span>
          <div className="button__reflection-1"></div>
          <div className="button__reflection-2"></div>
        </div>
      </a>
    </div>
  );
};

export default Button;
