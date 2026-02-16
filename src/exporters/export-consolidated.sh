#!/bin/bash
# src/exporters/export-consolidated.sh

# Exports all KD artifacts into a single Markdown file

OUTPUT_FILE=".kracked/KD_output/project-consolidated.md"

echo "# Project Consolidated Export" > "$OUTPUT_FILE"
echo "Generated: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Status
echo "## Status" >> "$OUTPUT_FILE"
cat .kracked/KD_output/status/status.md >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# PRD
if [ -f .kracked/KD_output/PRD/prd.md ]; then
    echo "## PRD" >> "$OUTPUT_FILE"
    cat .kracked/KD_output/PRD/prd.md >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
fi

# Architecture
if [ -d .kracked/KD_output/architecture ]; then
    echo "## Architecture" >> "$OUTPUT_FILE"
    for file in .kracked/KD_output/architecture/*.md; do
        if [ -f "$file" ]; then
            echo "### $(basename "$file")" >> "$OUTPUT_FILE"
            cat "$file" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
        fi
    done
fi

echo "Export complete: $OUTPUT_FILE"
