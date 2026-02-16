#!/bin/bash
# src/exporters/export-pdf.sh

# Requires pandoc and pdflatex or wkhtmltopdf
# This is a placeholder for the actual implementation

echo "Exporting to PDF..."
INPUT_FILE=".kracked/KD_output/project-consolidated.md"
OUTPUT_FILE=".kracked/KD_output/project-report.pdf"

if command -v pandoc &> /dev/null; then
    pandoc "$INPUT_FILE" -o "$OUTPUT_FILE" --toc
    echo "PDF generated: $OUTPUT_FILE"
else
    echo "Error: pandoc not found. Please install pandoc to generate PDFs."
    exit 1
fi
