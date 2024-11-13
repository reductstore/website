import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css";
import styles from "./styles.module.css";

const TerminalAnimation = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      scrollback: 0,
      scrollOnUserInput: false,
      theme: {
        background: "#282a36",
      },
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    terminal.loadAddon(fitAddon);
    terminal.loadAddon(webLinksAddon);

    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      fitAddon.fit();

      const welcomeMessage =
        "\r\n \x1b[1mAdmin Tool for ReductStore\x1b[0m (https://github.com/reductstore/reduct-cli)\r\n";

      terminal.writeln(welcomeMessage);

      const commands = [
        " $ reduct-cli alias add play -L https://play.reduct.store -t reductstore",
        " $ reduct-cli server status play",
        " $ reduct-cli bucket ls --full play",
        " $ reduct-cli cp play/datasets .",
      ];

      const outputs = [
        [],
        [
          " Status:     \x1b[1m\x1b[32mOk\x1b[0m\x1b[0m",
          " Version:    \x1b[1m\x1b[34m1.9.2\x1b[0m\x1b[0m",
          " Uptime:     \x1b[1m\x1b[34m3\x1b[0m week(s)\x1b[0m",
        ],
        [
          " +-------------------------------------------------------------------------------------+",
          " | Name           | Entry Count | Size     | Oldest Record (UTC) | Latest Record (UTC) |",
          " +-------------------------------------------------------------------------------------+",
          " | \x1b[32mbucket-1\x1b[0m       |           0 | 0 B      | ---                 | ---                 |",
          " | \x1b[32mdatasets\x1b[0m       |           3 | 31 GB    | 1970-01-01 00:00:00 | 1970-01-01 00:00:00 |",
          " | \x1b[32mdemo\x1b[0m           |           2 | 10 GB    | 2024-04-04 21:38:44 | 2024-04-05 08:40:28 |",
          " | \x1b[32mstress_test\x1b[0m    |           2 | 20 GB    | 2024-04-05 01:27:43 | 2024-04-05 08:40:28 |",
          " | \x1b[32mtest\x1b[0m           |           1 | 196 KB   | 1970-01-01 00:00:00 | 1970-01-01 00:00:00 |",
          " +-------------------------------------------------------------------------------------+",
          " | \x1b[32mTotal\x1b[0m          |           8 | 61 GB    | ---                 | ---                 |",
          " +-------------------------------------------------------------------------------------+",
        ],
        [],
      ];

      let currentCommandIndex = 0;

      const typeCommand = () => {
        if (currentCommandIndex < commands.length) {
          let charIndex = 0;
          const command = commands[currentCommandIndex] + "\r\n";

          const typeChar = () => {
            if (charIndex < command.length) {
              terminal.write(command[charIndex]);
              charIndex++;
              setTimeout(typeChar, Math.random() * 50 + 10);
            } else {
              if (currentCommandIndex < commands.length - 1) {
                outputs[currentCommandIndex].forEach((line) =>
                  terminal.writeln(line),
                );
              }
              currentCommandIndex++;
              setTimeout(() => {
                if (currentCommandIndex < commands.length) {
                  typeCommand();
                } else {
                  showLoadingBar();
                }
              }, 200);
            }
          };
          typeChar();
        }
      };

      const showLoadingBar = () => {
        let loaded = 0;
        const total = 50;

        const loadStep = () => {
          if (loaded <= total) {
            terminal.write("\r [");
            for (let i = 0; i < total; i++) {
              if (i < loaded) {
                terminal.write("=");
              } else if (i === loaded) {
                terminal.write(">");
              } else {
                terminal.write(" ");
              }
            }
            terminal.write("]");
            loaded++;
            setTimeout(loadStep, 50);
          } else {
            terminal.writeln("\r\n Operation Completed.");
            setTimeout(resetTerminal, 5000);
          }
        };

        loadStep();
      };

      const resetTerminal = () => {
        terminal.reset();
        terminal.writeln(welcomeMessage);
        currentCommandIndex = 0;
        typeCommand();
      };

      typeCommand();
    }
  }, []);

  return <div ref={terminalRef} className={styles.terminal}></div>;
};

export default TerminalAnimation;
