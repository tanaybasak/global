/* 
 * Application : Global
 * ClassName   : sys_script_client
 * Created On  : 2019-11-29 14:00:55
 * Created By  : lghori
 * Updated On  : 2019-11-29 14:09:46
 * Updated By  : lghori
 * URL         : /sys_script_client.do?sys_id=fe54242f1b514454059a65b82d4bcb52
 */
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   //Type appropriate comment here, and begin script below
	
	var message = 'Category team: ' + 'team name' + '\n' + 'Leader: ' + 'Leader Name' +'\n'
	+'Back Up :'+'Back Up Name';

    alert(message);
   
}
