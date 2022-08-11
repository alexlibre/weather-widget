#!/usr/bin/env sh

set -e

yarn build

cd dist

git add -A
git commit -m "Deployment"
git push -f git@github.com:alexlibre/weather-widget.git master:gh-pages

cd -