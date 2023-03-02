#!/usr/bin/env sh

set -e

yarn build

cd dist

git add -A
git commit -m "Deployment"
git subtree push origin gh-pages

cd -