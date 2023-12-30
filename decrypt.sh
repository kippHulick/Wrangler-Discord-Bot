#!/bin/sh

# Decrypt the file
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$COOKIE_KEY" \
--output $HOME/cookies.json cookies.json.gpg
