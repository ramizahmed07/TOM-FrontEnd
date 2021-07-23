# The Talent Accelerator

Repository for the frontend of The Talent Accelerator

## Development

### Directory Structure

```
src
  - assets
      - fonts
      - images
  - components
      - Input
          - index.tsx
          - input.less
  - pages
      - admin
          - APage
              - index.tsx
              - apage.less
      - company
          - CPage
              - index.tsx
              - cpage.less
  - styles
      - fonts.less
      - global.less
      - index.less
      - theme.less
  - utils
      - date.ts
      - url.ts
  - redux 
      - slices
          - auth.ts
          - index.ts
      - index.ts
```

This directory structure is battle-tested and solid. But that doesn't mean it cannot be amended. Please feel free to suggest any improvements.

We're using a concept called `Colocation` here. Read more about it here: https://kentcdodds.com/blog/colocation

This means we'll colocate the files, components, styles to where they are used. What that means for our codebase is let's say we want to create a component for our page `PageA`, so instead of putting that component in the `components/` directory, we'll create it inside `PageA/` directory because for now that's the only place that component is being used. If that component is used anywhere else so instead of duplicating it we'll move it to `components/` directory so other components or pages can also use it.

**Description**:

- `assets`: All the static assets will go in this directory

- `components`: This directory is the dump of all the reusable shared components. If a component doesn't have any styles (.less file), we can avoid creating a directory for that component and instead put the component at the root as `/components/MyComponent.tsx`

- `pages`: This directory is divided into 2 sub-directories, `admin` and `company`. The pages related to admin will live inside `admin` sub-directory and likewise for company related pages. If a page is shared for some reason, we'll put that page to the root `/pages`. We'll follow the same rule here as we discussed in the components section, if there are no styles don't create directory for a page.

- `styles`: All the styles will live inside this directory. `theme.less` contains all the custom and antd variables overwritten by us. `index.less` imports all the styles and is being used in `App.tsx`.

- `redux`: All the redux slices will live inside this directory inside the `slices` folder. `redux/index.ts` imports all the slice reducers and configure store.

### Git

- Perform work in a feature branch.
- Branch out from `dev`
- Never push into `dev` or `master` branch. Make a Pull Request.
- Update your local `dev` branch and do an interactive rebase before pushing your feature and making a Pull Request.
- Resolve potential conflicts while rebasing and before making a Pull Request.
- Keep commits smaller by committing your code at regular intervals.

**Commit messages**:

- Capitalize the message first word.
- Use imperative mood, when writing commit messages. Write commit message to complete this sentence always:
"When applied, this commit will <your commit message>"

  Example:

  "Move Table component to /components directory". Now try to place this message in the above sentence and see it makes sense.

- If for some reason you need to commit in the middle of a task you can add `WIP:` prefix before commit message e.g.: `WIP: Style navbar`
