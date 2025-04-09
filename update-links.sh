#!/bin/bash

# Update all .html files
find . -type f -name "*.html" -exec sed -i '' 's/href="\([^"]*\)\.html"/href="\1"/g' {} +

# Update links in JavaScript files
find . -type f -name "*.js" -exec sed -i '' 's/"\([^"]*\)\.html"/"\1"/g' {} + 