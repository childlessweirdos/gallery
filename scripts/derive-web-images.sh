#!/bin/sh
# Full-sheet JPEGs from the print masters. No crop, no resize, no recolor.
# Gallery previews are a smaller copy for the walking row only.
set -eu
cd "$(dirname "$0")/.."
mkdir -p public/art public/art/gallery

for name in d-953 guqin for-dexter jet-set-overspray too-shear bot-boop; do
  sips -s format jpeg -s formatOptions 90 \
    "masters/${name}.tif" \
    --out "public/art/${name}.jpg"
  sips -s format jpeg -s formatOptions 72 --resampleHeightWidthMax 960 \
    "masters/${name}.tif" \
    --out "public/art/gallery/${name}.jpg"
done
