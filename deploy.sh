#!/usr/bin/env sh

set -e

yarn build

cd dist

git add -A
git commit -m "Deployment"
git subtree push --prefix $1 origin gh-pages

cd -