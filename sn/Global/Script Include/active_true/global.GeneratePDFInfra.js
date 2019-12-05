/* 
 * Application : Global
 * ClassName   : sys_script_include
 * Created On  : 2019-05-13 09:12:02
 * Created By  : admtrinadh
 * Updated On  : 2019-05-13 09:12:30
 * Updated By  : admtrinadh
 * URL         : /sys_script_include.do?sys_id=3555e9c71b9d73003e2820676e4bcbef
 */
var GeneratePDFInfra = Class.create();

 

/**

* Utility to create a PDF for the form

* @param table, table id, target table, target id

*/

GeneratePDFInfra.generate = function(name, sys_id, targetTable, targetId,body,filename) {//gs.addErrorMessage("started11111111111");

var generalHRForm = new GeneratePDFInfra({

                tableId : (sys_id) ? sys_id : null,

                tableName : name,

                targetTable : targetTable,

                targetId : targetId,

                generalDebug : null,

                bodyofinvoice : body,

                filename:filename,

                mode : 'pdf'

});

//            gs.addErrorMessage("started2222222222222222");

generalHRForm.start();

generalHRForm.createPDF();

 

};

 

var generalHRForm = {

                initialize : function() {

                               

                               

                                global.GeneralForm.prototype.initialize.apply(this, arguments);

                               

                                var instance = gs.getProperty('glide.servlet.uri');

                                this._getTemplateInfo(null, null, instance,this.bodyofinvoice);

                },

               

               

                _getTemplateSysId : function(HRCaseId){

                                var gr = new GlideRecord(this.tableName);

                                gr.get(this.tableId);

                               

                                if (this.tableName == hr.TABLE_CASE || this.tableName == hr.TABLE_CASE_WORKFORCE)

                                                return gr.pdf_template + '';

                                else

                                                return gr.parent.pdf_template + '';

                },

               

                _getTemplateInfo : function(templateTableName, templateSysId, instance,bodyofinvoice){

                                this.body = this._parseBodyForEVL(bodyofinvoice, instance);

                               

                },

                _setFileName : function() {

                this.fileName= this.filename;

                },

                _parseBodyForEVL : function(docBody, instance){

                                //var signature=gs.getMessage('<img src="https://cdn.wccftech.com/wp-content/uploads/2017/02/Oreo-Two-Cookies.jpg" height="40px" />');

                                var signature=gs.getMessage('<img style="float:right;" src="https://static1.squarespace.com/static/568aeadbdc5cb4e02c0bea58/t/587e9f0fb3db2b428f6515ab/1486498737106/?format=1500w" height="40px" />');

                               

                                var parsedBody = docBody + '';

                                parsedBody = parsedBody.replace(/\{\{image\}\}/gi, signature);                

                                return parsedBody;

                },

               

               

               

               

                _setDocument : function() {

                                if (this.setDocument) {

                                                this.setDocument();

                                } else {

                                               

                                                // This object allows us to control the properties for the Document,

                                                // size, margins etc.

                                                var pdfDoc = new global.GeneralPDF.Document(null, null, null, null, this.pageSize, this.headerImage);

                                                //

                                                // When possible all changes to the PDF Document objects

                                                // should be done here, outside of the base object.

                                                // Anything along the lines of properties on the PDF Document

                                                // object.

                                                //

                                                // Set page size

                                                // pdfDoc.setPageSize();

                                                //

                                                // Set rotation (landscape/portrait)

                                                // pdfDoc.setRotation();

                                                //

                                                // Set author

                                                // pdfDoc.setAuthor();

                                                //

                                                // Set margins

                                                // pdfDoc.setMargins();

                                               

                                                // This object contains many options for creating PDFs in different ways.

                                                this.document = new global.GeneralPDF(pdfDoc);

                                               

                                                // When possible all changes to the PDF Document object

                                                // should be done here, outside of the base object.

                                                //

                                                // Examples include setting things here such as page break events,

                                                // header, footer, styleSheets. Anything along the lines of

                                                // writing the PDF file.

                                                //

                                                // Set page break events

                                                //this.document.setPageBreakEvent();

                                                //

                                               

                                                // set header, footer, footnote, header position, footer position, page size

                                                this.document.setDocTempleInfo(this.headerImage, this.footerImage, this.footnote, this.headerPosition, this.footerPosition, this.pageSize);

                                               

                                                // Set iTextPdf CSS StyleSheet

                                                // this.document.setStyleSheet();

                                               

                                                // Creates a new document open for writing then we will parse HTML

                                                // and add it to the document. This allows us to control things such

                                                // as

                                                // page break based on a certain GeneralFormDemoElement type as one

                                                // example.

                                                // It also helps improve PDF creation performance because small

                                                // blocks

                                                // of HTML tables are added for each element in the form versus

                                                // creating

                                                // a single huge table and adding that to the document one time.

                                                this.document.startHTMLParser();

                                                //gs.addErrorMessage(this.body);

                                                this.document.addHTML(this.body);

                                               

                                                this.debug.write();

                                               

                                                // clean up the draft document

                                                this._cleanUpDraftDocument();

                                }

                },

               

               

               

                type : 'GeneratePDFBBO'

};

GeneratePDFInfra.prototype = Object.extendsObject(global.GeneralForm, generalHRForm);
