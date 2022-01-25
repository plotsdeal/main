jQuery(document).ready((function(){function e(e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}var s;$(".login-message, .register-message, .rera_id_container, .developer_name_container, .otp_container, #complate_signup, .success-message").hide(),$("#login_btn").click((function(){$(".login-message").hide();const s=$("#user_login").val(),a=$("#user_password").val();var r=0;if(""==s.length||0==e(s)){$(".login-message").html("Invalid Email ID"),$(".login-message").css({display:"block"});r=1}if(""==a.length){$(".login-message").html("Password Required"),$(".login-message").css({display:"block"});r=1}0==r&&$.ajax({type:"POST",url:"ajax/login.php",data:{username:s,password:a},dataType:"JSON",success:function(e){"error"===e.status?(console.log(e.message),"InvalidLogin"===e.message&&($(".login-message").html("Invalid Username or Password"),$(".login-message").css({display:"block"}))):"success"===e.status&&($(".login-message").hide(),location.reload())}})})),$("#signup").unbind("click").bind("click",(function(s){$(".register-message").hide();const a=$("#first_name").val(),r=$("#last_name").val(),t=$("#contact").val(),i=$("#email").val(),o=$("#password").val(),l=$("#rera_id").val(),n=$("#developer_name").val(),c=document.getElementById("checkbox1");var d=$(".user_type").val(),g=0;if(""==a.length){$(".register-message").html("Firstname Required"),$(".register-message").css({display:"block"});g=1}if(""==r.length){$(".register-message").html("Lastname Required"),$(".register-message").css({display:"block"});g=1}if($("#rera_id_container").is(":visible")&&""==l.length){$(".register-message").html("Rera id Required"),$(".register-message").css({display:"block"});g=1}if($("#developer_name_container").is(":visible")&&""==n.length){$(".register-message").html("Developer Required"),$(".register-message").css({display:"block"});g=1}if(""==t.length||0==function(e){return/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e)}(t)){$(".register-message").html("Contact Number Required (10 Digit required )"),$(".register-message").css({display:"block"});g=1}if(""==i.length||0==e(i)){$(".register-message").html("Email id required"),$(".register-message").css({display:"block"});g=1}if(""==o.length){$(".register-message").html("Password Required"),$(".register-message").css({display:"block"});g=1}if(0==$(c).prop("checked")){$(".register-message").html("Please Accept Terms and Conditions"),$(".register-message").css({display:"block"});g=1}0==g&&$.ajax({type:"POST",url:"ajax/register.php",data:{firstname:a,lastname:r,email:i,contact:t,password:o,user_type:d,rera_id:l,developer_name:n},dataType:"JSON",success:function(e){console.log(e),"error"===e.status?("dupemail"===e.message&&($(".register-message").html("Email ID Already Registered"),$(".register-message").css({display:"block"})),"internalerr"===e.message&&($(".register-message").html("Internal Error"),$(".register-message").css({display:"block"}))):"success"===e.status&&($(".otp_container").css({display:"block"}),$("#signup").hide(),$("#complate_signup").show())}})})),$("#complate_signup").click((function(){var e=0;const s=$("#otp_field").val(),a=$("#email").val();if(""==s.length){$(".register-message").html("OTP required"),$(".register-message").css({display:"block"});e=1}else $(".register-message").hide();0==e?$.ajax({type:"POST",url:"ajax/reg_validate_otp.php",data:{register_email:a,phone_verify_code:s},dataType:"JSON",success:function(e){"error"===e.status?(console.log(e),$(".register-message").html("Invalid OTP"),$(".register-message").css({display:"block"})):"success"===e.status&&($(".register-message").hide(),$(".register-form").hide(),$(".success-message").show(),$("html, body").animate({scrollTop:0},"slow"),console.log("Registration Successful"))}}):console.log("error")})),$((function(){$(document).on("change",".user_type",(function(){"user"==$(this).val()&&$("#developer_name_container, #rera_id_container").hide(),"seller"==$(this).val()&&$("#developer_name_container, #rera_id_container").hide(),"agent"==$(this).val()&&($("#rera_id_container").show(),$("#developer_name_container").hide()),"developer"==$(this).val()&&($("#rera_id_container").hide(),$("#developer_name_container").show())})).change()})),jQuery("#resetpass_btn").click((function(){const s=jQuery("#user_reset_email").val();var a=0;if(""==s.length||0==e(s)){$(".reset-message").html("Invalid email id");a=1}else{$(".reset-message").css({display:"none"});a=0}0==a?jQuery.ajax({type:"POST",url:"ajax/password-reset.php",data:{reset_email:s},dataType:"JSON",success:function(e){console.log(e),"error"===e.status?$(".reset-message").html("No Valid user found"):"success"===e.status&&($(".reset-message").css({display:"none"}),$("#user_otp").css({display:"block"}),$("#validate_otp").css({display:"block"}),$("#resetpass_btn").hide())}}):console.log("error")})),jQuery("#validate_otp").click((function(){const e=jQuery("#user_reset_email").val(),s=jQuery("#user_otp").val();jQuery.ajax({type:"POST",url:"ajax/validate_otp.php",data:{reset_email:e,phone_verify_code:s},dataType:"JSON",success:function(e){console.log(e),"error"===e.status?(console.log(e.message),$(".reset-message").html("Invalid OTP"),$(".reset-message").css({display:"block"})):"success"===e.status&&($(".reset-message").css({display:"none"}),$("#validate_otp").hide(),$("#new_password").css({display:"block"}),$("#confirm_password").css({display:"block"}))}})})),jQuery("#confirm_password").click((function(){const e=jQuery("#user_reset_email").val(),s=jQuery("#new_password").val(),a=jQuery("#user_otp").val();jQuery.ajax({type:"POST",url:"ajax/password-set.php",data:{reset_email:e,new_password:s,phone_verify_code:a},dataType:"JSON",success:function(e){console.log(e),"error"===e.status?($(".reset-message").html("Error while updating your password"),$(".reset-message").css({display:"block"})):"success"===e.status&&(jQuery("#reset-form").hide(),jQuery("#password_success_message").show())}})})),jQuery("#contactFormInq").submit((function(e){e.preventDefault(),s&&s.abort();var a=jQuery(this),r=a.find("input, select, button, textarea"),t=a.serialize();r.prop("disabled",!0),(s=jQuery.ajax({url:"/beta/ajax/proContactForm.php",type:"post",data:t,dataType:"JSON"})).done((function(e,s,a){console.log(e.state),"success"==e.state?(jQuery.notify("Form Submitted Successfully","success"),jQuery("#contactFormInq")[0].reset(),jQuery("#contactFormInqPopUp").modal("toggle")):jQuery.notify("Error While Submitting Form","error")})),s.fail((function(e,s,a){console.error("The following error occurred: "+s,a),jQuery.notify("Error While Submitting Form","error")})),s.always((function(){r.prop("disabled",!1)}))}))
var request;
	jQuery("#sitevisit_form").submit(function(event){
			event.preventDefault();
			
			// Abort any pending request
			if (request) {
				request.abort();
			}
			// setup some local variables
			var myform = jQuery(this);

			// Let's select and cache all the fields
			var myinputs = myform.find("input, select, button, textarea");

			// Serialize the data in the form
			var serializedData = myform.serialize();

			// Let's disable the inputs for the duration of the Ajax request.
			// Note: we disable elements AFTER the form data has been serialized.
			// Disabled form elements will not be serialized.
			myinputs.prop("disabled", true);

			// Fire off the request to /form.php
			request = jQuery.ajax({
				url: "/beta/ajax/proSiteVisitForm.php",
				type: "post",
				data: serializedData,
				dataType: 'JSON',
			});

			// Callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				
				console.log(response);

				   if(response.state == "success") {
                        jQuery.notify("Site Visit Request Submited", "success");
					    jQuery("#sitevisit_form")[0].reset();
						setTimeout(function () {
                     		$.magnificPopup.close();
                 		}, 1000);
						
                   }else{
                       jQuery.notify("Error While Submitting Site Visit Request", "error");
					   //jQuery("#contactFormInq")[0].reset()
                   }
			});

			// Callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
		
				// Log the error to the console
				console.error(
					"The following error occurred: "+
					textStatus, errorThrown
				);
				jQuery.notify("Error While Submitting Site Visit Request", "error");
			});

			// Callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// Reenable the inputs
				myinputs.prop("disabled", false);
			});
	});	

    $(document).on("click", ".compareme", function(){
             
            // Delete id
                var pro_id = $(this).data('id');
                var pro_type = $(this).data('type');
                var pro_title = $(this).data('title');
                var pro_image = $(this).data('image');
                var pro_price = $(this).data('price');
                console.log(pro_id);
                console.log(pro_type);
                
                var action="add_compare";
                
                $.ajax({
                  type:'post',
                  url:'/beta/ajax/compare.php',
                  data:{
                    action:action,
                    pro_id:pro_id,
                    pro_type:pro_type
                  },
                  dataType: 'JSON',
                  success:function(response) {
                  if(response == 0) {
                          $.notify("Property Already in Compare List !", "error");
                  }    
                  
                  if(response == 1) {
                          $.notify("Property Aded in Compare List !", "success");
                          $('#container_compare').append('<div class="utf-listing-item compact compare-pl" id="mycid'+ pro_id +'"> <a href="#" class="utf-smt-listing-img-container"><div class="utf-remove-compare-item remove-atem removecomp" data-id="' + pro_id + '"><i class="icon-line-awesome-close"></i></div><div class="utf-listing-img-content-item"><span class="utf-listing-compact-title-item">' + pro_title + '<i>' + pro_price + '</i></span></div><img src="' + pro_image + '" alt=""></a></div>');
                  }
                  
                  if(response == 2) {
                          $.notify("Maximum 3 Property Can Be Added !", "warning");
                  }
                  }
                });
              
              });
			  
        var wrapper = $('#container_compare');
      
        $(wrapper).on('click', '.remove-atem', function(e){
         		e.preventDefault();
               
                  // Delete id
                  var pro_id = $(this).data('id');

                  var action="remove";
                  
                  console.log(pro_id);
                  
                  $.ajax({
                    type:'post',
                    url:'/beta/ajax/compare.php',
                    data:{
                      action:action,
                      pro_id:pro_id
                    },
                    dataType: 'JSON',
                    success:function(response) {
                    if(response == 0) {
                            $.notify("Internal Error", "error");
                    }    
                    
                    if(response == 1) {
                            $("#mycid"+pro_id).remove();
                            $.notify("Removed from compare", "success");
                    }
                    
                    }
                  });
                
          });
	
})
);