module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  semi: true,
  tabWidth: 2,
  useTabs: false,
};
