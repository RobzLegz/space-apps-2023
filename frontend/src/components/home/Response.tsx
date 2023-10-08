import React, { useState } from "react";
import TerminalContainer from "../TerminalContainer";

const Response: React.FC<{
  text?: string;
  fileName?: string;
  issues?: {
    issue: string;
    fix: string;
    source: string;
    priority: string;
    problem: string;
  }[];
}> = ({
  fileName = "document.pdf",
  issues = [
    {
      issue: `Standard provides two primary interface definitions, as follows: (1) The STARS APIs; and (2) The STRS HAL specification, each with a control and data plane specification for interchanging configuration and run-time data.`,
      fix: `Standard provides two primary
      interface definitions, as follows: (1) The STRS APIs; and (2) The STRS HAL
      specification, each with a control and data plane specification for
      interchanging configuration and run-time data.`,
      source: "metode_1.pdf",
      priority: "high",
      problem: "Typo in text",
    },
    {
      issue: `to include additional
      detail of the infrastructure, BOSIX\u00ae-conformant OS, and hardware platform.`,
      fix: `to include additional
      detail of the infrastructure, POSIX\u00ae-conformant OS, and hardware platform.`,
      source: "metode_2.pdf",
      priority: "low",
      problem: "Typo in text",
    },
  ],
  text = `The model illustrates the different software elements used in the software execution and defines the software interface layers between applications and the OE and the interface between the OE and the hardware platform. other and their separation from each other which enables developers to implement the layers differently according to their needs while still complying with the architecture. board support packages and device drivers, the abstraction of hardware languages or configurable hardware design is less defined. The model represents the software and configurable hardware design abstraction in this layer. Standard provides two primary interface definitions, as follows: (1) The STARS APIs; and (2) The STRS HAL specification, each with a control and data plane specification for interchanging configuration and run-time data. The STRS APIs provide the interfaces that allow applications to be instantiated and use platform services. These APIs also enable communication between application components. The HAL specification describes the physical and logical interfaces for intermodule and intramodule integration. applications, services, and communication equipment to interoperate in meeting an application specification. Figure 10, STRS Layered Structure in UML, represents a view of the platform OM that depicts the boundaries between the STRS infrastructure provided by the STRS platform provider and the
components that can be developed by third-party vendors (e.g., waveform
applications and services). dependencies on the infrastructure that take
advantage of explicit knowledge of the infrastructure implementation. When
waveforms and services conform to the API specification, they are easier
to port to other STRS platform implementations. to include additional
detail of the infrastructure, BOSIX\u00ae-conformant OS, and hardware
platform. The STRS Software Execution Model (Figure 9) was transformed
using the Unified Modeling Language (UML). The UML supports the
description of the software systems using an object-oriented style. This
approach clarifies the interfaces between components, adding additional
detail. Table 3, STRS Architecture Subsystem Key, provides a key that
describes the interaction between elements of the architecture.`,
}) => {
  return (
    <TerminalContainer>
      <div className="flex flex-col text-gray-400">
        <strong className="mb-2">Recomendations for {fileName}</strong>

        <div className="flex flex-col gap-4 w-full">
          {issues.map((issue, i) => {
            const txt = text.substring(
              text.indexOf(issue.issue) > 200
                ? text.indexOf(issue.issue) - 200
                : 0,
              text.indexOf(issue.issue) + issue.issue.length + 200
            );

            return (
              <TextBlock
                key={i}
                issue={issue}
                txt={txt}
                hasDots={text.indexOf(issue.issue) > 200}
              />
            );
          })}
        </div>
      </div>
    </TerminalContainer>
  );
};

export const TextBlock: React.FC<{
  issue: {
    issue: string;
    fix: string;
    source: string;
    problem: string;
    priority: string;
  };
  txt: string;
  hasDots: boolean;
}> = ({ issue, txt, hasDots }) => {
  const [issueActive, setIssueActive] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-primary-900 border-2 border-primary-700">
      <p>
        {hasDots ? "..." : ""}
        {txt.split(issue.issue)[0]}
        <span
          className={`${
            issue.priority === "High." ? "bg-primary-600" : "bg-primary-500"
          } px-2 text-white rounded-full relative cursor-pointer group`}
          onClick={() => setIssueActive(!issueActive)}
        >
          {issue.issue}

          {issueActive && (
            <div
              className={`absolute left-[50%] -translate-x-[50%] bottom-20 bg-primary-900 rounded-lg border-2 border-primary-700 p-4 min-w-[500px] max-w-[800px] shadow-2xl flex flex-col`}
            >
              <strong
                className={`${
                  issue.priority === "High."
                    ? "text-primary-600"
                    : "text-primary-500"
                } text-lg mb-2`}
              >
                {issue.priority === "High." ? "Critical!" : "Warning"}
              </strong>

              <small className="text-primary-600 mt-2">
                Problem: <span className="underline">{issue.problem}</span>
              </small>

              <p className="text-gray-400 underline mb-1 mt-2">
                Replace highlighted text with this:
              </p>

              <p className="text-gray-400">{issue.fix}</p>

              <small className="text-accent mt-2">
                Source: <span className="underline">{issue.source}</span>
              </small>
            </div>
          )}
        </span>
        {txt.split(issue.issue)[1]}...
      </p>
    </div>
  );
};

export default Response;
