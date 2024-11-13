import React, { useState } from "react";

const DoNotSell: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = () => {
    if (typeof window.revisitCkyConsent === "function") {
      window.revisitCkyConsent();
      setMessage(null);
    } else {
      console.warn("revisitCkyConsent function is not defined");
      setMessage(
        "This feature is not available in your region. We do not sell or share your personal information.",
      );
    }
  };

  return (
    <div>
      <a
        href="javascript:void(0)"
        onClick={handleClick}
        style={{ fontWeight: "bold" }}
      >
        Do Not Sell or Share My Personal Information
      </a>
      {message && <p style={{ color: "gray", marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default DoNotSell;
