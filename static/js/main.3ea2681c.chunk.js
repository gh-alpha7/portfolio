(this.webpackJsonpkogn=this.webpackJsonpkogn||[]).push([[0],{323:function(e,t,a){},324:function(e,t,a){},325:function(e,t,a){"use strict";a.r(t);var s=a(2),n=a(9),c=a.n(n),l=a(78),r=a.n(l),i=(a(85),a(14)),o=a(15),d=a(17),b=a(16),h=(a(86),a(87),a.p+"static/media/s.08d1ca6e.png");var u=function(){return Object(s.jsx)("div",{className:"intro",children:Object(s.jsxs)("div",{className:"intro-div",children:[Object(s.jsx)("h1",{className:"intro-hi",children:"Hi,"}),Object(s.jsx)("h1",{className:"intro-hi name",children:"I'm "}),Object(s.jsx)("img",{className:"image_s name",src:h}),Object(s.jsx)("h1",{className:"intro-hi name",children:"ubham,"}),Object(s.jsx)("h1",{className:"intro-hi",children:"Developer."})]})})};a(88),a(89);var j=function(){return Object(s.jsxs)("div",{className:"menu",children:[Object(s.jsx)("div",{className:"logo_div",children:Object(s.jsx)("img",{className:"nav_logo",src:h})}),Object(s.jsx)("div",{className:"icon_div",children:Object(s.jsx)("i",{className:"icon-cost fa fa-home"})}),Object(s.jsxs)("div",{className:"contact",children:[Object(s.jsx)("a",{className:"contact-a",href:"https://www.facebook.com/profile.php?id=100002494420268",children:Object(s.jsx)("i",{className:"fa fa-facebook-f"})}),Object(s.jsx)("a",{className:"contact-a",href:"https://www.linkedin.com/in/subham-kumar-singh-853728108/",children:Object(s.jsx)("i",{className:"fa fa-linkedin"})})]})]})},x=(a(90),a(34)),m=a.n(x),v={particles:{number:{value:100,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5}},opacity:{value:1,random:!0,anim:{enable:!0,speed:1,opacity_min:0,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:4,size_min:.3,sync:!1}},line_linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:1,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:600}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"bubble"},onclick:{enable:!0,mode:"repulse"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:250,size:0,duration:2,opacity:0,speed:3},repulse:{distance:400,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0};var p=function(){return Object(s.jsxs)("div",{className:"resume-ch",children:[Object(s.jsx)("h1",{className:"resume-header",children:"Interests"}),Object(s.jsx)("p",{className:"resume-content",children:"Physics, Singing, Sketching, Gaming solving, codes/ciphers "})]})};var f=function(){return Object(s.jsxs)("div",{className:"resume-ch",children:[Object(s.jsx)("h1",{className:"resume-header",children:"Skills"}),Object(s.jsx)("p",{className:"resume-content",children:"The main area of expertise is full stack development."}),Object(s.jsx)("p",{className:"resume-content",children:"Worked using many tools and languages."}),Object(s.jsx)("p",{className:"resume-content",children:"React.js, Node,js, Redux, React native, openwrt, fastcgi, Javascript, c++, python, shell"})]})};var _=function(){return Object(s.jsxs)("div",{className:"resume-ch",children:[Object(s.jsx)("h1",{className:"resume-header",children:"Experience"}),Object(s.jsx)("p",{className:"resume-content",children:"Microland(intern), worked on lex, alexa for automating IT management services related to ticketing tool"}),Object(s.jsx)("p",{className:"resume-content",children:"Microland(FT), worked on anomaly detection project using MERN stack."}),Object(s.jsx)("p",{className:"resume-content",children:"Samsung(FT), part of Connectivity-AI team, worked on Routers Device Manager APIs using C language."})]})};var O=function(){return Object(s.jsxs)("div",{className:"resume-ch",children:[Object(s.jsx)("h1",{className:"resume-header",children:"Education"}),Object(s.jsx)("p",{className:"resume-content",children:"AISSE(CBSE 10th) : DAV Public School, Kedla"}),Object(s.jsx)("p",{className:"resume-content",children:"AISSCE(CBSE 12th) : DAV Public School, Hazaribagh"}),Object(s.jsx)("p",{className:"resume-content",children:"BE(BIOTECHNOLOGY) : BIT Mesra, Ranchi"})]})};var y=function(){return Object(s.jsxs)("div",{className:"resume-ch",children:[Object(s.jsx)("h1",{className:"resume-header",children:"Projects"}),Object(s.jsx)("p",{className:"resume-content",children:"AngelList Apply: python automation script for searching and applying for jobs on angelList by applying required filters(Python)"}),Object(s.jsx)("p",{className:"resume-content",children:"Parkit: App for finding parking places nearby(React Native)"})]})},g=function(e){Object(d.a)(a,e);var t=Object(b.a)(a);function a(e){return Object(i.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){console.log(this.props.comp,"render");var e="EXPERIENCE"==this.props.comp?Object(s.jsx)(_,{}):"EDUCATION"==this.props.comp?Object(s.jsx)(O,{}):"PROJECT"==this.props.comp?Object(s.jsx)(y,{}):"INTERESTS"==this.props.comp?Object(s.jsx)(p,{}):"SKILLS"==this.props.comp?Object(s.jsx)(f,{}):null;return Object(s.jsxs)("div",{className:"resume",children:[Object(s.jsx)("div",{className:"resume-div",children:e}),Object(s.jsx)(m.a,{params:v})]})}}]),a}(c.a.Component),N=(a(323),a(79)),w=(a(324),function(e){Object(d.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).reset=function(){s.rect=[],s.setState(s.original_state),s.interval&&clearInterval(s.interval),s.ctx.clearRect(0,0,s.width,s.height),setTimeout((function(){s.drawBall(),s.drawBoard(),s.drawRect()}),100)},s.drawRect=function(){console.log("drawRect");for(var e=s.ctx,t=["INTERESTS","EDUCATION","PROJECTS","SKILLS","EXPERIENCE"],a=0;a<4;a++){var n=0;n=Math.floor(5*Math.random()),2==a&&(n=Math.floor(3*Math.random()));for(var c=0;c<5;c++){e.strokeStyle="rgb(0, "+Math.floor(255-42.5*a)+", "+Math.floor(255-42.5*c)+")",e.beginPath();var l={axis:[],filled:!1};c==n&&(e.fillText(t[a],15+90*c+10,25+35*a+18),l.filled=t[a]),2==a&&4==c&&(e.fillText(t[4],15+90*c+10,25+35*a+18),l.filled=t[4]),e.rect(15+90*c,25+35*a,78,30),l.axis=[15+90*c,25+35*a],s.rect.push(l),e.stroke()}}},s.drawBoard=function(){var e=s.ctx;e.clearRect(s.state.prev_x,398,78,17);e.beginPath(),e.rect(s.state.x_axis,400,75,15),e.fillStyle="#08fdd8",e.fill()},s.drawBall=function(){var e=s.ctx;e.clearRect(s.state.prev_ball_x-10,s.state.prev_ball_y-10,20,20),e.strokeStyle="#08fdd8",e.fillStyle="#08fdd8",e.beginPath(),e.arc(s.state.ball_x,s.state.ball_y,8,0,2*Math.PI,!1),e.fill()},s.handleKeyDown=function(e){console.log(e.keyCode);if("37"==e.keyCode){if(s.state.x_axis<16)return;var t=s.state.x_axis,a=t;if(t-=5,s.setState({x_axis:t,prev_x:a}),s.drawBoard(),!s.state.started){var n=s.state.ball_x,c=n;n-=5,s.setState({ball_x:n,prev_ball_x:c}),s.drawBall()}}else if("39"==e.keyCode){if(s.state.x_axis>s.width-95)return;var l=s.state.x_axis,r=l-2;if(l+=5,s.setState({x_axis:l,prev_x:r}),s.drawBoard(),!s.state.started){var i=s.state.ball_x,o=i;i+=5,s.setState({ball_x:i,prev_ball_x:o}),s.drawBall()}}else"13"==e.keyCode&&0==s.state.started&&(s.setState({started:!0}),s.interval=setInterval(s.play,15))},s.collission=function(){s.rect.map((function(e,t){e.axis,e.filled;s.state.ball_x>=e.axis[0]&&s.state.ball_x<=e.axis[0]+79&&s.state.ball_y<=e.axis[1]+31&&s.state.ball_y>=e.axis[1]&&(s.ctx.clearRect(e.axis[0]-5,e.axis[1]-5,86,38),s.rect.splice(t,1),s.state.ball_y==e.axis[1]&&s.move("x",-1*s.state.prev_yv),s.state.ball_x==e.axis[0]&&s.move(-1*s.state.prev_xv,"x"),s.state.ball_x==e.axis[0]+79&&s.move(-1*s.state.prev_xv,"x"),s.state.ball_y==e.axis[1]+31&&s.move("x",-1*s.state.prev_yv),e.filled&&(s.props.callback(e.filled),s.resetBoard()))})),s.state.ball_x<=s.bound.left_wall&&s.move(-1*s.state.prev_xv,"x"),s.state.ball_y<=s.bound.top_wall&&s.move("x",-1*s.state.prev_yv),s.state.ball_x>=s.bound.right_wall&&s.move(-1*s.state.prev_xv,"x"),s.state.ball_y>=390&&s.state.ball_x>=s.state.x_axis-4&&s.state.ball_x<=s.state.x_axis+76&&s.move("x",-1*s.state.prev_yv),s.state.ball_y>=s.bound.down_wall&&s.reset()},s.resetBoard=function(){clearInterval(s.interval);var e=s.ctx;e.clearRect(s.state.prev_ball_x-10,s.state.prev_ball_y-10,20,20),e.clearRect(0,300,s.bound.right_wall,s.bound.down_wall),setTimeout((function(){s.setState(s.original_state),s.drawBoard(),s.drawBall()}),200)},s.play=function(){s.move(s.state.prev_xv,s.state.prev_yv),s.collission()},s.move=function(e,t){"x"==t&&(t=s.state.prev_yv),"x"==e&&(e=s.state.prev_xv);var a=s.state.ball_x+e,n=s.state.ball_y+t;s.setState({ball_x:a,ball_y:n,prev_ball_x:a-e,prev_ball_y:n-t,prev_xv:e,prev_yv:t}),s.drawBall()},s.state={x_axis:190,prev_x:120,ball_x:229,ball_y:390,prev_ball_x:249,prev_ball_y:390,prev_xv:-1,prev_yv:-1,started:!1},s.original_state=Object(N.a)({},s.state),s.bound={left_wall:16,right_wall:440,top_wall:5,down_wall:430},s.ctx=null,s.height=s.width=null,s.interval=null,s.rect=[],s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyDown);var e=this.refs.canvas,t=e.getContext("2d");this.ctx=t,this.width=e.width,this.height=e.height,this.reset(),console.log(e.width,e.height)}},{key:"render",value:function(){return Object(s.jsx)("div",{className:"atari",children:Object(s.jsx)("canvas",{ref:"canvas",height:422,width:457})})}}]),a}(c.a.Component));a(77);var k=function(){return Object(s.jsxs)("div",{className:"header",children:[Object(s.jsx)("code",{children:"if(not_in_hurry)"}),Object(s.jsxs)("code",{className:"tab_code inline_code",children:["play_around(",Object(s.jsx)("a",{className:"link",href:""}),");"]}),Object(s.jsx)("code",{className:"inline_code comment",children:"//press enter"}),Object(s.jsx)("code",{children:"else"}),Object(s.jsxs)("code",{className:"tab_code",children:["download_resume(",Object(s.jsx)("a",{className:"link",href:"https://github.com/gh-alpha7/tictac/raw/master/Subham's%20Resume.pdf",children:"download"}),");"]}),Object(s.jsx)(m.a,{params:v})]})},S=function(e){Object(d.a)(a,e);var t=Object(b.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return Object(s.jsx)("div",{children:Object(s.jsxs)("div",{className:"button",children:[Object(s.jsx)("a",{className:"flat-button",onClick:function(){e.props.onStart()},children:" Start "}),Object(s.jsx)("a",{className:"reset_button flat-button",onClick:function(){e.props.onReset()},children:" Reset "})]})})}}]),a}(c.a.Component),C=function(e){Object(d.a)(a,e);var t=Object(b.a)(a);function a(){var e;Object(i.a)(this,a);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).filledClick=function(t){console.log("inside filled",t),e.props.selected(t)},e.startClick=function(){},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return Object(s.jsxs)("div",{className:"game",children:[Object(s.jsx)(k,{}),Object(s.jsx)(w,{callback:this.filledClick,ref:function(t){e.atari=t}}),Object(s.jsx)(S,{onStart:function(){return e.atari.handleKeyDown({keyCode:"13"})},onReset:function(){return e.atari.reset()}})]})}}]),a}(c.a.Component),E=function(e){Object(d.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).selected=function(e){s.setState({comp:e}),console.log("inside selected")},s.state={comp:null},s}return Object(o.a)(a,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:"app",children:[Object(s.jsx)(j,{}),Object(s.jsxs)("div",{className:"resume-box",children:[Object(s.jsx)(u,{}),Object(s.jsx)(g,{comp:this.state.comp})]}),Object(s.jsx)(C,{selected:this.selected})]})}}]),a}(c.a.Component),R=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,326)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,c=t.getLCP,l=t.getTTFB;a(e),s(e),n(e),c(e),l(e)}))};r.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(E,{})}),document.getElementById("root")),R()},77:function(e,t,a){},85:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){}},[[325,1,2]]]);
//# sourceMappingURL=main.3ea2681c.chunk.js.map