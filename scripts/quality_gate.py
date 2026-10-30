#!/usr/bin/env python3
"""Bounded offline credential check adapted from aaaVibeCodingScaffold.

Checks working-tree text files, including untracked additions. Does not scan
history, ignored files, entropy, generic API keys or dependency vulnerabilities.
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATTERNS = [
    re.compile(r"gh[pousr]_[A-Za-z0-9]{30,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{40,}"),
    re.compile(r"AKIA[A-Z0-9]{16}"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
]


def main() -> int:
    result = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        cwd=ROOT, check=True, capture_output=True,
    )
    failures = 0
    for name in sorted(set(result.stdout.decode().split("\0")) - {""}):
        path = ROOT / name
        if not path.is_file() or path.suffix.lower() in {".jpg", ".jpeg", ".png", ".woff", ".woff2"}:
            continue
        try:
            content = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        if any(pattern.search(content) for pattern in PATTERNS):
            print(f"{name}: possible credential material (value redacted)")
            failures += 1
    print(f"Offline credential check: {failures} finding(s)")
    return int(bool(failures))


if __name__ == "__main__":
    raise SystemExit(main())
