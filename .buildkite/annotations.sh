#!/bin/bash

set -euo pipefail

source '.buildkite/shared.sh'
setup_test

# Run tests
node .buildkite/tests/annotations.js
