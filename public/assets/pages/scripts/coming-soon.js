var ComingSoon = function () {

    return {
        //main function to initiate the module
        init: function () {
            
            var iTimeLeftDate = $("#iTimeLeftDate").val();
            var austDay = new Date(iTimeLeftDate);
            austDay = new Date(iTimeLeftDate);
            $('#defaultCountdown').countdown({until: austDay});
            $('#year').text(austDay.getFullYear());

//            $.backstretch([
//		            "../assets/pages/media/bg/1.jpg",
//		            "../assets/pages/media/bg/2.jpg",
//		            "../assets/pages/media/bg/3.jpg",
//		    		"../assets/pages/media/bg/4.jpg"
//		        ], {
//		        fade: 1000,
//		        duration: 10000
//		   });
        }

    };

}();

jQuery(document).ready(function() {    
   ComingSoon.init(); 
});