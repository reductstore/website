import React, { useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import clsx from "clsx";
import styles from "./styles.module.css";

interface ParameterDetail {
  name: string;
  dataType: string;
  description: string;
  isRequired: boolean;
}

interface Parameter {
  type: string;
  details: ParameterDetail;
}

interface Response {
  status: string;
  message: string;
  summary?: string;
  description?: JSX.Element | string;
}

interface SwaggerComponentProps {
  method: string;
  path: string;
  summary: string;
  description: JSX.Element;
  parameters: Parameter[];
  responses: Response[];
}

interface GroupedParameters {
  [type: string]: Parameter[];
}

export default function SwaggerComponent({
  method,
  path,
  summary,
  description,
  parameters,
  responses,
}: SwaggerComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openResponse, setOpenResponse] = useState(null);

  const handleResponseClick = (statusCode) => {
    if (openResponse === statusCode) {
      setOpenResponse(null);
    } else {
      setOpenResponse(statusCode);
    }
  };

  const groupedParameters = parameters?.reduce<GroupedParameters>(
    (acc, param) => {
      const type = param.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(param);
      return acc;
    },
    {}
  );

  return (
    <div className={styles.swaggerComponent}>
      <div
        className={clsx(styles.swaggerHeader, isOpen && styles.open)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.methodPathContainer}>
          {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          <span
            className={clsx(styles.methodBadge, styles[method.toLowerCase()])}
          >
            {method}
          </span>
          <div className={styles.path}>{path}</div>
        </div>
        <div className={styles.summary}>{summary}</div>
      </div>

      {isOpen && (
        <div className={styles.swaggerDetails}>
          <p>{description}</p>
          <div className={styles.section}>
            <h4>Parameters</h4>
            {parameters ? (
              Object.entries(groupedParameters).map(([type, params]) => (
                <div key={type} className={styles.parametersSection}>
                  <div className={styles.parameterTypeTitle}>
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </div>

                  {params.map((param, idx) => (
                    <div key={idx} className={styles.parameterRow}>
                      <div className={styles.parameterName}>
                        {param.details.name}
                        {param.details.isRequired && (
                          <span className={styles.requiredAsterisk}>*</span>
                        )}
                      </div>
                      <div className={styles.parameterDataType}>
                        {param.details.dataType}
                      </div>
                      <div className={styles.parameterSummary}>
                        {param.details.description}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className={styles.parameterRow}>No parameters</div>
            )}
          </div>
          <div className={styles.section}>
            <h4>Responses</h4>
            {responses &&
              responses.map((response) => (
                <div key={response.status} className={styles.response}>
                  <div
                    onClick={
                      response.description
                        ? () => handleResponseClick(response.status)
                        : null
                    }
                    className={clsx(
                      styles.responseHeader,
                      response.description && styles.clickable
                    )}
                  >
                    <div className={styles.responseTextContainer}>
                      <span
                        className={clsx(
                          styles.bullet,
                          styles[classifyStatusCode(response.status)]
                        )}
                      ></span>
                      {response.status}: {response.message}
                    </div>
                    <div className={styles.responseSummaryAndArrow}>
                      <span className={styles.responseSummary}>
                        {response.summary}
                      </span>
                      {response.description &&
                        (openResponse === response.status ? (
                          <FaAngleDown className={styles.toggleArrow} />
                        ) : (
                          <FaAngleRight className={styles.toggleArrow} />
                        ))}
                    </div>
                  </div>

                  {openResponse === response.status && (
                    <div className={styles.responseDescription}>
                      {typeof response.description === "string"
                        ? response.description
                        : response.description}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function classifyStatusCode(statusCode) {
  if (statusCode >= 100 && statusCode < 200) {
    return "informational";
  }
  if (statusCode >= 200 && statusCode < 300) {
    return "successful";
  }
  if (statusCode >= 300 && statusCode < 400) {
    return "redirection";
  }
  if (statusCode >= 400 && statusCode < 500) {
    return "clientError";
  }
  if (statusCode >= 500) {
    return "serverError";
  }
}
