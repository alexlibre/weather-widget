#!/usr/bin/env sh

set -e

yarn build

cd dist

git add -A
git commit -m "Deployment"
git push --prefix origin gh-pages

cd -