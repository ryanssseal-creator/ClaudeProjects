# COMP1531 Practice Worksheets: JavaScript and TypeScript

Three worksheets in the style of exam questions Q26 (JavaScript problem solving) and
Q27 (make a TypeScript file type-safe and lint free). Difficulty goes up from ws1 to ws3.

| Worksheet | Q26: JavaScript (`q26/assorted.js`) | Q27: TypeScript (`q27/*.ts`) |
|---|---|---|
| ws1 | `chunk`, `countWords`, `isPalindrome`, `zip` | `library.ts`: interfaces, optional fields, `null` |
| ws2 | `groupBy`, `flatten`, `mostFrequent`, `mergeCounts` | `bank.ts`: union literal types, wrong inline return types |
| ws3 | `runLengthEncode`, `transpose`, `pick`, `deepSum` | `events.ts`: nested arrays, typing an empty `{}`, sneakier lint traps |

## Setup

```
npm install        # once, in this folder (needs Node 24)
```

## Doing a worksheet

Read `wsN/README.md` for the tasks, then:

```
cd ws1/q26 && npm run test

cd ws1/q27
npm run tsc        # type-safety
npm run lint       # lint
npm run test       # tests (these already pass: if they break, you changed the logic)
```

Each worksheet is out of 20 (10 for Q26, 10 for Q27), marked the same way as the exam.

## Solutions

`solutions/wsN/` has worked answers. Don't open them until you've had a go.
To mark with Claude Code, open it in this folder and say `mark ws1` (see `CLAUDE.md`).

## Resetting a worksheet

```
git checkout -- ws1/
```
