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
}
