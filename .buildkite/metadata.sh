# Extract pre-build files
buildkite-agent artifact download compiled.tgz .
tar -xzf compiled.tgz

# Run tests
yarn run -s jest --runInBand .buildkite/tests/metadata.test.ts
