#!/bin/bash

PROJECT_NAME="nihontechhub-web"
BOILERPLATE="next-boilerplate"

# Define an array of files to update
FILES=(
  "README.md"
  "docker-compose.yml"
  "docker-compose.production.yml"
  "docker-compose.override.yml"
  "package.json"
  "package-lock.json"
  "dockerfile.production"
  "dockerfile.development"
  "makefile"
)

# Define the replacements (key-value pairs)
declare -A REPLACEMENTS=(
  ["${BOILERPLATE}"]="${PROJECT_NAME}"
)

# Loop through each file and perform replacements
for FILE in "${FILES[@]}"; do
  if [[ -f "$FILE" ]]; then
    for OLD_TEXT in "${!REPLACEMENTS[@]}"; do
      NEW_TEXT=${REPLACEMENTS[$OLD_TEXT]}
      sed -i "s/${OLD_TEXT}/${NEW_TEXT}/g" "$FILE"
      echo "Replaced '${OLD_TEXT}' with '${NEW_TEXT}' in ${FILE}"
    done
  else
    echo "File ${FILE} does not exist."
  fi
done

echo "Template replacement completed."
