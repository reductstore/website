import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import styles from "./styles.module.css";

const TerminalAnimation: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 13,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      fitAddon.fit();

      const commands = [
        ' $ reduct-cli alias add play -L https://play.reduct.store -t reductstore',
        ' $ reduct-cli server status play',
        ' $ reduct-cli bucket ls --full play',
        ' $ reduct-cli cp play/datasets .',
      ];

      const output = [
        ' Status:     Ok',
        ' Version:    1.9.2',
        ' Uptime:     3 week(s)',
        ' +------------------------------------------------------------------------------------+',
        ' |        Name | Entry Count |    Size    | Oldest Record (UTC) | Latest Record (UTC) |',
        ' +------------------------------------------------------------------------------------+',
        ' |    bucket-1 |           0 |        0 B | ---                 | ---                 |',
        ' |    datasets |           3 |      31 GB | 1970-01-01 00:00:00 | 1970-01-01 00:00:00 |',
        ' |        demo |           2 |      10 GB | 2024-04-04 21:38:44 | 2024-04-05 08:40:28 |',
        ' | stress_test |           2 |      20 GB | 2024-04-05 01:27:43 | 2024-04-05 08:40:28 |',
        ' |        test |           1 |     196 KB | 1970-01-01 00:00:00 | 1970-01-01 00:00:00 |',
        ' +------------------------------------------------------------------------------------+',
        ' |       Total |           8 |      61 GB | ---                 | ---                 |',
        ' +------------------------------------------------------------------------------------+',
      ];



      const typeCommand = (commandIndex = 0) => {
        if (commandIndex < commands.length) {
          let charIndex = 0;
          const command = commands[commandIndex] + '\r\n';

          const typeChar = () => {
            if (charIndex < command.length) {
              terminal.write(command[charIndex]);
              charIndex++;
              setTimeout(typeChar, Math.random() * 50 + 10);
            } else if (commandIndex === commands.length - 1) {
              terminal.writeln('');
              output.forEach(line => terminal.writeln(line));
              setTimeout(() => {
                terminal.reset();
                typeCommand();
              }, 5000);
            } else {
              setTimeout(() => typeCommand(commandIndex + 1), 500);
            }
          };
          typeChar();
        }
      };

      typeCommand();
    }
  }, []);

  return <div ref={terminalRef} className={styles.terminal}></div>;
};

export default TerminalAnimation;
