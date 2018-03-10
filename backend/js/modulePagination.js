var modulePagination=(function ($) {
    var opacityMaps=0;

    function login_public(){
        $('#loadingPage').addClass('hidden');
        $('#loginPage').addClass('hidden');
        $('#dashboardPage').removeClass('hidden');
        $('body').removeClass('hold-transition login-page');
        $('body').addClass('hold-transition skin-red-light sidebar-mini');
    }

    function logout_public(){
        $('#loginPage').addClass('hidden');
        $('#dashboardPage').addClass('hidden');
        $('#loadingPage').removeClass('hidden');

        /*$('#dashboardPage').addClass('hidden');
        $('#loginPage').removeClass('hidden');
        $('body').removeClass('hold-transition skin-blue sidebar-mini');
        $('body').addClass('hold-transition login-page');*/
    }


    function loading_public(){
        $('#loginPage').addClass('hidden');
        $('#loadingPage').removeClass('hidden');
        $('body').removeClass('hold-transition skin-blue sidebar-mini');
    }

    function showPage_public(id) {
        opacityMaps=0;
        $('.customMap').css( "opacity",opacityMaps);

        $('.page').addClass('hidden');
        $(id).removeClass('hidden');

        //Inicialiar los maps (hidden divs)
        var maps= environment.get('appVue').arrayOfMaps();
        console.log("lng",maps.length );
        for(var i=0;i<maps.length;i++){
            maps[i].map.invalidateSize(true);
        }

        animateLoadMaps()
    }

    function animateLoadMaps() {
        setTimeout(function () {
            $('.customMap').css( "opacity",opacityMaps);
            opacityMaps=opacityMaps+0.01;
            if(opacityMaps<1){
                animateLoadMaps(opacityMaps);
            }
        }, 30);
    }

    return{
        login:login_public,
        loading:loading_public,
        logout:logout_public,
        showPage:showPage_public
    }
})(jQuery);

environment.register('modulePagination', modulePagination);


$(function() {
    $('.customMap').on('shown.bs.collapse', function (e) {

    })
});