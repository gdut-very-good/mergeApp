
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/letter/writerLetter/writerLetter","pages/index/letter/letter/envelope/envelope","pages/index/letter/letter/submitEnvelope/submitEnvelope","pages/loginPage/login","pages/index/letter/jiaonang/jiaonang","pages/index/letter/shudong/shudong","pages/index/letter/letter/letter","pages/index/index"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF"},"tabBar":{"borderStyle":"black","backgroundColor":"#333","color":"#8F8F94","selectedColor":"#41B883","list":[{"pagePath":"pages/index/letter/writerLetter/writerLetter","iconPath":"static/envelope.png","selectedIconPath":"static/envelope.png","text":"写信"},{"pagePath":"pages/tabbar/tabbar-4/tabbar-4","iconPath":"static/my.png","selectedIconPath":"static/my.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"test","compilerVersion":"2.7.9","entryPagePath":"pages/index/letter/writerLetter/writerLetter","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/letter/writerLetter/writerLetter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"写点什么"}},{"path":"/pages/index/letter/letter/envelope/envelope","meta":{},"window":{"navigationBarTitleText":"写信"}},{"path":"/pages/index/letter/letter/submitEnvelope/submitEnvelope","meta":{},"window":{"navigationBarTitleText":"信件信息"}},{"path":"/pages/loginPage/login","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/letter/jiaonang/jiaonang","meta":{},"window":{"navigationBarTitleText":"写给明天的自己"}},{"path":"/pages/index/letter/shudong/shudong","meta":{},"window":{"navigationBarTitleText":"创建树洞"}},{"path":"/pages/index/letter/letter/letter","meta":{},"window":{"navigationBarTitleText":"写点什么"}},{"path":"/pages/index/index","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
