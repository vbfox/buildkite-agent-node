# `buildkite-agent` for Node.js

[![CI](https://github.com/vbfox/buildkite-agent-node/workflows/CI/badge.svg)](https://github.com/vbfox/buildkite-agent-node/actions?query=workflow%3ACI) [![npm](https://img.shields.io/npm/v/buildkite-agent-node)](https://www.npmjs.com/package/buildkite-agent-node)

Access [Buildkite](https://buildkite.com/) agent commands from Node.js

The `buildkite-agent` binary has 2 roles: running builds and communicating additional information (Annotations, artifacts, ...) from a build to the agent running the build.

This project target is to provide access to the second set of commands from Node.js without needing the agent binary.

## Supported features

The library is currently in development without any stable release and only a small subset of the agent commands is implemented.

* [x] [`annotate`](https://buildkite.com/docs/agent/v3/cli-annotate)
* [ ] [`artifact`](https://buildkite.com/docs/agent/v3/cli-artifact)
* [ ] [`meta-data`](https://buildkite.com/docs/agent/v3/cli-meta-data)
* [ ] [`pipeline`](https://buildkite.com/docs/agent/v3/cli-pipeline) 

## Examples

Adding an annotation:

```typescript
import { annotate, AnnotationStyle } from 'buildkite-agent-node';

annotate('Hello world 👋!', {
    context: 'example',
    style: AnnotationStyle.Success
});
```

## Users

* [jest-buildkite-reporter](https://github.com/vbfox/jest-buildkite-reporter) Report [Jest](https://jestjs.io/) test results to Buildkite as annotations.

## License

This project is using the [MIT](LICENSE) license.
