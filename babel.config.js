module.exports = (api) => {
  api.cache(true);

  // adapt this to your setup
  const presets = [
    [
      "next/babel",
      {
        "preset-env": {
          "modules": false,
          "useBuiltIns": "entry",
          "corejs": 3,
          "targets": ">1%, ie 11, not op_mini all"
        },
        "class-properties": { "loose": true },
        "transform-runtime": { "useESModules": true }
      }
    ]
  ];

  const plugins = [
    ["styled-components", { "ssr": true, "displayName": true, "preprocess": false }],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-transform-react-constant-elements",
    ["@babel/plugin-proposal-optional-chaining", { "loose": true }],
    ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": true }]
  ];

  return {
    presets,
    plugins
  };
}
