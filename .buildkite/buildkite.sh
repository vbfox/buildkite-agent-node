#!/bin/bash

set -euo pipefail

yarn install

yarn run -s build

#find . \( -type f -path "./dist" -or -type f -path "./.buildkite/tests" -or -path "./node_modules" \) -exec tar czvf compiled.tar.gz {} +
tar czf compiled.tgz "./node_modules" "./dist"
buildkite-agent artifact upload compiled.tgz
