#!/usr/bin/env python3
"""Web JPEGs for the classic strips, and a record to paste for each new one.

Save the export as masters/comics/<slug>.png, then run `npm run comics`.
Paste the printed record into content/strips.ts.
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / "masters" / "comics"
PUBLIC = ROOT / "public" / "comics"
CATALOG = ROOT / "content" / "strips.ts"
# The cast portrait on the comics index. Not a strip.
CAST = "cast"


def convert(src: Path, dest: Path) -> tuple[int, int]:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(
        [
            "sips",
            "-s",
            "format",
            "jpeg",
            "-s",
            "formatOptions",
            "90",
            "--resampleHeightWidthMax",
            "2000",
            str(src),
            "--out",
            str(dest),
        ],
        stdout=subprocess.DEVNULL,
    )
    info = subprocess.check_output(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(dest)],
        text=True,
    )
    width = height = 0
    for line in info.splitlines():
        if "pixelWidth" in line:
            width = int(line.split()[-1])
        if "pixelHeight" in line:
            height = int(line.split()[-1])
    return width, height


def main() -> int:
    if not MASTERS.is_dir():
        print(f"No {MASTERS.relative_to(ROOT)} yet. Nothing to derive.")
        return 0

    catalog = CATALOG.read_text()
    known = set(re.findall(r'slug:\s*"([^"]+)"', catalog))
    sources = sorted(MASTERS.glob("*.png")) + sorted(MASTERS.glob("*.PNG"))
    seen: set[str] = set()
    fresh: list[tuple[str, int, int]] = []

    for src in sources:
        slug = src.stem.lower().replace(" ", "-")
        if slug in seen:
            continue
        seen.add(slug)
        dest = PUBLIC / f"{slug}.jpg"
        width, height = convert(src, dest)
        print(f"{slug}.jpg  {width}×{height}")
        if slug != CAST and slug not in known:
            fresh.append((slug, width, height))

    if not fresh:
        print("\nWeb images updated. No new strips to paste.")
        return 0

    print("\nPaste this at the end of the list in content/strips.ts.")
    print("Fill in the title, the date, and one line on what the picture shows.\n")
    for slug, width, height in fresh:
        print(
            "  {\n"
            f'    slug: "{slug}",\n'
            '    title: "",\n'
            '    date: "2026-01-01",\n'
            '    alt: "",\n'
            f"    width: {width},\n"
            f"    height: {height},\n"
            "  },"
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
