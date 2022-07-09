# Contributing

## Formatting & Style 👨‍🎨

Below are explanations on how formatting/code style is done.

TL;DR:&nbsp; you don't _really_ care, huh?

### 🤔&nbsp; Explanation for using both `eslint` and `prettier`

Code style is handled with `eslint`, but _formatting_ is handled with `prettier`.

\<opinion>&nbsp;
Though `eslint` can format code, `prettier` is easier to configure for the sole purpose of formatting code _and_ is already assigned as a keyboard shortcut in VS Code for me _and_ it's muscle-memory for me to format before saving.

So that's why there's two formatters.
\</opinion>

Two packages are crucial in this rigamarole:

- `eslint-plugin-prettier`
- `eslint-config-prettier` (notice **config** in the name)

The `eslint-plugin-prettier` is an `eslint` plugin that runs `prettier` after fixing code style. `eslint-**config**-prettier` is an `eslint` config that overules and ignores any `eslint` formatting rules, leaving it all up to `prettier` for how the code should look.

Apparently, `eslint-config-prettier` is necessary to prevent `eslint` and `prettier` from bickering; more on [the repo page](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration)

### 🤔&nbsp; Explanation for `husky` and `lint-staged`

We'll do [`lint-staged`](https://github.com/okonet/lint-staged) first.

It's easiest for me if you open `.lintstagedrd.json`. You'll notice that it has NPM scripts refered to by a file blob. `lint-staged` reads this config file **right before the user commits anything** and says "for any **git staged files** that match _this file blob_ run _this command_.

So, for any `.json` file, it gets formatted by `prettier --write`.

With `lint-staged` out of the way, onto `husky`.

[`husky`](https://github.com/typicode/husky) is a wrapper around git-hooks. It's what actually runs `lint-staged`. Refer to `.husky/pre-commit` for the _very simple_ git-hook code.
