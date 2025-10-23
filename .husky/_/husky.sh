#!/usr/bin/env sh
# husky shim
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

if ! command_exists sh ; then
  echo 'sh is required'
  exit 1
fi

"$@"
