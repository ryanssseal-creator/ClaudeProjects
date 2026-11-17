# Getting Started

## Install

From the root of this folder:

```
npm install
```

## Working on a question

Each coding question has its own folder. Run commands from inside it:

```
cd q26
npm run test
```

The commands for each question are listed on its spec page.

## Submitting

There is no `submit` command here. Your files are marked where they sit, so **save them**.

As in the real exam, only the named file(s) for each question are collected. Every other file in
the folder is replaced with the original before marking. If you put code a question depends on
into a file that isn't collected, it will not exist when your work is marked.

## Getting marked

When your time is up, open Claude Code in this folder and say:

```
mark my exam
```

It follows `CLAUDE.md`, runs every test, marks the written answers against the rubric, and writes
`REPORT.md`. You can also ask for one question at a time (`mark q29`).
