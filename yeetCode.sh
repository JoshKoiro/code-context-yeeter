#!/bin/bash

# Educate the normies
yeet_usage() {
    echo "Usage: $0 <directory> [--hidden]"
    echo "  --hidden: See the forbidden files"
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

# Vibe check the arguments
if [ $# -lt 1 ]; then
    yeet_usage
fi

# Parse the sacred texts (arguments)
FOLDER_OF_DESTINY="$1"
SNEAKY_MODE=0
DESTINY_MANIFEST="combined_output.md"
ABSOLUTE_WINS=()
EPIC_FAILS=()

# Check for sneaky mode activation
for scroll in "$@"; do
    if [ "$scroll" == "--hidden" ]; then
        SNEAKY_MODE=1
    fi
done

# Make sure the chosen folder exists in this realm
if [ ! -d "$FOLDER_OF_DESTINY" ]; then
    echo "Error: The folder '$FOLDER_OF_DESTINY' does not exist in this dimension"
    exit 1
fi

# Create temporary scroll of power
TEMP_SCROLL=$(mktemp)

echo "Initiating folder yoinking ritual: $FOLDER_OF_DESTINY"
echo "Sneaky mode activated: $([[ $SNEAKY_MODE -eq 1 ]] && echo "yes" || echo "no")"

# The grand file yeeting ceremony
yeet_files() {
    local current_realm="$1"
    local base_realm="$2"
    
    while IFS= read -r -d '' scroll; do
        local scroll_path="${scroll#$base_realm/}"
        
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