#!/bin/bash

# Educate the normies
yeet_usage() {
    echo "Usage: $0 <directory> [--hidden] [--ignore pattern1 pattern2 ...]"
    echo "  --hidden: See the forbidden files"
    echo "  --ignore: Skip files/folders matching these patterns"
    exit 1
}

# Summon the appropriate comment runes
summon_comment_runes() {
    local scroll="$1"
    local ancient_text="${scroll##*.}"
    
    case "${ancient_text,,}" in
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

# Check if file is cursed (binary)
is_file_cursed() {
    local scroll="$1"
    # Ask the ancient 'file' command for wisdom
    if file "$scroll" | grep -q "text"; then
        return 1  # Blessed text file
    else
        return 0  # Cursed binary file
    fi
}

# Read and parse the sacred .yeet file
read_yeet_file() {
    local yeet_path="$1/.yeet"
    local patterns=()
    
    if [ -f "$yeet_path" ]; then
        # Read the forbidden scroll (.yeet file)
        while IFS= read -r line || [ -n "$line" ]; do
            # Trim whitespace and skip empty lines/comments
            line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
            if [ -n "$line" ] && [[ ! "$line" =~ ^[[:space:]]*# ]]; then
                # Convert Windows paths to Unix paths (just in case)
                line=$(echo "$line" | sed 's/\\/\//g')
                patterns+=("$line")
            fi
        done < "$yeet_path"
    fi
    
    # Return the patterns as a space-separated string
    echo "${patterns[*]}"
}

# Check if path matches ignore patterns
should_ignore_path() {
    local check_path="$1"
    local pattern
    
    # Remove leading slash if present
    check_path="${check_path#/}"
    
    for pattern in "${IGNORE_PATTERNS[@]}"; do
        # Remove leading slash if present
        pattern="${pattern#/}"
        # Remove trailing slash if present
        pattern="${pattern%/}"
        
        # If pattern ends with *, modify it to include all files
        if [[ $pattern == *'/*' ]]; then
            # Remove the /* from the end
            pattern="${pattern%/*}"
            # Add regex to match anything in this directory
            pattern="^${pattern}(/.*)?$"
        else
            # Convert glob pattern to regex
            pattern="${pattern//\./\\.}"    # Escape dots
            pattern="${pattern//\*\*/.*}"   # Handle ** (match any depth)
            pattern="${pattern//\*/[^/]*}"  # Handle * (match within directory)
            pattern="${pattern//\?/.}"      # Handle ? (match single character)
            pattern="^${pattern}/?.*"       # Match entire directory contents
        fi
        
        if [[ "$check_path" =~ $pattern ]]; then
            return 0  # Should ignore
        fi
    done
    return 1  # Should not ignore
}

# Initialize variables
FOLDER_OF_DESTINY=""
SNEAKY_MODE=0
DESTINY_MANIFEST="combined_output.md"
ABSOLUTE_WINS=()
EPIC_FAILS=()
IGNORE_PATTERNS=()

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --hidden)
            SNEAKY_MODE=1
            shift
            ;;
        --ignore)
            shift
            while [[ $# -gt 0 && ! "$1" =~ ^-- ]]; do
                IGNORE_PATTERNS+=("$1")
                shift
            done
            ;;
        -*)
            echo "Unknown option: $1"
            yeet_usage
            ;;
        *)
            if [ -z "$FOLDER_OF_DESTINY" ]; then
                FOLDER_OF_DESTINY="$1"
            else
                echo "Error: Multiple directories specified"
                yeet_usage
            fi
            shift
            ;;
    esac
done

# Check if we got a directory
if [ -z "$FOLDER_OF_DESTINY" ]; then
    echo "Error: No directory specified"
    yeet_usage
fi

# Make sure the chosen folder exists in this realm
if [ ! -d "$FOLDER_OF_DESTINY" ]; then
    echo "Error: The folder '$FOLDER_OF_DESTINY' does not exist in this dimension"
    exit 1
fi

# Read the .yeet file if it exists
if YEET_PATTERNS=$(read_yeet_file "$FOLDER_OF_DESTINY"); then
    if [ -n "$YEET_PATTERNS" ]; then
        echo "Found .yeet file! Adding its forbidden knowledge to the ignore list..."
        # Add .yeet patterns to existing ignore patterns
        for pattern in $YEET_PATTERNS; do
            IGNORE_PATTERNS+=("$pattern")
        done
    fi
else
    echo "Failed to read .yeet file (task failed successfully)"
    exit 1
fi

# Create temporary scroll of power
TEMP_SCROLL=$(mktemp)

echo "Initiating folder yoinking ritual: $FOLDER_OF_DESTINY"
echo "Sneaky mode activated: $([[ $SNEAKY_MODE -eq 1 ]] && echo "yes" || echo "no")"
if [ ${#IGNORE_PATTERNS[@]} -gt 0 ]; then
    echo "Ignoring patterns: ${IGNORE_PATTERNS[*]}"
fi

# The grand file yeeting ceremony
yeet_files() {
    local current_realm="$1"
    local base_realm="$2"
    
    while IFS= read -r -d '' scroll; do
        local scroll_path="${scroll#$base_realm/}"
        
        # Check ignore patterns first - this takes precedence over everything
        if should_ignore_path "$scroll_path"; then
            EPIC_FAILS+=("$scroll_path (explicitly ignored)")
            continue
        fi
        
        # Dodge the sneaky files
        if [[ $SNEAKY_MODE -eq 0 && $(basename "$scroll") == .* ]]; then
            EPIC_FAILS+=("$scroll_path (too sneaky)")
            continue
        fi
        
        # Check for cursed files
        if is_file_cursed "$scroll"; then
            EPIC_FAILS+=("$scroll_path (cursed binary)")
            continue
        fi
        
        # Check scroll permissions
        if [ ! -r "$scroll" ]; then
            EPIC_FAILS+=("$scroll_path (no read privileges, sadge)")
            continue
        fi
        
        # Summon comment runes and yeet into destiny
        local runes=$(summon_comment_runes "$scroll" "$scroll_path")
        echo -e "\n$runes\n" >> "$TEMP_SCROLL"
        cat "$scroll" >> "$TEMP_SCROLL"
        ABSOLUTE_WINS+=("$scroll_path")
        
    done < <(find "$current_realm" -type f -print0)
}

# Commence the ritual
yeet_files "$FOLDER_OF_DESTINY" "$FOLDER_OF_DESTINY"

# The prophecy must be fulfilled
mv "$TEMP_SCROLL" "$DESTINY_MANIFEST"

# Victory royale stats
echo -e "\nFiles that made it (POG):"
for scroll in "${ABSOLUTE_WINS[@]}"; do
    echo "✨ $scroll"
done

echo -e "\nFiles that got rekt:"
for scroll in "${EPIC_FAILS[@]}"; do
    echo "💀 $scroll"
done

echo -e "\nGG EZ: Output yeeted to $DESTINY_MANIFEST"