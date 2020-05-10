#!/bin/bash

set -euo pipefail

source '.buildkite/shared.sh'
setup_test

# Run tests
yarn run -s jest --runInBand .buildkite/tests/metadata.test.ts
