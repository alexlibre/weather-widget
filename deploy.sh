#!/usr/bin/env sh

set -e

yarn build

git add dist -f
git commit -m "Deployment"
git subtree push --prefix dist origin gh-pages

cd -