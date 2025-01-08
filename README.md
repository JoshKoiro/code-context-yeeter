# code-context-yeeter 🚀

For when your LLM says 'context unclear,' and you say 'bet,' then serve it a piping hot plate of code clarity.

[TODO: Insert gigachad coder meme here]

> "When in doubt, yeet it out—and let the LLM sort it out."
>
> \- Albert Einstein, (probably)

## What is this? 🤔

Virgin multiple files vs Chad single context! `code-context-yeeter` takes your smol scattered files and turns them into one absolute unit, perfect for:

- Feeding your favorite LLM some delicious context 🍽️
- Making your code T H I C C for maximum prompt power 💪
- Saving you from the "🤧 uhm actually I lost context" moment
- Helping your AI assistant remember the codebase exists

## Features that go brrr ✨

- Combines files faster than you can say "context window full" 🏃‍♂️
- Skips binary files because we have standards, thank you very much
- Different comment styles because we're fancy like that
- Hidden file support (for your spicy secrets) 🌶️
- Console output that sparks joy ✨
- Available in both JavaScript and Bash (btw I use arch, no big deal)

[TODO: Insert Drake meme template:
Drake no: Copying files one by one into chat
Drake yes: Using code-context-yeeter]

## Why This? 🤷‍♂️

You ever try explaining your project to an LLM, only for it to go full improv mode and start inventing code like it’s auditioning for Whose Line Is It Anyway? Yeah, same. When the conversation gets too long, the LLM is all like, "Context? Never heard of her." Mistakes pile up, and suddenly you’re debugging a function that doesn’t even exist.

This script is here to save your sanity by making it easy to restart fresh conversations with your project’s full context in one neat package. Now, when you ask an LLM for help, it won’t act like it’s your clueless intern on their first day. Instead, it’ll be your code-savvy BFF, ready to tackle bugs and build features without breaking a sweat.

Because when it comes to LLMs, context is king, and this script is the royal yeet service. 🤴🚀

## Quick Start (Any% Speedrun) 🚀

### Difficulty: Easy (Direct Execute)

```bash
# Node.js edition
curl -s https://raw.githubusercontent.com/JoshKoiro/code-context-yeeter/main/file-combiner.js | node - /path/to/your/project [--hidden]

# Bash edition (for terminal purists)
curl -s https://raw.githubusercontent.com/JoshKoiro/code-context-yeeter/main/file-combiner.sh | bash -s -- /path/to/your/project [--hidden]
```

### Difficulty: Normal (Clone and Run)

```bash
# Git clone goes brrr
git clone https://github.com/JoshKoiro/code-context-yeeter.git

# CD into victory
cd code-context-yeeter

# Make it executable (bash version only)
chmod +x file-combiner.sh

# Time to yeet!
./file-combiner.sh /path/to/your/project [--hidden]
# or
node file-combiner.js /path/to/your/project [--hidden]
```

### Difficulty: Pro Gamer Move (.bashrc Edition) 😎

Add these bad boys to your `.bashrc` for maximum efficiency:

```bash
# For the zoomer JavaScript enjoyers
alias yeet-context='f(){ curl -s https://raw.githubusercontent.com/JoshKoiro/code-context-yeeter/main/file-combiner.js | node - "$@"; unset -f f; }; f'

# For the bash boomers
alias yeet-context-sh='f(){ curl -s https://raw.githubusercontent.com/JoshKoiro/code-context-yeeter/main/file-combiner.sh | bash -s -- "$@"; unset -f f; }; f'
```

Then:

- `source ~/.bashrc` (speedrun strat)
- Or restart terminal (casual route)

Now you're ready to yeet with:

```bash
yeet-context /path/to/your/project [--hidden]
```

[TODO: Insert "Look at me, I'm the context now" Captain Phillips meme]

## Output 📄

Creates a `combined_output.md` that's thiccer than a bowl of oatmeal 😏

Example output structure (it's beautiful, I promise):

```markdown
// NEW FILE: src/index.js
// Your beautiful spaghetti code here...

/* NEW FILE: src/styles/main.css */
/* CSS that would make a designer cry... */

# NEW FILE: src/config/settings.py
# Python code goes hiss...
```

## Usage Notes 🕊️

- `--hidden` flag for when you're feeling sneaky 🕵️‍♂️
- Automatically yeets binary files into the void
- Handles permission issues like a true chad
- Empty directories get the "nothing to see here" treatment

## Supported File Types 🗂️

We support more languages than your average Stack Overflow copy-paster:

- JS/TS: For the "I know that framework" crowd
- Python: For the data science enjoyers
- HTML: For the "I'm something of a developer myself" gang
- CSS: For the "it ain't much but it's honest work" folk
- And many more...

Unknown files get the `### NEW FILE: path ###` treatment (we don't discriminate)

## Contributing 🤝

PRs are welcome! Remember:

- Reject complexity, embrace yeet
- If it works, it works
- Comments are for the weak (jk please comment your code)

[TODO: Insert "It ain't much but it's honest work" farmer meme]

## License 📜

MIT License - Because sharing is caring, and we're not monsters.

## Why the name? 🤔

Because sometimes you just need to yeet your code into that context window! And by sometimes, we mean all the times.

Remember: When in doubt, yeet it out! 🚀

[TODO: Insert "Always has been" astronaut meme about yeeting code]

