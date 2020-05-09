# Extract pre-build files
buildkite-agent artifact download compiled.tgz .
tar -xzf compiled.tgz

node .buildkite/tests/annotations.js