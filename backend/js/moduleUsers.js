var moduleUsers = (function ($,_environment) {
    var User = _environment.get('Parse').Object.extend("User");
    _environment.get('Parse').Object.registerSubclass('User', User);

    var queryUsers = new (_environment.get('Parse')).Query(User);
    var subscriptionUsers = queryUsers.subscribe();

    subscriptionUsers.on('create',  _environment.get('appVue').addUser);
    subscriptionUsers.on('update',  _environment.get('appVue').updateUser);
    subscriptionUsers.on('delete',  _environment.get('appVue').removeUser);

    function load_public(callback) {
        queryUsers.find({
            success: function (users) {
                for (var i = 0; i < users.length; i++) {
                    _environment.get('appVue').addUser(users[i]);
                }
                typeof (callback) == "function" && callback();
            },
            error: function (error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

    //----------------------------------------------------------------------------------------------------->
    //                                  MODAL CREATE USER                                                -->
    //----------------------------------------------------------------------------------------------------->
    function resetModalCreate(){
        _environment.get('appVue').modalCreateUser.inputName.value="";
        _environment.get('appVue').modalCreateUser.inputName.hasError="";
        _environment.get('appVue').modalCreateUser.inputName.msgError="";

        _environment.get('appVue').modalCreateUser.inputEmail.value="";
        _environment.get('appVue').modalCreateUser.inputEmail.hasError="";
        _environment.get('appVue').modalCreateUser.inputEmail.msgError="";

        _environment.get('appVue').modalCreateUser.inputPassword.value="";
        _environment.get('appVue').modalCreateUser.inputPassword.hasError="";
        _environment.get('appVue').modalCreateUser.inputPassword.msgError="";

        _environment.get('appVue').modalCreateUser.inputPasswordRepeat.value="";
        _environment.get('appVue').modalCreateUser.inputPasswordRepeat.hasError="";
        _environment.get('appVue').modalCreateUser.inputPasswordRepeat.msgError="";

        _environment.get('appVue').modalCreateUser.inputDepartment.value= _environment.get('appVue').departments[0].id;

        _environment.get('appVue').modalCreateUser.btnCreate.disabled="disabled";
    }

    function modalCreateOpen_Public(){
        resetModalCreate();
        $('#modal-createUser').modal();
    }
    function create_Public() {
        if(validators.user.modalCreate.isValid(appVue)) {
            var user = new Parse.User();
            user.set('name',  _environment.get('appVue').modalCreateUser.inputName.value);
            user.set('username',  _environment.get('appVue').modalCreateUser.inputEmail.value);
            user.set('departmentId',  _environment.get('appVue').modalCreateUser.inputDepartment.value);
            user.set('password',  _environment.get('appVue').modalCreateUser.inputPassword.value);

            user.signUp(null, {
                success: function (department) {
                    $('#modal-createUser').modal('hide');
                    _environment.get('moduleAlertsVisual').notificationSuccess('Usuario creado');
                },
                error: function (department, error) {
                    _environment.get('moduleAlertsVisual').notificationError(error.message);
                }
            });
        }
    }
    //----------------------------------------------------------------------------------------------------->
    //                                  MODAL EDIT USER                                                  -->
    //----------------------------------------------------------------------------------------------------->
    function modalEditReset(){
        _environment.get('appVue').modalEditUser.inputName.hasError="";
        _environment.get('appVue').modalEditUser.inputName.msgError="";

        _environment.get('appVue').modalEditUser.inputEmail.hasError="";
        _environment.get('appVue').modalEditUser.inputEmail.msgError="";

        _environment.get('appVue').modalEditUser.inputPassword.value="";
        _environment.get('appVue').modalEditUser.inputPassword.hasError="";
        _environment.get('appVue').modalEditUser.inputPassword.msgError="";

        _environment.get('appVue').modalEditUser.inputPasswordRepeat.value="";
        _environment.get('appVue').modalEditUser.inputPasswordRepeat.hasError="";
        _environment.get('appVue').modalEditUser.inputPasswordRepeat.msgError="";

        _environment.get('appVue').modalEditUser.btnSave.disabled="";
    }

    function modalEditSetValues() {
        _environment.get('appVue').modalEditUser.inputName.value= _environment.get('appVue').findUser(  _environment.get('appVue').modalEditUser.inputId.value).name;
        _environment.get('appVue').modalEditUser.inputEmail.value= _environment.get('appVue').findUser(  _environment.get('appVue').modalEditUser.inputId.value).username;
        _environment.get('appVue').modalEditUser.inputDepartment.value= _environment.get('appVue').findDepartmentOfUser(  _environment.get('appVue').modalEditUser.inputId.value).id;
    }

    function modalEditOpen_Public(userId){
        modalEditReset();
        _environment.get('appVue').modalEditUser.inputId.value=userId;
        modalEditSetValues();
        $('#modal-editUser').modal();
    }

    function edit_public() {
        if(validators.user.modalEdit.isValid( _environment.get('appVue'))) {
            Parse.Cloud.run("updateUser", {
                    objectId:  _environment.get('appVue').modalEditUser.inputId.value,
                    name:  _environment.get('appVue').modalEditUser.inputName.value,
                    username:  _environment.get('appVue').modalEditUser.inputEmail.value,
                    password:  _environment.get('appVue').modalEditUser.inputPassword.value,
                    departmentId:  _environment.get('appVue').modalEditUser.inputDepartment.value
                },
                {
                    success: function(successData){
                        $('#modal-editUser').modal('hide');
                        _environment.get('moduleAlertsVisual').notificationSuccess('Usuario editado');
                    },
                    error: function(error){
                        _environment.get('moduleAlertsVisual').notificationError(error.message,error.code);
                    }
                }
            );
        }
    }
    //----------------------------------------------------------------------------------------------------->
    //                                  MODAL DELETE USER                                                -->
    //----------------------------------------------------------------------------------------------------->
    function modalRemoveOpen_Public() {

    }

    return{
        load:load_public,
        modalCreateOpen:modalCreateOpen_Public,
        create:create_Public,
        modalEditOpen:modalEditOpen_Public,
        edit:edit_public,
        modalRemoveOpen:modalRemoveOpen_Public
    }

})(jQuery,environment);

environment.register('moduleUsers',moduleUsers);


















