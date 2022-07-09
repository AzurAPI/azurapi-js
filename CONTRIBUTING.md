# Contributing

## Formatting & Style 👨‍🎨

### Explanation for using both `eslint` and `prettier`

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
