/**
 * ESLint config, matching the one the consuming plugins lint with so a
 * component does not pass here and fail there.
 *
 * Prettier and brace-style are off: the codebase uses a deliberate manual
 * format (aligned columns, 4-space indent, single-line guards) that Prettier
 * cannot preserve, so enforcing it would mean reformatting every file. Lint
 * still runs the substantive rules (unused vars, hooks, a11y).
 */
module.exports = {
    root: true,
    extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
    env: { browser: true },
    ignorePatterns: [ 'dist/', 'storybook-static/' ],
    // No babel config in the repo, so mirror wp-scripts' parser fallback.
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            presets: [ require.resolve( '@wordpress/babel-preset-default' ) ],
        },
    },
    rules: {
        'prettier/prettier': 'off',
        curly: 'off',
        // House style diverges from the WP defaults by design; keep lint focused
        // on substance (unused vars, hooks, a11y) rather than these conventions:
        camelcase: 'off', //           REST/DB fields are snake_case (amount_cents)
        'dot-notation': 'off',
        'no-nested-ternary': 'off',
        // `onChange && onChange( v )` is the runtime's optional-callback idiom.
        'no-unused-expressions': [ 'error', { allowShortCircuit: true, allowTernary: true } ],
        // House rule bans en/em dashes; keep hyphens in numeric ranges.
        '@wordpress/i18n-hyphenated-range': 'off',
        // Controls are wrapped inside their <label> (valid implicit association
        // per the html spec); accept that, not only htmlFor.
        'jsx-a11y/label-has-associated-control': [ 'error', {
            assert: 'either',
            depth: 3, // label text is often wrapped in a styled span/strong
            controlComponents: [ 'AmountInput', 'CountrySelect', 'Switch' ],
        } ],
        // `x == null` is the deliberate null-or-undefined guard; require ===
        // everywhere else.
        eqeqeq: [ 'error', 'always', { null: 'ignore' } ],
        // autofocus is used only inside modals/drawers the user just opened
        // (focus belongs in the dialog) and as an opt-in prop, never on load.
        'jsx-a11y/no-autofocus': 'off',
        // Some editor surfaces embed WP block-editor components that ship only
        // as __experimental with no stable equivalent.
        '@wordpress/no-unsafe-wp-apis': 'off',
        'jsdoc/require-param': 'off', // comments are intentionally minimal
        'jsdoc/require-param-type': 'off',
        'jsdoc/check-tag-names': 'off',
        // A component asked for an icon that does not exist renders nothing,
        // which is silent and hard to place. Warning is the only signal, and
        // it costs a consumer nothing in production.
        'no-console': [ 'error', { allow: [ 'warn', 'error' ] } ],
    },
    overrides: [
        {
            // Stories are authoring aids for Storybook and never ship: the
            // build ignores them. Their render() bodies hold state to drive a
            // preview, which the hooks rule reads as a component that is not
            // one.
            files: [ '**/*.stories.jsx' ],
            rules: { 'react-hooks/rules-of-hooks': 'off' },
        },
    ],
};
