import webpack = require("webpack");

let lastHash:string | null | undefined = null;
let onSuccess:()=>void = null;

function compilerCallback(err:any, stats:webpack.Stats) {
  if (err) {
    lastHash = null;
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    process.exit(1); // eslint-disable-line
  }
  if (stats.hash !== lastHash) {
    lastHash = stats.hash;
    if (stats.compilation && stats.compilation.errors.length !== 0) {
      const errors = stats.compilation.errors;
      if (errors[0].name === "EntryModuleNotFoundError") {
        console.error("\n\u001b[1m\u001b[31mInsufficient number of arguments or no entry found.");
        console.error(
          "\u001b[1m\u001b[31mAlternatively, run 'webpack(-cli) --help' for usage info.\u001b[39m\u001b[22m\n"
        );
      }
    }

    if (stats.hasErrors()) {
      const statsString = stats.toString("normal");
      if (statsString) process.stdout.write(`${statsString}\n`);
      console.log('webpack+ts-loader: コンパイルエラーです。');
    } else {
      console.log('webpack+ts-loader: コンパイル成功');
      if (onSuccess) onSuccess();
    }
  }
}

export function run(_onSuccess:()=>void = null) {
  const webpackConfig = require("./webpack.config");
  let configs = webpackConfig instanceof Array? webpackConfig : [webpackConfig];
  configs.forEach(config=> {
    config.mode = "development";
    config.cache = true;
  });
  let watchOptions:webpack.ICompiler.WatchOptions = {};
  let compiler = webpack(configs);
  onSuccess = _onSuccess;
  compiler.watch(watchOptions, compilerCallback);
}
