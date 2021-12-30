// Learn more:
// https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file

const { readdir } = require("fs")
const { resolve } = require("path")
const aliases = require("./aliases.config")("./src")

module.exports = {
	// Learn more about configuration options: https://webpack.js.org/configuration/
	webpack: {
		alias: Object.fromEntries(
			Object.entries(aliases).map(([alias, src]) => {
				return [alias, resolve(__dirname, src)]
			})
		),
		configure: (webpackConfig, { env, paths }) => ({
			...webpackConfig,

			// https://webpack.js.org/configuration/entry-context/#entry
			entry: () => {
				const { resolve } = require
				const main = [paths.appIndexJs]

				if (env === "development")
					main.push(resolve("react-dev-utils/webpackHotDevClient"))

				return new Promise((resolve, reject) => {
					readdir("./src/chrome/scripts", (error, files) => {
						error && reject(error)

						const scripts = Object.fromEntries(
							files.map((file) => {
								const [filename] = file.split(".js")
								const entry = `./src/chrome/scripts/${filename}.js`
								return [filename, entry]
							})
						)

						resolve({ ...scripts, main })
					})
				})
			},
			output: {
				...webpackConfig.output,
				filename: "static/js/[name].js",
			},
			optimization: {
				...webpackConfig.optimization,
				runtimeChunk: false,
			},
		}),
	},
}
