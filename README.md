# jonPack
Personal Webpack boilerplate for development by Alexander Komarevich.<br>
PUG+SASS+BABEL<br>
With component-based structure
## Use

To run development server `npm run start`<br>
To run development `npm run dev`<br>
To run production (with minify) `npm run prod`<br>

## Structure
```
/src
  /system
    /_base
      reset.sass
      variables.sass
      mixins.sass
      fonts.sass
      grid.sass
      page.sass
  /components
    /head
      head.pug
    /header
      header.sass
      header.pug
    /footer
      footer.sass
      footer.pug
    /.. any blocks
  /fonts
    .. any fonts
  /img
    .. any images
  app.js
  app.sass
  index.pug
  template.pug
```