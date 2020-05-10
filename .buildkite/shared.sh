#!/bin/bash

function setup_env {
    export CLICOLOR=1
    export CLICOLOR_FORCE=1
    export FORCE_COLOR=1
    export TERM=xterm-color
}

function extract_compiled_artifact {
    buildkite-agent artifact download compiled.tgz .
    tar -xzf compiled.tgz
}

function setup_test {
    setup_env
    extract_compiled_artifact
}
