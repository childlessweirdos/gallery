#!/bin/sh
# Full-sheet JPEGs from the print masters. No crop, no resize, no recolor.
set -eu
cd "$(dirname "$0")/.."
mkdir -p public/art

for name in d-953 guqin for-dexter jet-set-overspray too-shear bot-boop; do
  sips -s format jpeg -s formatOptions 90 \
    "masters/${name}.tif" \
    --out "public/art/${name}.jpg"
done
