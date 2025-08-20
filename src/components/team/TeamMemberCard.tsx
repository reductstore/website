import React from "react";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "@docusaurus/Link";

type TeamMemberCardProps = {
  name: string;
  role: string;
  image: string;
  author: string;
  linkedin: string;
};
export default function TeamMemberCard({
  name,
  role,
  image,
  author,
  linkedin,
}: TeamMemberCardProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "1.5rem",
      }}
    >
      <img
        src={`/img/team/${image}`}
        alt={name}
        style={{
          borderRadius: "50%",
          width: "72px",
          height: "72px",
          objectFit: "cover",
        }}
      />
      <div>
        <Link to={`/blog/authors/${author}`}>
          <strong style={{ fontSize: "1.1rem", color: "#4B0082" }}>
            {name}
          </strong>
        </Link>
        <div>{role}</div>
        <div style={{ marginTop: "0.3rem" }}>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "0.5rem" }}
          >
            <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "20px" }} />
          </a>
        </div>
      </div>
    </div>
  );
}
