const fs = require('fs');
const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = [
  require('./routes/login'),
  require('./routes/form_input_example'),
  require('./routes/window_open_example'),
  require('./routes/dialog_example'),
];

const ActionMethods = {
  GET: {
    "/": (req, res)=>{
      res.renderLayout('index');
    },
    "/ajax_example": (req, res)=>{
      res.renderLayout("/ajax_example/index")
    },
    "/ajax_example/get_content": (req, res)=>{
      // TODO
    },
    "/iframe_example": (req, res)=>{
      res.renderLayout("/iframe_example")
    },
    "/file_upload_example": (req, res)=>{
      res.renderLayout("/file_upload_example")
    },
    "/file_download_example": (req, res)=>{
      res.renderLayout("/file_download_example")
    },
    "/basic_auth_example": (req, res)=>{
      res.renderLayout("/basic_auth_example")
    },
    "/managed_users": (req, res)=>{
      res.renderLayout("/managed_users")
    }
  },
  POST: {
    "/ajax_example/post_content": (req, res)=>{
      // TODO
    },
  },
};

routes.forEach((methods)=>{
  Object.assign(ActionMethods.GET, methods.GET);
  Object.assign(ActionMethods.POST, methods.POST);
});

class ActionFilter {
  // This filter add methods to req and res needed for acts as webapp.
  static extendFilter(req, res, next){
    res.renderLayout = (page, params)=>{
      res.render('layout', { page: `./${page}`, params: Object.assign({ req: req, res: res }, params || {}) });
    }
    Object.defineProperty(req, 'isLoggedIn', { get: ()=>{ return req.session && req.session.username } })
    next();
  }
  // This filter restricts access by user not logged in
  static loginFilter(req, res, next){
    if(["/manage_users"].some(key => req.path.includes(key)) && !req.isLoggedIn){
      res.redirect('/');
    }else{
      next();
    }
  }
}

class WebApplication {
  static setup(env){
    this.port = env.PORT || 3000;
    const app = this.app = express();
    const logStream = fs.createWriteStream(`${__dirname}/logs/access.log`, { flags: 'a' });

    app.disable('etag');
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({ secret: 'session secret', resave: false, saveUninitialized: false }))
    app.use(morgan('combined', { stream: logStream }));
    app.set('view engine', 'ejs');

    app.use(ActionFilter.extendFilter);
    app.use(ActionFilter.loginFilter);
    Object.keys(ActionMethods.GET).forEach((key)=>{ app.get(key, ActionMethods.GET[key]) });
    Object.keys(ActionMethods.POST).forEach((key)=>{ app.post(key, ActionMethods.POST[key]) });
  }
  static start(){
    this.app.listen(this.port, ()=>{
      console.log(`Example webapp listening on port "${this.port}"`);
    });
  }
}

module.exports = WebApplication;

if(!module.parent){
  WebApplication.setup(process.env);
  WebApplication.start();
}
