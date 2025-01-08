#!/bin/bash

# Function to show usage
show_usage() {
    echo "Usage: $0 <directory> [--hidden]"
    echo "  --hidden: Include hidden files"
    exit 1
}

# Function to get comment format based on file extension
get_comment_format() {
    local file="$1"
    local ext="${file##*.}"
    
    case "${ext,,}" in
        js|jsx|ts|tsx|java|c|cpp|h|hpp)
            echo "// NEW FILE: $2"
            ;;
        py|rb|yml|yaml|sh)
            echo "# NEW FILE: $2"
            ;;
        html|htm|xml|md)
            echo "<!-- NEW FILE: $2 -->"
            ;;
        css|scss|less)
            echo "/* NEW FILE: $2 */"
            ;;
        *)
            echo "### NEW FILE: $2 ###"
            ;;
    esac
}

# Function to check if a file is binary
is_binary() {
    local file="$1"
    # Use 'file' command to check if the file is binary
    if file "$file" | grep -q "text"; then
        return 1
    else
        return 0
    fi
}

# Check arguments
if [ $# -lt 1 ]; then
    show_usage
fi

# Process arguments
DIR="$1"
INCLUDE_HIDDEN=0
OUTPUT_FILE="combined_output.md"
PROCESSED_FILES=()
SKIPPED_FILES=()

# Check for --hidden flag
for arg in "$@"; do
    if [ "$arg" == "--hidden" ]; then
        INCLUDE_HIDDEN=1
    fi
done

# Check if directory exists
if [ ! -d "$DIR" ]; then
    echo "Error: Directory '$DIR' does not exist"
    exit 1
fi

# Create temporary file
TMP_FILE=$(mktemp)

echo "Processing directory: $DIR"
echo "Including hidden files: $([[ $INCLUDE_HIDDEN -eq 1 ]] && echo "yes" || echo "no")"

# Function to process files
process_files() {
    local current_dir="$1"
    local base_dir="$2"
    
    # Process all files in the current directory
    while IFS= read -r -d '' file; do
        # Get relative path
        local rel_path="${file#$base_dir/}"
        
        # Skip hidden files unless --hidden is specified
        if [[ $INCLUDE_HIDDEN -eq 0 && $(basename "$file") == .* ]]; then
            SKIPPED_FILES+=("$rel_path (hidden)")
            continue
        fi
        
        # Skip if file is binary
        if is_binary "$file"; then
            SKIPPED_FILES+=("$rel_path (binary)")
            continue
        }
        
        # Check if file is readable
        if [ ! -r "$file" ]; then
            SKIPPED_FILES+=("$rel_path (permission denied)")
            continue
        fi
        
        # Get comment format and append to output
        local comment=$(get_comment_format "$file" "$rel_path")
        echo -e "\n$comment\n" >> "$TMP_FILE"
        cat "$file" >> "$TMP_FILE"
        PROCESSED_FILES+=("$rel_path")
        
    done < <(find "$current_dir" -type f -print0)
}

# Process the directory
process_files "$DIR" "$DIR"

# Move temporary file to final output
mv "$TMP_FILE" "$OUTPUT_FILE"

# Print results
echo -e "\nProcessed Files:"
for file in "${PROCESSED_FILES[@]}"; do
    echo "✓ $file"
done

echo -e "\nSkipped Files:"
for file in "${SKIPPED_FILES[@]}"; do
    echo "⨯ $file"
done

echo -e "\nOutput written to: $OUTPUT_FILE"