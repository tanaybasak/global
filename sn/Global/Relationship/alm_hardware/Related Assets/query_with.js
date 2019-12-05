/* 
 * Application : Global
 * ClassName   : sys_relationship
 * Created On  : 2019-12-02 03:47:02
 * Created By  : lghori
 * Updated On  : 2019-12-02 03:49:44
 * Updated By  : lghori
 * URL         : /sys_relationship.do?sys_id=6665b5501be1c854059a65b82d4bcbe4
 */
(function refineQuery(current, parent) {

	// Add your code here, such as current.addQuery(field, value);
    current.addQuery('u_reference_asset',parent.sys_id);
})(current, parent);
