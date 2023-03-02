#!/usr/bin/env sh

set -e

yarn build

cd dist

git add -A
git commit -m "Deployment"
git subtree push --prefix dist origin gh-pages

cd -