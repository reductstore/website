import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import CodeBlock from "@theme/CodeBlock";
import Link from "@docusaurus/Link";

function HomepageCLI() {
  return (
    <div className={styles.cliSection}>
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <div className={clsx("col col--7", styles.cliImage)}>
          <CodeBlock className="language-bash">{resonseCLI}</CodeBlock>
        </div>
        <div className={"col col--5 text--center"}>
          <h2 className="hideOnMobile">CLI Client</h2>
          <p>
            You can customize data retention and replication policies using the{" "}
            <strong>
              <Link to="https://cli.reduct.store">
                ReducStore CLI client
              </Link>
            </strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

const resonseCLI = `
reduct@store % pip install reduct-cli
reduct@store % rcli alias  add -L  https://play.reduct.store -t reduct play
reduct@store % rcli bucket show play/data --full
╭───────────────────── Info ─────────────────╮╭───────── Settings ─────────╮
│ Entry count:         1                     ││ Quota Type:         FIFO   │
│ Size:                30 GB                 ││ Quota Size:         30 GB  │
│ Oldest Record (UTC): 2022-12-20T16:36:41   ││ Max. Block Size:    64 MB  │
│ Latest Record (UTC): 2022-12-20T19:15:26   ││ Max. Block Records: 1024   │
│ History Interval:    3 hour(s)             ││                            │
│                                            ││                            │
│                                            ││                            │
│                                            ││                            │
│                                            ││                            │
│                                            ││                            │
╰────────────────────────────────────────────╯╰────────────────────────────╯
Entries
┏━━━━━━┳━━━━━━━━━┳━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━┓
┃      ┃         ┃       ┃ Oldest Record ┃ Latest Record  ┃           ┃
┃ Name ┃ Records ┃ Size  ┃ (UTC)         ┃ (UTC)          ┃ History   ┃
┡━━━━━━╇━━━━━━━━━╇━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━╇━━━━━━━━━━━┩
│ test │ 57154   │ 30 GB │ 2022-12-20T1… │ 2022-12-20T19… │ 3 hour(s) │
└──────┴─────────┴───────┴───────────────┴────────────────┴───────────┘
`.trim();

export default HomepageCLI;
