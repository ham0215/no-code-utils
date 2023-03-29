#!/bin/sh

set -eu

npx tsc --noEmit --listFiles | grep ': error TS' | awk -F'(' '{print $1}' | xargs rm -f
