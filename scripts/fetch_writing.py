#!/usr/bin/env python3
"""Fetch the latest posts from the configured RSS/Atom feeds and write them to
assets/data/writing.json for the site's "Latest writing" list.

Runs in CI (see .github/workflows/update-writing.yml). Fails soft: a feed that is
unreachable or empty is skipped, not fatal, so one bad source never blanks the list.
"""

import datetime as dt
import json
import sys
import urllib.request

import feedparser

# (label shown on the site, feed URL)
SOURCES = [
    ("Medium", "https://medium.com/feed/@kgvalc"),
    ("DOST-ASTI", "https://asti.dost.gov.ph/author/kurt-valcorza/feed/"),
]

MAX_ITEMS = 5
OUTPUT = "assets/data/writing.json"
UA = "Mozilla/5.0 (compatible; kurtvalcorza-site-bot/1.0; +https://kurt.valcorza.com)"


def entry_date(entry):
    parsed = getattr(entry, "published_parsed", None) or getattr(entry, "updated_parsed", None)
    if not parsed:
        return None
    return dt.datetime(*parsed[:6], tzinfo=dt.timezone.utc)


def fetch(label, url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read()
    except Exception as exc:  # noqa: BLE001 - one bad feed must not break the build
        print(f"warn: could not fetch {label} ({url}): {exc}", file=sys.stderr)
        return []

    feed = feedparser.parse(raw)
    items = []
    for entry in feed.entries:
        title = (entry.get("title") or "").strip()
        link = (entry.get("link") or "").strip()
        if not title or not link.startswith("https://"):
            continue
        when = entry_date(entry)
        items.append(
            {
                "title": title,
                "link": link,
                "source": label,
                "date": when.isoformat() if when else None,
            }
        )
    print(f"info: {label}: {len(items)} item(s)", file=sys.stderr)
    return items


def load_existing():
    try:
        with open(OUTPUT, encoding="utf-8") as fh:
            data = json.load(fh)
    except (OSError, ValueError):
        return []
    if not isinstance(data, dict):
        return []
    return data.get("items") or []


def main():
    old_items = load_existing()

    new_items = []
    for label, url in SOURCES:
        new_items.extend(fetch(label, url))

    # Newest first; entries without a date sort last.
    new_items.sort(key=lambda it: it["date"] or "", reverse=True)
    new_items = new_items[:MAX_ITEMS]

    # A transient outage (every source empty) must not wipe good data.
    if not new_items and old_items:
        print("warn: no items fetched from any source; keeping existing feed", file=sys.stderr)
        return

    # Only rewrite when the posts actually changed, so the daily run doesn't
    # produce a no-op commit just because the timestamp moved.
    if new_items == old_items:
        print("info: feed unchanged; leaving writing.json as-is")
        return

    payload = {
        "updated": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "items": new_items,
    }
    with open(OUTPUT, "w", encoding="utf-8") as fh:
        json.dump(payload, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print(f"wrote {len(new_items)} item(s) to {OUTPUT}")


if __name__ == "__main__":
    main()
