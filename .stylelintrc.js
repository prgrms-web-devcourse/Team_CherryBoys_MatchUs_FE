module.exports = {
  extends: ['stylelint-config-rational-order'],
  plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-a11y'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'no-invalid-position-at-import-rule': null,
  },
};
