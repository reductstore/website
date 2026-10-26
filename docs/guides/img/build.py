# Regenerate with: python3 build.py
import sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT / "scripts/diagrams"))

from blogkit import Diagram  # noqa: E402


def hot_backup():
    d = Diagram()
    d.zone(10, 30, 280, 222, "Primary instance")
    d.card(48, 102, 204, 78, "ReductStore", "source data", brand=True)

    d.zone(430, 30, 280, 222, "Backup instance")
    d.card(468, 102, 204, 78, "ReductStore", "backup data", brand=True)

    d.arrow((180, 102), (180, 71), (540, 71), (540, 102))
    d.text(360, 63, "reduct-cli cp", "text-label-strong", mono=True)
    d.text(360, 93, "scheduled or incremental copy", "text-label")

    d.arrow((540, 180), (540, 211), (180, 211), (180, 180), dashed=True)
    d.text(360, 233, "restore", "text-label", mono=True)
    return d


def hot_standby():
    d = Diagram()
    d.card(280, 8, 200, 62, "Load balancer", "GET /api/v1/ready")
    d.card(315, 104, 130, 40, "Failover")

    d.arrow((380, 104), (380, 70))
    d.text(392, 83, "switch", "text-label", anchor="start")
    d.text(392, 99, "traffic", "text-label", anchor="start")

    d.panel(10, 196, 332, 174, "Primary node", "RS_INSTANCE_ROLE=PRIMARY", anchor="start")
    d.card(62, 254, 228, 74, "ReductStore", "active writer", brand=True)

    d.panel(418, 196, 332, 174, "Secondary node", "RS_INSTANCE_ROLE=SECONDARY", anchor="start")
    d.card(470, 254, 228, 74, "ReductStore", "standby", brand=True)

    d.card(214, 434, 332, 70, "Shared storage", "RS_DATA_PATH + lock file", accent=True)

    d.arrow((300, 70), (300, 96), (242, 96), (242, 254))
    d.text(271, 88, "traffic", "text-label")
    d.arrow((460, 70), (460, 96), (650, 96), (650, 254), dashed=True)
    d.text(555, 88, "health check", "text-label")

    d.arrow((335, 144), (250, 196))
    d.text(292, 160, "check status", "text-label")
    d.arrow((425, 144), (510, 196), dashed=True)
    d.text(468, 160, "check status", "text-label")

    d.arrow((176, 328), (176, 398), (330, 398), (330, 434), both=True)
    d.text(272, 390, "writes + refreshes lock", "text-label")
    d.arrow((584, 328), (584, 398), (438, 398), (438, 434), dashed=True, both=True)
    d.text(511, 390, "watches stale lock", "text-label")
    return d


def read_replicas():
    d = Diagram()
    d.zone(10, 88, 230, 190, "Ingestion endpoint")
    d.card(42, 156, 166, 74, "ReductStore", "writer", brand=True)

    d.card(48, 8, 154, 52, "Write clients", "ingestion")
    d.arrow((125, 60), (125, 156))

    d.card(496, 8, 204, 52, "Query endpoint", "load balancer")

    d.panel(310, 88, 440, 190, "Read-only replicas", "RS_INSTANCE_ROLE=REPLICA", anchor="start")
    d.card(338, 156, 166, 74, "ReductStore", "replica 1", brand=True)
    d.card(556, 156, 166, 74, "ReductStore", "replica 2", brand=True)

    d.card(170, 348, 510, 70, "Shared storage", "RS_DATA_PATH", accent=True)

    d.arrow((125, 230), (125, 312), (330, 312), (330, 348))
    d.text(210, 302, "writes", "text-label")
    d.arrow((421, 348), (421, 292), (421, 230), dashed=True)
    d.arrow((639, 348), (639, 292), (639, 230), dashed=True)
    d.text(530, 322, "refresh indexes", "text-label")

    d.arrow((504, 193), (540, 193), (540, 60), dashed=True)
    d.arrow((639, 156), (639, 60), dashed=True)
    d.text(590, 110, "read traffic", "text-label")
    d.arrow((598, 8), (598, -22))
    return d


def save(diagram, name):
    diagram.save(HERE / name)
    diagram.save(ROOT / "versioned_docs/version-1.21.x/guides/img" / name)


if __name__ == "__main__":
    save(hot_backup(), "disaster_recovery_hot_backup.svg")
    save(hot_standby(), "disaster_recovery_hot_standby.svg")
    save(read_replicas(), "disaster_recovery_read_replicas.svg")
