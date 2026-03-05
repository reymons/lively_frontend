#!/bin/sh

set -eu
set -o pipefail

pnpm run lint
pnpm run format:check
