const mix = require('laravel-mix');

mix.webpackConfig(webpack => {
        return {
                plugins: [
                        new webpack.ProvidePlugin({
                                $: 'jquery',
                                jQuery: 'jquery',
                                'window.jQuery': 'jquery',
                        })
                ]
        };
});

mix.setPublicPath('build/').js('src/app.js', 'build/scripts.js').minify('build/scripts.js')
    .sass('src/app.scss', 'build/styles.css').options({processCssUrls: false}).minify('build/styles.css')
    .sass('src/bootstrap.scss', 'build/bootstrap.css').minify('build/bootstrap.css');

// mix.scripts([
//             'node_modules/jquery/dist/jquery.js',
//             'node_modules/bootstrap/dist/js/bootstrap.js',
//             'node_modules/jquery-ui/ui/widgets/datepicker.js',
//             'src/_scripts/jcarousel.js',
//             'src/_scripts/functions.js'
//     ],
//     '_scripts/functions.js'
// );
//
// mix.sass('src/_styles/style.scss', '_styles');