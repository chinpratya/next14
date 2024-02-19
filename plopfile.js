const moduleList = [
  {
    name: 'Share Features',
    value: 'share',
  },
  {
    name: 'Authentication',
    value: 'auth',
  },
  {
    name: 'Organization',
    value: 'organization',
  },
  {
    name: 'Profile',
    value: 'profile',
  },
  {
    name: 'Data Mapping',
    value: 'data-mapping',
  },
  {
    name: 'Compliance',
    value: 'compliance',
  },
  {
    name: 'Siem',
    value: 'siem',
  },
  {
    name: 'Compliance Portal',
    value: 'assessment-portal',
  },
];

const configuration = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a share components',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of component',
        choices: [
          {
            name: 'Share Component',
            value: 'share-components',
          },
          {
            name: 'Layout Component',
            value: 'layout-components',
          },
          {
            name: 'Util Component',
            value: 'util-components',
          },
          {
            name: 'Chart Component',
            value: 'chart-components',
          },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{dashCase type}}/{{dashCase name}}/index.ts',
        templateFile:
          '.plop-templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase type}}/{{dashCase name}}/{{dashCase name}}.tsx',
        templateFile:
          '.plop-templates/component/component.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase type}}/{{dashCase name}}/{{dashCase name}}.stories.tsx',
        templateFile:
          '.plop-templates/component/component.stories.ts.hbs',
      },
    ],
  });

  plop.setGenerator('feature', {
    description: 'Create a feature',
    prompts: [
      {
        type: 'list',
        name: 'module',
        message: 'Select the module',
        choices: moduleList,
      },
      {
        type: 'input',
        name: 'page',
        message: 'feature page or tab please',
      },
      {
        type: 'input',
        name: 'name',
        message: 'feature name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{dashCase module}}/{{dashCase page}}/components/{{dashCase page}}-{{dashCase name}}/index.ts',
        templateFile:
          '.plop-templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase module}}/{{dashCase page}}/components/{{dashCase page}}-{{dashCase name}}/{{dashCase page}}-{{dashCase name}}.tsx',
        templateFile:
          '.plop-templates/component/component.ts.hbs',
      },
    ],
  });
};

module.exports = configuration;
