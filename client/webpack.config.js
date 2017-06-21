const webpack = require('webpack');
const path = require("path");
const { AureliaPlugin, ModuleDependenciesPlugin } = require("aurelia-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const package = require('./package.json');

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = 'development');


var PrintChunksPlugin = function() {};
PrintChunksPlugin.prototype.apply = function(compiler) {
    // compiler.plugin('compilation', function(compilation, params) {
    //     compilation.plugin('after-optimize-chunk-assets', function(chunks) {
    //         chunks.map(function(c) {
    //             if (c.name){
    //                 console.log('=====================================')
    //                 console.log('=== ' + c.name)
    //                 console.log('=====================================')
    //                 c.modules.filter(m=>m.request!=null).map(function(m){
    //                     var resource = m.request.split('!').pop();
    //                     if (resource.indexOf('node_modules')>-1) resource = resource.split('node_modules').pop();
    //                     console.log(`${resource} [${m.toString()}]`)
    //                 });
    //             }
    //         });

    //     });
    // });
};

//plugins
var uglifyjsPlugin = new UglifyJSPlugin({
        comments : false,
        mangle: { except: ['cb', '__webpack_require__'] }
    });

var lessExtractPlugin = new ExtractTextPlugin({ filename: '[name].css' });
var cssExtractPlugin = new ExtractTextPlugin({ filename: 'vendor.css' });

var htmlPlugin = new HtmlWebpackPlugin({ template: 'index.html' });
var aureliaPlugin = new AureliaPlugin({
    viewsExtensions: [".html", ".pug"],
});

var printChunksPlugin = new PrintChunksPlugin();

var moduleDependenciesPlugin = new ModuleDependenciesPlugin({
    "materialize-css" : [
        "materialize-css/bin/materialize.css"
    ]
})

var vendorChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name:'vendor',
    chunks:['main','vendor']
});

var aureliaChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name:'aurelia',
    chunks:['main','aurelia']
});

var manifestChunckPlugin = new webpack.optimize.CommonsChunkPlugin({     
    name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
})

var usePlugins = [    
    lessExtractPlugin,
    cssExtractPlugin,
    aureliaPlugin,
    moduleDependenciesPlugin,
    htmlPlugin,
    vendorChunkPlugin,
    aureliaChunkPlugin,
    manifestChunckPlugin,
    printChunksPlugin       
];
if (ENV==='production') usePlugins.push(uglifyjsPlugin)
var outputPath = (ENV==='production')?"dist-prod":"dist";
var minimizeCssOutput = (ENV==='production');

//chunks
var aureliaModules = Object.keys(package.dependencies).filter(m=>m.indexOf("aurelia-")>-1);
var vendorModules = Object.keys(package.dependencies).filter(m=>m.indexOf("aurelia-")===-1);


module.exports = {
    entry: { 
        "main": "./source/main.ts",
        "aurelia" : aureliaModules,
        "vendor" : vendorModules
    },

    output: {
        path: path.resolve(__dirname, outputPath),
        publicPath: "",
        filename: (ENV==='production')?"[name].[chunkname].js":"[name].js",
        chunkFilename: (ENV==='production')?"[name].[chunkname].js":"[name].js"
    },

    resolve: {
        extensions: [".ts", ".js"],
        modules: ["source", "node_modules"],
    },

    module: {
        rules: [
            // css files
            {
                test: /\.css$/,
                use: cssExtractPlugin.extract({ fallback: 'style-loader', use: [{
                        loader:'css-loader',
                        options: {
                            minimize: minimizeCssOutput
                        }
                    }] 
                })
            },
            // less files
            {
                test: /\.less$/,
                use: lessExtractPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: minimizeCssOutput
                        }
                    }, {
                        loader: 'less-loader'
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            // typescript files
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            // pug files
            {
                test: /\.pug$/,
                loaders: ['html-loader', 'aurelia-webpack-plugin/html-requires-loader', 'pug-html-loader']
            },
            // json files 
            {
                test: /\.json$/,
                loader: 'file-loader'
            },
            // asset files
            {
                test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)$/,
                use: 'url-loader'
            },
            // index.html 
            {
                test: /\index.html$/,
                use: 'html-loader'
            },
            // sourcemaps for typescript
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: "source-map-loader"
            }

        ]
    },

    plugins: usePlugins,
    devtool: 'inline-source-map'

};

