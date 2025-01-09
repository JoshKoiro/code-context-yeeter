# code-context-yeeter 🚀
For when your LLM says 'context unclear,' and you say 'bet,' then serve it a piping hot plate of code clarity.

A code file-combiner for when you need ot yeet your code into an LLM instead of going to stack overflow like a noob...

> "When in doubt, yeet it out—and let the LLM sort it out."
>
> \- Albert Einstein, (probably)

## What is this? 🤔

`code-context-yeeter` takes your smol scattered files and turns them into one absolute unit, perfect for:

- Feeding your favorite LLM some delicious context 🍽️
- Making your code T H I C C for maximum prompt power 💪
- Saving you from the "🤧 uhm actually I lost context" moment
- Helping your AI assistant remember the codebase exists

## Features that go brrr ✨

- Combines files faster than you can say "context window full" 🏃‍♂️
- Skips binary files because we have standards, thank you very much
- Different comment styles because we're fancy like that
- Hidden file support (for your spicy secrets) 🌶️
- ignore files using the `--ignore` flag or if your feeling really extra, make a `.yeet` file in the directory where the files to combine are located.
- Console output ✨
- Available in both JavaScript and Bash. More to come? Only if my caffeine intake hits critical levels....☕

## Why This? 🤷‍♂️

![alt text](memes/9g22mz.jpg)
Have you ever try explaining your project to an LLM, only for it to go full improv mode and start inventing code like it’s auditioning for Whose Line Is It Anyway? Yeah, same. When the conversation gets too long, the LLM is all like, "Context? Never heard of her." Mistakes pile up, and suddenly you’re debugging a function that doesn’t even exist.

While I’m sure some galaxy-brained giga-chads are out there trying to quantum-entangle this problem into submission, I needed something that works faster than my attention span during a YouTube ad...

This script is here to save your sanity of copy and pasting your entire codebase file by file like a Neanderthal while also making it easy to restart fresh conversations with your project’s full context in one neat package. Now, when you ask an LLM for help, it won’t act like it’s your clueless intern on their first day. Instead, it’ll be your code-savvy BFF, ready to tackle bugs and build features without breaking a sweat.

Because when it comes to LLMs, context is king, and this script is the royal yeet service. 🤴🚀

Say goodbye to those brain-melting AI derps where it forgets what you told it five seconds ago.

![alt text](memes/9g233a.gif)

## Quick Start (Any% Speedrun) 🚀

### Difficulty: EZ (Clone and Run)

```bash
# Git clone goes brrr
git clone https://github.com/JoshKoiro/code-context-yeeter.git

# CD into victory
cd code-context-yeeter

# Make it executable (bash version only)
chmod +x yeetCode.sh
```

```bash
# Time to yeet!
# Time to yeet!
./yeetCode.sh /path/to/your/project [--hidden] [--ignore pattern1 pattern2 ...]
```
# or

```bash
node file-combiner.js /path/to/your/project [--hidden] [--ignore pattern1 pattern2 ...]
```

### Difficulty: MLG Pro (add an alias to your .bashrc like a chad) 😎

Add these bad boys to your `.bashrc` for maximum efficiency:

```bash
# Use JavaScript like a front-end fanboy...
alias yeetjs='/path/to/local/file-combiner.js'
```

```bash
# Use bash like a normal person...
alias yeet='/path/to/local/file-combiner.sh'
```

Then:

- `source ~/.bashrc` (speedrun strat)
- Or restart terminal (casual route)

### 🐐 Goated Features: .yeet

