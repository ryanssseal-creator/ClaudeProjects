# COMP1531 Mock Exam 3

Unofficial practice paper in the style of the COMP1531 practice exam. Same layout as the
starter repo, same question types, same mark split.

## How to use it

1. `npm install` in this folder.
2. Read `spec/0-exam-information.md`, then start a 3 hour timer.
3. Work through the pages in `spec/` in order. Each one is the equivalent of a page on the exam website.
4. Write your answers in the files each page names.
5. When time is up, open Claude Code in this folder and type `mark my exam`.

## What's in here

```
spec/         the exam paper, one page per section
mcq.md        your answers to Q1-20
q21.md-q25.md your answers to the theory questions
q26/-q31/     starter code and tests for the coding and design questions
solutions/    worked solutions and marking rubrics. DO NOT OPEN until you've been marked.
CLAUDE.md     marking instructions that Claude Code follows
```

## After marking

`REPORT.md` has your mark per question, what went wrong, and what to revise.
To resit a single question later, restore its starter file with `git` (if you committed the
fresh folder first) or re-extract it from the zip.

Tip: run `git init && git add -A && git commit -m "fresh exam"` before you start, so you can
reset any question with `git checkout -- q29/`.
