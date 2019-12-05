/* 
 * Application : Global
 * ClassName   : sys_ui_action
 * Created On  : 2008-02-23 20:30:38
 * Created By  : glide.maint
 * Updated On  : 2019-12-05 06:20:59
 * Updated By  : nmyana
 * URL         : /sys_ui_action.do?sys_id=47fd7f4dc0a8000600a552278b5232ab
 */
action.setRedirectURL(current);
current.update();
if (! current.isActionAborted())
    action.setRedirectURL(current);
