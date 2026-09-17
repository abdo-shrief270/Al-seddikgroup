#!/usr/bin/env bash
# يبني ملف عرض السعر PDF من proposal.html
# التعديل: غيّر الأسعار أو المحتوى داخل proposal.html ثم شغّل هذا الملف
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/Al-Seddik-Proposal.pdf"
TMP="$(mktemp -d)"
CHROME="${CHROME:-/opt/pw-browsers/chromium}"

python3 - "$ROOT" "$TMP" <<'PY'
import base64, pathlib, sys
root, tmp = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
d = lambda p, m: f"data:{m};base64," + base64.b64encode((root / p).read_bytes()).decode()
h = (root / "docs/proposal/proposal.html").read_text()
h = (h.replace("__FONT_AR__",  d("fonts/cairo-arabic.woff2", "font/woff2"))
      .replace("__FONT_LAT__", d("fonts/cairo-latin.woff2",  "font/woff2"))
      .replace("__LOGO__",     d("images/logo.png",          "image/png")))
(tmp / "build.html").write_text(h)
PY

"$CHROME" --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --virtual-time-budget=8000 --print-to-pdf="$OUT" "$TMP/build.html" 2>/dev/null
rm -rf "$TMP"
echo "تم إنشاء: $OUT"
