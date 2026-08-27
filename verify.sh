#!/usr/bin/env bash

set -euo pipefail

yarn lint
yarn lint:deps
yarn test
