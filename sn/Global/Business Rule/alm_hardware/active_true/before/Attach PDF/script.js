/* 
 * Application : Global
 * ClassName   : sys_script
 * Created On  : 2019-11-27 12:26:23
 * Created By  : lghori
 * Updated On  : 2019-11-27 12:54:38
 * Updated By  : lghori
 * URL         : /sys_script.do?sys_id=30ac3d7a1bd90c1400584225bd4bcb7f
 */
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var s = new attachPDFAsset();
    s.pdfFun(current.sys_id);
    action.setRedirectURL(current);

})(current, previous);
