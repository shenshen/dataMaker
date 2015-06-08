/**
 * Created by shenshen on 15/5/21.
 */

var glob = require("glob");
var webpack = require('webpack');

function getEntry() {
    var entry = {};
    glob.sync(__dirname + "/src/coffee/job/*.coffee").forEach(function (name) {
        var tempName = name.match(/([^/]+?)\.(coffee|js)$/)[1];
        entry[tempName] = "./job/" + tempName;
    });
    entry.vender = ["angular-material", "underscore/underscore"];
    return entry;
}

var ex = {
    context: __dirname + "/src/coffee",
    entry: getEntry(),
    output: {
        path: __dirname + "/dist/js",
        publicPath:"/dataMaker/dist/js/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.coffee$/, loader: "coffee-loader"},
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            'bower_components',
            'lib'
        ],
        extensions: ['', '.js', '.json', '.coffee']
    },
    plugins: [
    ],
    watch: true

};
module.exports = ex;