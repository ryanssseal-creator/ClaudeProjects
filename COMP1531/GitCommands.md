# Common Git Commands

A quick reference for everyday Git usage.

## Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Cloning

```bash
git clone <repo-url>              # Clone a repository
git clone <repo-url> <folder>     # Clone into a specific folder
```

## Checking Status & History

```bash
git status                # See changed/staged/untracked files
git log                   # Full commit history
git log --oneline --graph # Compact history with branch graph
git diff                  # See unstaged changes
git diff --staged         # See staged changes
```

## Staging & Committing

```bash
git add <file>             # Stage a specific file
git add .                  # Stage all changes in current directory
git commit -m "message"    # Commit staged changes
git commit -am "message"   # Stage tracked file changes and commit in one step
```

## Branching

```bash
git branch                 # List local branches
git branch <name>          # Create a new branch
git checkout <name>        # Switch to a branch
git checkout -b <name>     # Create and switch to a new branch
git switch <name>          # Switch to a branch (modern alternative)
git switch -c <name>       # Create and switch (modern alternative)
git branch -d <name>       # Delete a branch (safe, only if merged)
git branch -D <name>       # Force delete a branch
```

## Merging

```bash
git merge <branch>         # Merge <branch> into the current branch
git merge --abort          # Abort a merge with conflicts
```

## Rebasing

```bash
git rebase <branch>        # Reapply commits on top of another branch
git rebase --abort         # Abort a rebase
git rebase --continue      # Continue after resolving conflicts
```

## Remote Repositories

```bash
git remote -v                    # List remotes
git remote add origin <url>      # Add a remote named "origin"
git fetch                        # Download changes without merging
git pull                         # Fetch and merge from remote
git pull --rebase                # Fetch and rebase instead of merge
git push                         # Push commits to remote
git push -u origin <branch>      # Push and set upstream tracking branch
```

## Undoing Changes

```bash
git restore <file>               # Discard unstaged changes to a file
git restore --staged <file>      # Unstage a file (keep changes)
git reset --soft HEAD~1          # Undo last commit, keep changes staged
git reset --hard HEAD~1          # Undo last commit, discard changes (destructive)
git revert <commit>              # Create a new commit that undoes a commit
```

## Stashing

```bash
git stash                  # Save uncommitted changes for later
git stash list              # List stashes
git stash pop                # Reapply and remove the latest stash
git stash apply               # Reapply the latest stash (keep it in the list)
git stash drop                # Delete the latest stash
```

## Tags

```bash
git tag                    # List tags
git tag <name>              # Create a lightweight tag
git tag -a <name> -m "msg"  # Create an annotated tag
git push --tags             # Push tags to remote
```

## Inspecting Changes

```bash
git show <commit>          # Show details of a commit
git blame <file>           # Show who last changed each line
```

## Common Workflow Example

```bash
git checkout -b feature/my-feature   # Create a feature branch
# ... make changes ...
git add .
git commit -m "Add my feature"
git push -u origin feature/my-feature
# ... open a pull request, merge, then ...
git checkout main
git pull
git branch -d feature/my-feature
```
