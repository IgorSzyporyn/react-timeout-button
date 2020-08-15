export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  facelift: {
    enhanceUi: true,
    autoThemeStory: true,
    ui: { elevation: 1 },
    includeNative: true,
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
                main: '#953ff1',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                main: '#ff0000',
              },
              secondary: {
                main: '#953ff1',
              },
            },
          },
        },
      },
    ],
  },
}
