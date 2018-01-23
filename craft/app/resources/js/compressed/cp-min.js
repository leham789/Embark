!function(t){Craft.CP=Garnish.Base.extend({authManager:null,$container:null,$alerts:null,$globalSidebar:null,$globalSidebarTopbar:null,$siteNameLink:null,$siteName:null,$nav:null,$subnav:null,$pageHeader:null,$containerTopbar:null,$overflowNavMenuItem:null,$overflowNavMenuBtn:null,$overflowNavMenu:null,$overflowNavMenuList:null,$overflowSubnavMenuItem:null,$overflowSubnavMenuBtn:null,$overflowSubnavMenu:null,$overflowSubnavMenuList:null,$notificationWrapper:null,$notificationContainer:null,$main:null,$content:null,$collapsibleTables:null,$primaryForm:null,navItems:null,totalNavItems:null,visibleNavItems:null,totalNavWidth:null,showingOverflowNavMenu:!1,showingNavToggle:null,showingSidebarToggle:null,subnavItems:null,totalSubnavItems:null,visibleSubnavItems:null,totalSubnavWidth:null,showingOverflowSubnavMenu:!1,selectedItemLabel:null,fixedNotifications:!1,taskInfo:null,workingTaskInfo:null,areTasksStalled:!1,trackTaskProgressTimeout:null,taskProgressIcon:null,$edition:null,upgradeModal:null,checkingForUpdates:!1,forcingRefreshOnUpdatesCheck:!1,checkForUpdatesCallbacks:null,init:function(){0!=Craft.authTimeout&&(this.authManager=new Craft.AuthManager),this.$container=t("#container"),this.$alerts=t("#alerts"),this.$globalSidebar=t("#global-sidebar"),this.$pageHeader=t("#page-header"),this.$containerTopbar=t("#container .topbar"),this.$globalSidebarTopbar=this.$globalSidebar.children(".topbar"),this.$siteNameLink=this.$globalSidebarTopbar.children("a.site-name"),this.$siteName=this.$siteNameLink.children("h2"),this.$nav=t("#nav"),this.$subnav=t("#subnav"),this.$sidebar=t("#sidebar"),this.$notificationWrapper=t("#notifications-wrapper"),this.$notificationContainer=t("#notifications"),this.$main=t("#main"),this.$content=t("#content"),this.$collapsibleTables=t("table.collapsible"),this.$edition=t("#edition"),this.addListener(Garnish.$win,"touchend","updateResponsiveGlobalSidebar"),this.navItems=[],this.totalNavWidth=Craft.CP.baseNavWidth;var s=this.$nav.children();this.totalNavItems=s.length,this.visibleNavItems=this.totalNavItems;for(var i=0;i<this.totalNavItems;i++){var e=t(s[i]),a=e.width();this.navItems.push(e),this.totalNavWidth+=a}this.subnavItems=[],this.totalSubnavWidth=Craft.CP.baseSubnavWidth;var n=this.$subnav.children();this.totalSubnavItems=n.length,this.visibleSubnavItems=this.totalSubnavItems;for(var i=0;i<this.totalSubnavItems;i++){var e=t(n[i]),a=e.width();this.subnavItems.push(e),this.totalSubnavWidth+=a}this.addListener(this.$sidebar.find("nav ul"),"resize","updateResponsiveSidebar"),this.$sidebarLinks=t("nav a",this.$sidebar),this.addListener(this.$sidebarLinks,"click","selectSidebarItem"),this.addListener(this.$container,"scroll","updateFixedNotifications"),this.updateFixedNotifications(),Garnish.$doc.ready(t.proxy(function(){this.addListener(Garnish.$win,"resize","onWindowResize"),this.onWindowResize();var t=this.$notificationContainer.children(".error"),s=this.$notificationContainer.children(":not(.error)");t.delay(2*Craft.CP.notificationDuration).velocity("fadeOut"),s.delay(Craft.CP.notificationDuration).velocity("fadeOut")},this)),this.$alerts.length&&this.initAlerts(),"FORM"==this.$container.prop("nodeName")?this.$primaryForm=this.$container:this.$primaryForm=t("form[data-saveshortcut]:first"),this.$primaryForm.length&&Garnish.hasAttr(this.$primaryForm,"data-saveshortcut")&&this.addListener(Garnish.$doc,"keydown",function(t){return Garnish.isCtrlKeyPressed(t)&&t.keyCode==Garnish.S_KEY&&(t.preventDefault(),this.submitPrimaryForm()),!0}),Garnish.$doc.on("ready",t.proxy(function(){if(this.$confirmUnloadForms=t("form[data-confirm-unload]"),this.$confirmUnloadForms.length){Craft.forceConfirmUnload||(this.initialFormValues=[]);for(var s=0;s<this.$confirmUnloadForms.length;s++){var i=t(this.$confirmUnloadForms);Craft.forceConfirmUnload||(this.initialFormValues[s]=i.serialize()),this.addListener(i,"submit",function(){this.removeListener(Garnish.$win,"beforeunload")})}this.addListener(Garnish.$win,"beforeunload",function(s){for(var i=0;i<this.$confirmUnloadForms.length;i++)if(Craft.forceConfirmUnload||this.initialFormValues[i]!=t(this.$confirmUnloadForms[i]).serialize()){var e=Craft.t("Any changes will be lost if you leave this page.");return s?s.originalEvent.returnValue=e:window.event.returnValue=e,e}})}},this)),this.$edition.hasClass("hot")&&this.addListener(this.$edition,"click","showUpgradeModal")},submitPrimaryForm:function(){this.trigger("beforeSaveShortcut"),this.$primaryForm.data("saveshortcut-redirect")&&t('<input type="hidden" name="redirect" value="'+this.$primaryForm.data("saveshortcut-redirect")+'"/>').appendTo(this.$primaryForm),this.$primaryForm.submit()},updateSidebarMenuLabel:function(){Garnish.$win.trigger("resize");var s=t("a.sel:first",this.$sidebar);this.selectedItemLabel=s.html()},onWindowResize:function(){this.onWindowResize._cpWidth=Math.min(Garnish.$win.width(),Craft.CP.maxWidth),this.updateResponsiveGlobalSidebar(),this.updateResponsiveNav(),this.updateResponsiveSidebar(),this.updateResponsiveTables()},updateResponsiveGlobalSidebar:function(){var t=window.innerHeight;this.$globalSidebar.height(t)},updateResponsiveNav:function(){this.onWindowResize._cpWidth<=992?this.showingNavToggle||this.showNavToggle():this.showingNavToggle&&this.hideNavToggle()},showNavToggle:function(){this.$navBtn=t('<a class="show-nav" title="'+Craft.t("Show nav")+'"></a>').prependTo(this.$containerTopbar),this.addListener(this.$navBtn,"click","toggleNav"),this.showingNavToggle=!0},hideNavToggle:function(){this.$navBtn.remove(),this.showingNavToggle=!1},toggleNav:function(){Garnish.$bod.hasClass("showing-nav"),Garnish.$bod.toggleClass("showing-nav")},updateResponsiveSidebar:function(){this.$sidebar.length>0&&(this.onWindowResize._cpWidth<769?this.showingSidebarToggle||this.showSidebarToggle():this.showingSidebarToggle&&this.hideSidebarToggle())},showSidebarToggle:function(){var s=t("a.sel:first",this.$sidebar);this.selectedItemLabel=s.html(),this.$sidebarBtn=t('<a class="show-sidebar" title="'+Craft.t("Show sidebar")+'">'+this.selectedItemLabel+"</a>").prependTo(this.$content),this.addListener(this.$sidebarBtn,"click","toggleSidebar"),this.showingSidebarToggle=!0},selectSidebarItem:function(s){var i=t(s.currentTarget);this.selectedItemLabel=i.html(),this.$sidebarBtn&&(this.$sidebarBtn.html(this.selectedItemLabel),this.toggleSidebar())},hideSidebarToggle:function(){this.$sidebarBtn&&this.$sidebarBtn.remove(),this.showingSidebarToggle=!1},toggleSidebar:function(){this.$content.filter(".has-sidebar").toggleClass("showing-sidebar"),this.updateResponsiveContent()},updateResponsiveContent:function(){var s=this.$content.filter(".has-sidebar");if(s.hasClass("showing-sidebar")){var i=t("nav",this.$sidebar).height();if(s.height()<=i){var e=i+48;s.css("height",e+"px")}}else s.css("min-height",0),s.css("height","auto")},updateResponsiveTables:function(){for(this.updateResponsiveTables._i=0;this.updateResponsiveTables._i<this.$collapsibleTables.length;this.updateResponsiveTables._i++)this.updateResponsiveTables._$table=this.$collapsibleTables.eq(this.updateResponsiveTables._i),this.updateResponsiveTables._containerWidth=this.updateResponsiveTables._$table.parent().width(),this.updateResponsiveTables._check=!1,this.updateResponsiveTables._containerWidth>0&&(void 0===this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._check=!0:(this.updateResponsiveTables._isCollapsed=this.updateResponsiveTables._$table.hasClass("collapsed"),this.updateResponsiveTables._containerWidth>this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._isCollapsed&&(this.updateResponsiveTables._$table.removeClass("collapsed"),this.updateResponsiveTables._check=!0):this.updateResponsiveTables._isCollapsed||(this.updateResponsiveTables._check=!0)),this.updateResponsiveTables._check&&this.updateResponsiveTables._$table.width()>this.updateResponsiveTables._containerWidth&&this.updateResponsiveTables._$table.addClass("collapsed"),this.updateResponsiveTables._$table.data("lastContainerWidth",this.updateResponsiveTables._containerWidth))},addLastVisibleNavItemToOverflowMenu:function(){this.navItems[this.visibleNavItems-1].prependTo(this.$overflowNavMenuList),this.visibleNavItems--},addFirstOverflowNavItemToMainMenu:function(){this.navItems[this.visibleNavItems].insertBefore(this.$overflowNavMenuItem),this.visibleNavItems++},addLastVisibleSubnavItemToOverflowMenu:function(){this.subnavItems[this.visibleSubnavItems-1].prependTo(this.$overflowSubnavMenuList),this.visibleSubnavItems--},addFirstOverflowSubnavItemToMainMenu:function(){this.subnavItems[this.visibleSubnavItems].insertBefore(this.$overflowSubnavMenuItem),this.visibleSubnavItems++},updateFixedNotifications:function(){this.updateFixedNotifications._headerHeight=this.$globalSidebar.height(),this.$container.scrollTop()>this.updateFixedNotifications._headerHeight?this.fixedNotifications||(this.$notificationWrapper.addClass("fixed"),this.fixedNotifications=!0):this.fixedNotifications&&(this.$notificationWrapper.removeClass("fixed"),this.fixedNotifications=!1)},displayNotification:function(s,i){var e=Craft.CP.notificationDuration;"error"==s&&(e*=2);var a=t('<div class="notification '+s+'">'+i+"</div>").appendTo(this.$notificationContainer),n=-a.outerWidth()/2+"px";a.hide().css({opacity:0,"margin-left":n,"margin-right":n}).velocity({opacity:1,"margin-left":"2px","margin-right":"2px"},{display:"inline-block",duration:"fast"}).delay(e).velocity({opacity:0,"margin-left":n,"margin-right":n},{complete:function(){a.remove()}}),this.trigger("displayNotification",{notificationType:s,message:i})},displayNotice:function(t){this.displayNotification("notice",t)},displayError:function(t){t||(t=Craft.t("An unknown error occurred.")),this.displayNotification("error",t)},fetchAlerts:function(){var s={path:Craft.path};Craft.queueActionRequest("app/getCpAlerts",s,t.proxy(this,"displayAlerts"))},displayAlerts:function(s){if(Garnish.isArray(s)&&s.length){this.$alerts=t('<ul id="alerts"/>').insertBefore(this.$containerTopbar);for(var i=0;i<s.length;i++)t("<li>"+s[i]+"</li>").appendTo(this.$alerts);var e=this.$alerts.outerHeight();this.$alerts.css("margin-top",-e).velocity({"margin-top":0},"fast"),this.initAlerts()}},initAlerts:function(){var s=this.$alerts.find(".domain-mismatch:first");s.length&&this.addListener(s,"click",t.proxy(function(i){i.preventDefault(),confirm(Craft.t("Are you sure you want to transfer your license to this domain?"))&&Craft.queueActionRequest("app/transferLicenseToCurrentDomain",t.proxy(function(t,i){"success"==i&&(t.success?(s.parent().remove(),this.displayNotice(Craft.t("License transferred."))):this.displayError(t.error))},this))},this));for(var i=this.$alerts.find('a[class^="shun:"]'),e=0;e<i.length;e++)this.addListener(i[e],"click",t.proxy(function(s){s.preventDefault();var i=t(s.currentTarget),e={message:i.prop("className").substr(5)};Craft.queueActionRequest("app/shunCpAlert",e,t.proxy(function(t,s){"success"==s&&(t.success?i.parent().remove():this.displayError(t.error))},this))},this));var a=this.$alerts.find(".edition-resolution:first");a.length&&this.addListener(a,"click","showUpgradeModal")},checkForUpdates:function(s,i){if(this.checkingForUpdates&&!0===s&&!this.forcingRefreshOnUpdatesCheck){var e=i;i=function(){Craft.cp.checkForUpdates(!0,e)}}if("function"==typeof i&&(Garnish.isArray(this.checkForUpdatesCallbacks)||(this.checkForUpdatesCallbacks=[]),this.checkForUpdatesCallbacks.push(i)),!this.checkingForUpdates){this.checkingForUpdates=!0,this.forcingRefreshOnUpdatesCheck=!0===s;var a={forceRefresh:!0===s};Craft.queueActionRequest("app/checkForUpdates",a,t.proxy(function(t){if(this.displayUpdateInfo(t),this.checkingForUpdates=!1,Garnish.isArray(this.checkForUpdatesCallbacks)){var s=this.checkForUpdatesCallbacks;this.checkForUpdatesCallbacks=null;for(var i=0;i<s.length;i++)s[i](t)}this.trigger("checkForUpdates",{updateInfo:t})},this))}},displayUpdateInfo:function(s){if(this.$globalSidebarTopbar.children("a.updates").remove(),s.total){var i;i=1==s.total?Craft.t("1 update available"):Craft.t("{num} updates available",{num:s.total}),t('<a class="updates'+(s.critical?" critical":"")+'" href="'+Craft.getUrl("updates")+'" title="'+i+'"><span data-icon="newstamp"><span>'+s.total+"</span></span></span>").insertAfter(this.$siteNameLink),t("#footer-updates").text(i)}},runPendingTasks:function(){Craft.runTasksAutomatically?Craft.queueActionRequest("tasks/runPendingTasks",t.proxy(function(t,s){"success"==s&&this.trackTaskProgress(!1)},this)):this.trackTaskProgress(!1)},trackTaskProgress:function(s){this.trackTaskProgressTimeout||(!0===s&&(this.workingTaskInfo?(s=1e3*this.workingTaskInfo.age,s=Math.min(6e4,Math.max(500,s))):s=6e4),s?this.trackTaskProgressTimeout=setTimeout(t.proxy(this,"_trackTaskProgressInternal"),s):this._trackTaskProgressInternal())},_trackTaskProgressInternal:function(){Craft.queueActionRequest("tasks/getTaskInfo",t.proxy(function(t,s){"success"==s&&(this.trackTaskProgressTimeout=null,this.setTaskInfo(t,!0),this.workingTaskInfo&&this.trackTaskProgress(!0))},this))},setTaskInfo:function(t,s){this.taskInfo=t,this.workingTaskInfo=this.getWorkingTaskInfo(),this.areTasksStalled=this.workingTaskInfo&&"running"===this.workingTaskInfo.status&&this.workingTaskInfo.age>=Craft.CP.minStalledTaskAge,this.updateTaskIcon(this.getRunningTaskInfo(),s),this.trigger("setTaskInfo")},getRunningTaskInfo:function(){for(var t=["running","error","pending"],s=0;s<t.length;s++)for(var i=0;i<this.taskInfo.length;i++)if(0==this.taskInfo[i].level&&this.taskInfo[i].status===t[s])return this.taskInfo[i]},getWorkingTaskInfo:function(){for(var t=this.taskInfo.length-1;t>=0;t--)if("running"===this.taskInfo[t].status)return this.taskInfo[t]},updateTaskIcon:function(t,i){t?(this.taskProgressIcon||(this.taskProgressIcon=new s),this.areTasksStalled?this.taskProgressIcon.showFailMode(Craft.t("Stalled task")):"running"==t.status||"pending"==t.status?(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.setDescription(t.description),this.taskProgressIcon.setProgress(t.progress,i)):"error"==t.status&&this.taskProgressIcon.showFailMode(Craft.t("Failed task"))):this.taskProgressIcon&&(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.complete(),delete this.taskProgressIcon)},showUpgradeModal:function(){this.upgradeModal?this.upgradeModal.show():this.upgradeModal=new Craft.UpgradeModal}},{maxWidth:1051,navHeight:38,baseNavWidth:30,subnavHeight:38,baseSubnavWidth:30,notificationDuration:2e3,minStalledTaskAge:300,normalizeTaskStatus:function(t){return"running"===t&&Craft.cp.areTasksStalled?"stalled":t}}),Craft.cp=new Craft.CP;var s=Garnish.Base.extend({$li:null,$a:null,$label:null,hud:null,failMode:!1,_canvasSupported:null,_$bgCanvas:null,_$staticCanvas:null,_$hoverCanvas:null,_$failCanvas:null,_staticCtx:null,_hoverCtx:null,_canvasSize:null,_arcPos:null,_arcRadius:null,_lineWidth:null,_arcStartPos:0,_arcEndPos:0,_arcStartStepSize:null,_arcEndStepSize:null,_arcStep:null,_arcStepTimeout:null,_arcAnimateCallback:null,_progressBar:null,init:function(){if(this.$li=t("<li/>").appendTo(Craft.cp.$nav),this.$a=t('<a id="taskicon"/>').appendTo(this.$li),this.$canvasContainer=t('<span class="icon"/>').appendTo(this.$a),this.$label=t('<span class="label"></span>').appendTo(this.$a),this._canvasSupported=!!document.createElement("canvas").getContext,this._canvasSupported){var s=window.devicePixelRatio>1?2:1;this._canvasSize=18*s,this._arcPos=this._canvasSize/2,this._arcRadius=7*s,this._lineWidth=3*s,this._$bgCanvas=this._createCanvas("bg","#61666b"),this._$staticCanvas=this._createCanvas("static","#d7d9db"),this._$hoverCanvas=this._createCanvas("hover","#fff"),this._$failCanvas=this._createCanvas("fail","#da5a47").hide(),this._staticCtx=this._$staticCanvas[0].getContext("2d"),this._hoverCtx=this._$hoverCanvas[0].getContext("2d"),this._drawArc(this._$bgCanvas[0].getContext("2d"),0,1),this._drawArc(this._$failCanvas[0].getContext("2d"),0,1)}else this._progressBar=new Craft.ProgressBar(this.$canvasContainer),this._progressBar.showProgressBar();this.addListener(this.$a,"click","toggleHud")},setDescription:function(t){this.$a.attr("title",t),this.$label.text(t)},setProgress:function(t,s){this._canvasSupported?s?this._animateArc(0,t):this._setArc(0,t):this._progressBar.setProgressPercentage(100*t)},complete:function(){this._canvasSupported?this._animateArc(0,1,t.proxy(function(){this._$bgCanvas.velocity("fadeOut"),this._animateArc(1,1,t.proxy(function(){this.$a.remove(),this.destroy()},this))},this)):(this._progressBar.setProgressPercentage(100),this.$a.velocity("fadeOut"))},showFailMode:function(t){this.failMode||(this.failMode=!0,this._canvasSupported?(this._$bgCanvas.hide(),this._$staticCanvas.hide(),this._$hoverCanvas.hide(),this._$failCanvas.show()):(this._progressBar.$progressBar.css("border-color","#da5a47"),this._progressBar.$innerProgressBar.css("background-color","#da5a47"),this._progressBar.setProgressPercentage(50)),this.setDescription(t))},hideFailMode:function(){this.failMode&&(this.failMode=!1,this._canvasSupported?(this._$bgCanvas.show(),this._$staticCanvas.show(),this._$hoverCanvas.show(),this._$failCanvas.hide()):(this._progressBar.$progressBar.css("border-color",""),this._progressBar.$innerProgressBar.css("background-color",""),this._progressBar.setProgressPercentage(50)))},toggleHud:function(){this.hud?this.hud.toggle():this.hud=new i},_createCanvas:function(s,i){var e=t('<canvas id="taskicon-'+s+'" width="'+this._canvasSize+'" height="'+this._canvasSize+'"/>').appendTo(this.$canvasContainer),a=e[0].getContext("2d");return a.strokeStyle=i,a.lineWidth=this._lineWidth,a.lineCap="round",e},_setArc:function(t,s){this._arcStartPos=t,this._arcEndPos=s,this._drawArc(this._staticCtx,t,s),this._drawArc(this._hoverCtx,t,s)},_drawArc:function(t,s,i){t.clearRect(0,0,this._canvasSize,this._canvasSize),t.beginPath(),t.arc(this._arcPos,this._arcPos,this._arcRadius,(1.5+2*s)*Math.PI,(1.5+2*i)*Math.PI),t.stroke(),t.closePath()},_animateArc:function(t,s,i){this._arcStepTimeout&&clearTimeout(this._arcStepTimeout),this._arcStep=0,this._arcStartStepSize=(t-this._arcStartPos)/10,this._arcEndStepSize=(s-this._arcEndPos)/10,this._arcAnimateCallback=i,this._takeNextArcStep()},_takeNextArcStep:function(){this._setArc(this._arcStartPos+this._arcStartStepSize,this._arcEndPos+this._arcEndStepSize),this._arcStep++,this._arcStep<10?this._arcStepTimeout=setTimeout(t.proxy(this,"_takeNextArcStep"),50):this._arcAnimateCallback&&this._arcAnimateCallback()}}),i=Garnish.HUD.extend({tasksById:null,completedTasks:null,updateViewProxy:null,init:function(){this.tasksById={},this.completedTasks=[],this.updateViewProxy=t.proxy(this,"updateView"),this.base(Craft.cp.taskProgressIcon.$a),this.$main.attr("id","tasks-hud")},onShow:function(){Craft.cp.on("setTaskInfo",this.updateViewProxy),this.updateView(),this.base()},onHide:function(){if(Craft.cp.off("setTaskInfo",this.updateViewProxy),this.completedTasks.length){for(var t=0;t<this.completedTasks.length;t++)this.completedTasks[t].destroy();this.completedTasks=[]}this.base()},updateView:function(){var t=[];if(Craft.cp.taskInfo)for(var s=0;s<Craft.cp.taskInfo.length;s++)t.push(Craft.cp.taskInfo[s].id);for(var e in this.tasksById)Craft.inArray(e,t)||(this.tasksById[e].complete(),this.completedTasks.push(this.tasksById[e]),delete this.tasksById[e]);if(Craft.cp.taskInfo&&Craft.cp.taskInfo.length)for(var s=0;s<Craft.cp.taskInfo.length;s++){var a=Craft.cp.taskInfo[s];if(this.tasksById[a.id])this.tasksById[a.id].updateStatus(a);else{this.tasksById[a.id]=new i.Task(this,a);for(var n=!1,r=s+1;r<Craft.cp.taskInfo.length;r++)if(this.tasksById[Craft.cp.taskInfo[r].id]){this.tasksById[a.id].$container.insertBefore(this.tasksById[Craft.cp.taskInfo[r].id].$container),n=!0;break}if(!n){var o=this.$main.children("object");o.length?this.tasksById[a.id].$container.insertBefore(o):this.tasksById[a.id].$container.appendTo(this.$main)}}}else this.hide()}});i.Task=Garnish.Base.extend({hud:null,id:null,level:null,description:null,status:null,progress:null,$container:null,$statusContainer:null,$descriptionContainer:null,_progressBar:null,init:function(s,i){this.hud=s,this.id=i.id,this.level=i.level,this.description=i.description,this.$container=t('<div class="task"/>'),this.$statusContainer=t('<div class="task-status"/>').appendTo(this.$container),this.$descriptionContainer=t('<div class="task-description"/>').appendTo(this.$container).text(i.description),this.$container.data("task",this),0!=this.level&&(this.$container.css("padding-"+Craft.left,24+24*this.level),t('<div class="indent" data-icon="'+("ltr"==Craft.orientation?"rarr":"larr")+'"/>').appendTo(this.$descriptionContainer)),this.updateStatus(i)},updateStatus:function(s){if(this.status!==(this.status=Craft.CP.normalizeTaskStatus(s.status)))switch(this.$statusContainer.empty(),this.status){case"pending":this.$statusContainer.text(Craft.t("Pending"));break;case"running":this._progressBar=new Craft.ProgressBar(this.$statusContainer),this._progressBar.showProgressBar();break;case"stalled":case"error":if(t('<span class="error">'+("stalled"===this.status?Craft.t("Stalled"):Craft.t("Failed"))+"</span>").appendTo(this.$statusContainer),0==this.level){var i=t('<a class="menubtn error" title="'+Craft.t("Options")+'"/>').appendTo(this.$statusContainer);t('<div class="menu"><ul><li><a data-action="rerun">'+Craft.t("Try again")+'</a></li><li><a data-action="cancel">'+Craft.t("Cancel")+"</a></li></ul></div>").appendTo(this.$statusContainer),new Garnish.MenuBtn(i,{onOptionSelect:t.proxy(this,"performErrorAction")})}}"running"==this.status&&this._progressBar.setProgressPercentage(100*s.progress)},performErrorAction:function(s){for(var i=this.$container.nextAll(),e=0;e<i.length;e++){var a=t(i[e]).data("task");if(!a||0==a.level)break;a.destroy()}switch(t(s).data("action")){case"rerun":Craft.postActionRequest("tasks/rerunTask",{taskId:this.id},t.proxy(function(t,s){"success"==s&&(this.updateStatus(t),Craft.cp.trackTaskProgress(!1))},this));break;case"cancel":Craft.postActionRequest("tasks/deleteTask",{taskId:this.id},t.proxy(function(t,s){"success"==s&&(this.destroy(),Craft.cp.trackTaskProgress(!1))},this))}},complete:function(){this.$statusContainer.empty(),t('<div data-icon="check"/>').appendTo(this.$statusContainer)},destroy:function(){this.hud.tasksById[this.id]&&delete this.hud.tasksById[this.id],this.$container.remove(),this.base()}})}(jQuery);