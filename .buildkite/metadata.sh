# Extract pre-build files
buildkite-agent artifact download compiled.tgz .
tar -xzf compiled.tgz

# Run tests
node .buildkite/tests/metadata.js
