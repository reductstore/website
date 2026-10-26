# Regenerate with: python3 build.py
import sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT / 'scripts/diagrams'))

from blogkit import Diagram, render_social  # noqa: E402


def hot_backup():
    d = Diagram()
    d.zone(10, 30, 280, 222, 'Primary instance')
    d.card(48, 102, 204, 78, 'ReductStore', 'source data', brand=True)

    d.zone(430, 30, 280, 222, 'Backup instance')
    d.card(468, 102, 204, 78, 'ReductStore', 'backup data', brand=True)

    d.arrow((180, 102), (180, 71), (540, 71), (540, 102))
    d.text(360, 63, 'reduct-cli cp', 'text-label-strong', mono=True)
    d.text(360, 93, 'scheduled or incremental copy', 'text-label')

    d.arrow((540, 180), (540, 211), (180, 211), (180, 180), dashed=True)
    d.text(360, 233, 'restore', 'text-label', mono=True)
    return d


if __name__ == '__main__':
    render_social(hot_backup(), HERE / 'hot-backup-social.png')
