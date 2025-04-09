#!/bin/bash

# Update location pages
for file in *property-management*.html; do
    if [[ -f "$file" ]]; then
        canonical_url=$(echo "$file" | sed 's/\.html$//')
        sed -i '' "s|<link rel=\"canonical\" href=\"https://laketahoepmg.com/.*\">|<link rel=\"canonical\" href=\"https://laketahoepmg.com/${canonical_url}\">|" "$file"
    fi
done

# Update blog posts
cd blog
for file in *.html; do
    if [[ -f "$file" ]]; then
        canonical_url=$(echo "$file" | sed 's/\.html$//')
        sed -i '' "s|<link rel=\"canonical\" href=\"https://laketahoepmg.com/.*\">|<link rel=\"canonical\" href=\"https://laketahoepmg.com/blog/${canonical_url}\">|" "$file"
    fi
done
cd ..

# Update service pages
for file in *.html; do
    if [[ -f "$file" && ! "$file" =~ (property-management|index|404|500) ]]; then
        canonical_url=$(echo "$file" | sed 's/\.html$//')
        sed -i '' "s|<link rel=\"canonical\" href=\"https://laketahoepmg.com/.*\">|<link rel=\"canonical\" href=\"https://laketahoepmg.com/${canonical_url}\">|" "$file"
    fi
done 