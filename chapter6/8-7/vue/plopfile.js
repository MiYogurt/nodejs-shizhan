module.exports = function(plop) {
  plop.setGenerator('page', {
    description: 'new vue page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'page name please'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/views/{{name}}.vue',
        templateFile: 'templates/page.hbs'
      }
    ]
  })
  plop.setGenerator('component', {
    description: 'new vue component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}.vue',
        templateFile: 'templates/page.hbs'
      }
    ]
  })
}
