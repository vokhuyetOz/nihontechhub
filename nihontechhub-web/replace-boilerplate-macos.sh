#!/bin/bash

PROJECT_NAME="<your-project-name>"
BOILERPLATE="next-boilerplate"

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

for FILE in "${FILES[@]}"; do
  if [[ -f "$FILE" ]]; then
    sed -i '' "s/${BOILERPLATE}/${PROJECT_NAME}/g" "$FILE"
    echo "Replaced '${BOILERPLATE}' with '${PROJECT_NAME}' in ${FILE}"
  else
    echo "File ${FILE} does not exist."
  fi
done

echo "🔥 Boilerplate be gone. Replacement done."
