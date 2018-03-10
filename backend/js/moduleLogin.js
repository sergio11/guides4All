var moduleLogin=(function ($,_environment) {

    function login_Public(){
        var email=$('#inputEmail').val();
        var pass=$('#inputPassword').val();

        _environment.get('Parse').User.logIn(email,pass , {
            success: function(user) {
                //_environment.get('modulePagination').login();
                loadDashboard();
            },
            error: function(user, error) {
                $('#alertError').removeClass('hidden');
                $('#boxForm').effect("shake");
            }
        });
    }

    function loadDashboard(){
        _environment.get('modulePagination').loading();

        _environment.get('moduleDepartments').load(function() {
            _environment.get('moduleUsers').load(function() {
                _environment.get('moduleBuildings').load(function () {
                    _environment.get('moduleBeacons').load(function () {
                        _environment.get('moduleRealTimePosition').load(function () {
                            //Una vez cardado todos los mapas se cargan las plantas
                            _environment.get('appVue').paintFloorsOnLoad();
                            //Una vez cargadas las plantas se cargan los beacons
                            _environment.get('appVue').paintBeaconsOnLoad();


                            _environment.get('modulePagination').login();
                            //
                            //_environment.get('modulePagination').showPage('#pageManagementBuildings');
                        });
                    });
                });
            });
        });
    }

    //ENABLE/DISABLE BUTTON LOGIN
    $( document ).ready(function() {
        $('#inputEmail,#inputPassword').bind("change paste keyup", function () {
            var email=$('#inputEmail').val();
            var pass=$('#inputPassword').val();

            $('#alertError').addClass('hidden');

            if (validators.validateEmail(email) && pass.length != "") {
                $('#btnSubmitLogin').removeClass('disabled');
            } else {
                $('#btnSubmitLogin').addClass('disabled');
            }
        });
    });

    //Logout
    function logout_Public(){
        //console.log("logout_Public");
        //resetFormLogin();
        //_environment.get('modulePagination').logout();
       try{
           window.location.href = window.location.href;
       }catch (ex){
          console.log(ex)
       }

    }

    function resetFormLogin() {
        $('#inputEmail').val('');
        $('#inputPassword').val('');
    }


    return{
        login:login_Public,
        logout:logout_Public
    }
})(jQuery,environment);

environment.register('moduleLogin',moduleLogin);
