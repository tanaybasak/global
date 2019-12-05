/* 
 * Application : Global
 * ClassName   : sys_script_include
 * Created On  : 2019-05-13 08:27:27
 * Created By  : admtrinadh
 * Updated On  : 2019-10-17 14:18:10
 * Updated By  : ppalleed
 * URL         : /sys_script_include.do?sys_id=d86b15cf1b5d73003e2820676e4bcb91
 */
var downloadforFulfiller = Class.create();
downloadforFulfiller.prototype = {
	initialize: function() {
	},
	pdfFun : function(sysId){

		var body = "";
		var fileName = "";
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

		var gr  = new GlideRecord("sc_req_item");
		if(gr.get(sysId)){
			body = "<b> Request type  : </b>" +  gr.cat_item.getDisplayValue();
			fileName = "Proposal "+gr.number +" " + gs.nowDateTime();
			costFields = gr.variables.cost; // contains the json in [ { "name" : "njh", "pcs_hrs" : "78", "item_cost" : "78" }, { "name" : "k", "pcs_hrs" : "8  9", "item_cost" : "8" } ]  f ormat
		//	gs.info( gr.variables.cost + " --- ");


			labour_cost = 	gr.variables.labour_cost ;
			
			labour_cost_pc_hr = gr.variables.labour_cost_pc_hr ;
			
			
			if( gr.variables.labour_cost)
				labour_cost =  gr.variables.labour_cost + " EUR";
			
			
			labour_cost_sub_total =  gr.variables.labour_cost_sub_total ;
			
			labour_cost_sub_total =  "" ;
			if( gr.variables.labour_cost_sub_total)
				labour_cost_sub_total = gr.variables.labour_cost_sub_total + " EUR";
			
			
			
			total_cost =  "" ;
			if( gr.variables.total_cost)
				total_cost = gr.variables.total_cost + " EUR";
			ritm_no = gr.number;
			engagementCode= gr.variables.engagement_code ;
			//requestedFor=gr.variables.requested_for_default_field.getDisplayValue();
			requestedFor=gr.variables.requested_for.getDisplayValue();
			timelineStartDate = gr.variables.timeline_start_date;
			if(timelineStartDate){
				timelineStartDate = new GlideDateTime(timelineStartDate).getLocalDate();
			}
			timelineEndDate = gr.variables.timeline_stop_date;
			if(timelineEndDate){
				timelineEndDate = new GlideDateTime(timelineEndDate).getDate();
				new GlideDateTime(timelineEndDate).getLocalDate();
			}
			assignedTo = gr.assigned_to.getDisplayValue();
			//updated by Tanoy.


		}

		body = body  + "<p> </p>";
		body = body  + "<p><b> Request number : </b>" + ritm_no + "</p>";
		body = body  + "<p> <b>Enagement Code :</b> " + engagementCode + "</p>";
		body = body  + "<p> <b>Requested By: </b>" + requestedFor + "</p>";
		body = body  + "<p><b> Assigned SA Team Member: </b>" + assignedTo + "</p>";
		body = body  + "<p><b> Timeline:</b>&nbsp;&nbsp;From "+timelineStartDate+" "+" " + " " + "To "+ timelineEndDate+ "</p>";
		body = body  + "<br>";

		costFields = JSON.parse(costFields);

		for(var j = 0 ; j < costFields.length; j++) {


		}

		body = body + "<table><tr><th>Name</th> <th>PCs/Hrs</th> <th>Item Cost</th> <th>Sub Total</th></tr>";

		for(var i = 0 ; i < costFields.length; i++) {



			var names = "";
			if(costFields[i].name) {
				names= costFields[i].name + "";
			}


			var pcs_hrs = "";
			if(costFields[i].pcs_hrs) {
				pcs_hrs= costFields[i].pcs_hrs + '';
			}



			var cost = "";
			if(costFields[i].sub_total) {
				cost= costFields[i].sub_total + ' EUR';
			}

			var item_cost = "";
			if(costFields[i].item_cost) {
				item_cost= costFields[i].item_cost + ' EUR';
			}

			body = body + "<tr><td>" + names + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +pcs_hrs + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + item_cost+ "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +cost + "</td></tr>";
		}

		body = body  + "</table>";



		body = body + "<table>";
		body = body + "<tr><td>Labour Cost (€)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + labour_cost_pc_hr + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + labour_cost  + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +  labour_cost_sub_total + "</td></tr>";
		body = body  + "</table> <br><br>";

		body = body  + "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Total Cost: " + total_cost + "</b></p>";


		global.GeneratePDFInfra.generate("sc_req_item", sysId, "sc_req_item",sysId,body,fileName);
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
	type: 'downloadforFulfiller'
};
