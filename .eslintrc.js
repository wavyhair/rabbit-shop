module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "import/first": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  // The Follow configs works with eslint-plugin-vue v7.x.x
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
}







