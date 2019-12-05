/* 
 * Application : Global
 * ClassName   : sys_script_include
 * Created On  : 2019-11-27 12:41:46
 * Created By  : lghori
 * Updated On  : 2019-11-27 12:54:22
 * Updated By  : lghori
 * URL         : /sys_script_include.do?sys_id=29800a3e1bd90c1400584225bd4bcbe2
 */
var attachPDFAsset = Class.create();
attachPDFAsset.prototype = {
	initialize: function() {
	},
	pdfFun : function(sysId){
		
		gs.addInfoMessage('inside');

		var body = "";
		var fileName = "hello";
		var costFields = "";
		var timelineStartDate="";
		var timelineEndDate="";
		var engagementCode="";
		var requestedFor="";
		var assignedTo="";


		var labour_cost = "";
		var labour_cost_pc_hr = "";
		var labour_cost_sub_total = "";
		var ritm_no = "";

		var total_cost = "";

		var gr  = new GlideRecord("alm_hardware");
		if(gr.get(sysId)){
			body = "<b> Asset tag  : </b>" +  gr.asset_tag.getDisplayValue();
			
		}


		global.GeneratePDFInfra.generate("alm_hardware", sysId, "alm_hardware",sysId,body,fileName);
	},
	
	pdfFunItFirewall : function(sysId){

		var body = "";
		var fileName = "Fields";
		var costFields = "";

		var gr  = new GlideRecord("sc_req_item");
		if(gr.get(sysId)){
			costFields = gr.variables.fields;
		}

		body = body + "<table><tr><td><b>Source</b></td> <td><b>Destination</b></td> <td><b>Protocol</b></td> <td><b>Port</b></td> <td><b>Business Reason</b></td></tr>";
		costFields = JSON.parse(costFields);
		
		if(costFields!="") //adding as per DCR August MR
			{
		
		//	gs.info("ItFirewall -- " + costFields.length);
		for(var i = 0 ; i < costFields.length; i++) {

			var protocol = costFields[i].protocol;
			gs.log("@@COST for Firewall"+protocol);
			
			if(protocol == "tcp")
				protocol = "TCP";
			if(protocol == "udp")
				protocol = "UDP";	

			var business_reason = "";
			if(costFields[i].business_reason)
				business_reason= costFields[i].business_reason;

			body = body + "<tr><td>" +costFields[i].source + "</td><td>" +costFields[i].destination  + "</td><td>" +protocol+ "</td><td>" +costFields[i].port + "</td><td>" +business_reason+ "</td></tr>";
		}

		body = body  + "</table>";

		global.global.GeneratePDFItFirewall.generate("sc_req_item", sysId, "sc_req_item",sysId,body,fileName);
		
			}
	},
	type: 'attachPDFAsset'
};
