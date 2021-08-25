module.exports = {
  // browser, node 환경에서 동작하는 여러 전역 개념들이 잘 동작하도록 검사할 것인지를 설정.
  env: {
    browser: true,
    node: true,
  },

  // 코드 검사를 할 여러 규칙들 설정
  extends: [
    // vue (아래 셋 중 선택)
    // 'plugin:vue/vue3-essential', // lv1
    "plugin:vue/vue3-strongly-recommended", // lv2
    // 'plugin:vue/vue3-recommend', // lv3 (가장 엄격)

    // js
    "eslint:recommended", // eslint 에서 권장하는 규칙
  ],

  // 코드를 분석할 수 있는 분석기 설정
  parserOptions: {
    parser: "babel-eslint",
  },

  rules: {
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never",
      },
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
