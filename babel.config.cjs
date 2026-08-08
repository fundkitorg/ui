// The WordPress preset, so JSX compiles against @wordpress/element exactly as
// it did when consumers compiled this package from source.
module.exports = {
    presets: [ require.resolve( '@wordpress/babel-preset-default' ) ],
};