Tired of telling your script what to yeet every time like some kind of peasant? Say no more fam. Drop a .yeet file in your project directory and watch the magic happen. It's like .gitignore but for people who understand meme culture.
Just create a file named .yeet (yes, that's it, 4 characters of pure power) and fill it with your "no-no" patterns. The script reads this sacred scroll before yeeting begins, ensuring maximum ignore potential.

Example .yeet scroll of power:

```bash
# Things to yeet into the shadow realm
node_modules/*     # ain't nobody got space for that
.git/*
*.log
build/
mysecrets.txt
todo.txt          # we both know you won't read this anyway
meetings.csv
responsibilities.json
# ... 
```

The script automagically detects your .yeet file and combines its forbidden knowledge with any command-line ignore patterns you throw at it. It's like having a bouncer for your files, but instead of checking IDs, it's checking vibes.
Think of it as your project's personal "do not yeet" list. Perfect for when you want to keep your memes but yeet everything else into the void. 🚀

Plot twist: The .yeet file itself gets auto-yeeted because even sacred scrolls need their privacy. It's like the first rule of Fight Club - if you're gonna yeet, don't yeet about yeeting. 🤫

## Output 📄

Creates a `combined_output.md` in the location that you ran the script. - It's thiccer than a bowl of oatmeal... 😏

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

- Automatically yeets binary files into the void
- Handles permission issues like a true chad
- Empty directories get the "nothing to see here" treatment
- Use the `--hidden` flag for when you're feeling sneaky and want to include hidden files 🕵️‍♂️
- Use `--ignore` flag followed by the files and directories you would like to exclude from the output file.
    The ignore patterns support:
    - Exact file/folder names: file.txt, folder/
    - Simple wildcards: *.js, test/*
    - Nested patterns: src/tests/*.spec.js

### Examples:
```bash
# Default yeet (vanilla gameplay)
./yeetCode.sh /path/to/dir

# Include hidden files and folders (sus content included 😏)
./yeetCode.sh /path/to/dir --hidden

# The classic "it works on my machine" setup
./yeetCode.sh /path/to/dir --ignore node_modules/* .env debug.log

# Your project after npm install
./yeetCode.sh /path/to/dir --ignore node_modules/* dist/* coverage/* .vscode/* package-lock.json 

# POV: You're showing your code to your boss
./yeetCode.sh /path/to/dir --ignore \
   todos.md \          # we don't talk about the TODOs
   responsibilities.json \  # what responsibilities?
   bugs/* \           # they're features actually
   deadlines.xlsx \   # time is just a concept anyway
   estimates.xlsx     # those 2-day estimates are definitely realistic

# The "my code at 3am after 69 commits" speedrun strat 
./yeetCode.sh /path/to/dir --hidden --ignore \
   temp/* \              # temporary like my relationships
   uwu/* \              # notices your bulging node_modules folder
   cursed_hacks/* \     # nobody needs to see these war crimes
   maidenless/* \       # my senior dev said "git gud"
   cope.json \          # skill issue tbh
   
# POV: When the stackoverflow copium hits different
./yeetCode.sh /path/to/dir --ignore \
   node_modules/* \          # thicc folder makes compiler go brrr
   ligma.js \               # gottem
   69_tests_failed.log \    # nice.
   mom_come_pick_me_up/* \  # code review was brutal
   your_mom.json \          # default export { weight: Infinity }
```

## Supported File Types 🗂️

We support more languages than your average Stack Overflow copy-paster:

- JS/TS: For the "I know that framework" crowd
- Python: For the data science enjoyers
- HTML: For the "I'm something of a developer myself" gang
- CSS: For the "it ain't much but it's honest work" folk
- And many more...

Files we don’t recognize get slapped with the `### NEW FILE: path ###` tag like a lost puppy. But hey, if you wanna flex your MVP status, just open a PR and add to the comment formats supported.

## Contributing 🤝

PRs are welcome! Remember:

- Reject complexity, the code doesn't care about your life story, just say what you did, what it should do, and yeet.
- Be kind. I'm not a professional developer, if you are, I'd be happy to pick your brain about what I did wrong...don't be a karen about it.
- Comments are for the weak (jk please comment your code)

## License 📜

MIT License - Because sharing is caring, and we're not monsters.

