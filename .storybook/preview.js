export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  facelift: {
    enhanceUi: true,
    autoThemeStory: true,
    ui: { elevation: 1 },
    includeNative: true,
    override: {
      brandImage:
        'https://raw.githubusercontent.com/IgorSzyporyn/react-timeout-button/master/assets/logo-small.png',
      brandUrl: 'https://www.npmjs.com/package/react-timeout-button',
    },
    themes: [
      {
        type: 'mui',
        title: 'Material UI',
        key: 'mui',
        variants: {
          light: {
            palette: {
              primary: {
                main: '#ff0000',
              },
              secondary: {
                main: '#f201df',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                main: '#ff0000',
              },
              secondary: {
                main: '#f201df',
              },
            },
          },
        },
      },
    ],
  },
}
