var validators;
validators = {
    _appVue:null,
    validateEmail: function (email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
       return reg.test(email);
    },
    validateMac:function(mac){
        var regex = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2})+$/;
        return !regex.test(mac);
    },
    //----------------------------------------------------------------------------------------------------->
    //                                 DEPARTMENT                                                        -->
    // ---------------------------------------------------------------------------------------------------->
    department: {
        modalCreate:{
            isValidName: function () {
                if (validators._appVue.modalCreateDepartament.inputName.value === "") {
                    validators._appVue.modalCreateDepartament.inputName.hasError = "has-error";
                    validators._appVue.modalCreateDepartament.inputName.msgError = "El nombre no puede ser vacio";
                    return false;
                } else {
                    validators._appVue.modalCreateDepartament.inputName.hasError = "";
                    validators._appVue.modalCreateDepartament.inputName.msgError = "";
                    return true;
                }
            },
            isValid:function(){
                return validators.department.modalCreate.isValidName();
            },
            isEnableBtnCreate:function () {
                if (validators._appVue.modalCreateDepartament.inputName.value === "") {
                    validators._appVue.modalCreateDepartament.btnCreate.disabled = "disabled";
                }else{
                    validators._appVue.modalCreateDepartament.btnCreate.disabled = "";
                }
            }
        },
        modalEdit:{
            isValidName:function () {
                if (validators._appVue.modalEditDepartament.inputName.value === "") {
                    validators._appVue.modalEditDepartament.inputName.hasError = "has-error";
                    validators._appVue.modalEditDepartament.inputName.msgError = "El nombre no puede ser vacio";
                    return false;
                } else {
                    validators._appVue.modalEditDepartament.inputName.hasError = "";
                    validators._appVue.modalEditDepartament.inputName.msgError = "";
                    return true;
                }
            },
            isValid:function () {
               return this.isValidName();
            },
            isEnableBtnSave:function () {
                if (validators._appVue.modalEditDepartament.inputName.value === "") {
                    validators._appVue.modalEditDepartament.btnSave.disabled = "disabled";
                }else {
                    validators._appVue.modalEditDepartament.btnSave.disabled = "";
                }
            }
        }
    },

    //----------------------------------------------------------------------------------------------------->
    //                                 USERS                                                             -->
    // ---------------------------------------------------------------------------------------------------->
    user: {
        modalCreate: {
            isValidName: function (_appVue) {
                if (_appVue.modalCreateUser.inputName.value === "") {
                    _appVue.modalCreateUser.inputName.hasError = "has-error";
                    _appVue.modalCreateUser.inputName.msgError = "El nombre no puede ser vacio";
                    return false;
                } else {
                    _appVue.modalCreateUser.inputName.hasError = "";
                    _appVue.modalCreateUser.inputName.msgError = "";
                    return true;
                }
            },
            isValidEmail: function (_appVue) {
                if (!validators.validateEmail(_appVue.modalCreateUser.inputEmail.value)) {
                    _appVue.modalCreateUser.inputEmail.hasError = "has-error";
                    _appVue.modalCreateUser.inputEmail.msgError = "Email Invalido";
                    return false;
                } else {
                    _appVue.modalCreateUser.inputEmail.hasError = "";
                    _appVue.modalCreateUser.inputEmail.msgError = "";
                    return true;
                }
            },
            isValidPassword: function (_appVue) {
                if (_appVue.modalCreateUser.inputPassword.value != _appVue.modalCreateUser.inputPasswordRepeat.value || _appVue.modalCreateUser.inputPassword.value.length < 5 || appVue.modalCreateUser.inputPasswordRepeat.value.length < 5) {
                    _appVue.modalCreateUser.inputPassword.hasError = "has-error";
                    _appVue.modalCreateUser.inputPasswordRepeat.hasError = "has-error";

                    if (_appVue.modalCreateUser.inputPassword.value.length < 5) {
                        _appVue.modalCreateUser.inputPassword.msgError = "La contraseña deve tener al menos 5 caracteres";
                        _appVue.modalCreateUser.inputPasswordRepeat.msgError = "La contraseña deve tener al menos 5 caracteres";
                    } else {
                        _appVue.modalCreateUser.inputPassword.msgError = "Las contraseñas son distintas";
                        _appVue.modalCreateUser.inputPasswordRepeat.msgError = "Las contraseñas son distintas";
                    }
                    return false;
                } else {
                    _appVue.modalCreateUser.inputPassword.hasError = "";
                    _appVue.modalCreateUser.inputPassword.msgError = "";
                    _appVue.modalCreateUser.inputPasswordRepeat.hasError = "";
                    _appVue.modalCreateUser.inputPasswordRepeat.msgError = "";
                    return true;
                }
            },
            isValid: function (_appVue) {
                if (this.isValidName(_appVue) && this.isValidEmail(_appVue) && this.isValidPassword(_appVue)) {
                    return true;
                }
                return false;
            },
            isEnableBtnCreate: function (_appVue) {
                if (_appVue.modalCreateUser.inputName.value === ""
                    || !validators.validateEmail(_appVue.modalCreateUser.inputEmail.value)
                    || _appVue.modalCreateUser.inputPassword.value.length < 5
                    || _appVue.modalCreateUser.inputPassword.value != _appVue.modalCreateUser.inputPasswordRepeat.value) {
                    _appVue.modalCreateUser.btnCreate.disabled = "disabled";
                } else {
                    _appVue.modalCreateUser.btnCreate.disabled = "";
                }
            }
        },
        modalEdit: {
            isValidName: function (_appVue) {
                if (_appVue.modalEditUser.inputName.value === "") {
                    _appVue.modalEditUser.inputName.hasError = "has-error";
                    _appVue.modalEditUser.inputName.msgError = "El nombre no puede ser vacio";
                    return false;
                } else {
                    _appVue.modalEditUser.inputName.hasError = "";
                    _appVue.modalEditUser.inputName.msgError = "";
                    return true;
                }
            },
            isValidEmail: function (_appVue) {
                if (!validators.validateEmail(_appVue.modalEditUser.inputEmail.value)) {
                    _appVue.modalEditUser.inputEmail.hasError = "has-error";
                    _appVue.modalEditUser.inputEmail.msgError = "Email Invalido";
                    return false;
                } else {
                    _appVue.modalEditUser.inputEmail.hasError = "";
                    _appVue.modalEditUser.inputEmail.msgError = "";
                    return true;
                }
            },
            isValidPassword: function (_appVue) {
                if (_appVue.modalEditUser.inputPassword.value != "" || _appVue.modalEditUser.inputPasswordRepeat.value != "") {
                    if (_appVue.modalEditUser.inputPassword.value != _appVue.modalEditUser.inputPasswordRepeat.value || _appVue.modalEditUser.inputPassword.value.length < 5 || _appVue.modalEditUser.inputPasswordRepeat.value.length < 5) {
                        _appVue.modalEditUser.inputPassword.hasError = "has-error";
                        _appVue.modalEditUser.inputPasswordRepeat.hasError = "has-error";

                        if (_appVue.modalEditUser.inputPassword.value.length < 5) {
                            _appVue.modalEditUser.inputPassword.msgError = "La contraseña deve tener al menos 5 caracteres";
                            _appVue.modalEditUser.inputPasswordRepeat.msgError = "La contraseña deve tener al menos 5 caracteres";
                        } else {
                            _appVue.modalEditUser.inputPassword.msgError = "Las contraseñas son distintas";
                            _appVue.modalEditUser.inputPasswordRepeat.msgError = "Las contraseñas son distintas";
                        }
                        return false;
                    } else {
                        _appVue.modalEditUser.inputPassword.hasError = "";
                        _appVue.modalEditUser.inputPassword.msgError = "";
                        _appVue.modalEditUser.inputPasswordRepeat.hasError = "";
                        _appVue.modalEditUser.inputPasswordRepeat.msgError = "";
                        return true;
                    }
                } else {
                    _appVue.modalEditUser.inputPassword.hasError = "";
                    _appVue.modalEditUser.inputPassword.msgError = "";
                    _appVue.modalEditUser.inputPasswordRepeat.hasError = "";
                    _appVue.modalEditUser.inputPasswordRepeat.msgError = "";
                    return true;
                }
            },
            isValid: function (_appVue) {
                if (this.isValidName(_appVue) && this.isValidEmail(_appVue) && this.isValidPassword(_appVue)) {
                    return true;
                }
                return false;
            },
            isEnableBtnSave: function (_appVue) {
                if (_appVue.modalEditUser.inputName.value === ""
                    || !validators.validateEmail(_appVue.modalEditUser.inputEmail.value)
                    || (
                        //Comprobación de las contraseñas, si son diferente de "" tienen que ser validas
                        (_appVue.modalEditUser.inputPassword.value != "" || _appVue.modalEditUser.inputPasswordRepeat.value != "")
                        && (_appVue.modalEditUser.inputPassword.value.length < 5
                            || _appVue.modalEditUser.inputPassword.value != _appVue.modalEditUser.inputPasswordRepeat.value)
                    )
                ) {
                    _appVue.modalEditUser.btnSave.disabled = "disabled";
                } else {
                    _appVue.modalEditUser.btnSave.disabled = "";
                }
            }
        },
    },
    beacon:{
        modalEdit:{
            isValidMac:function () {
                if(validators.validateMac($('#modalEditBeaconInputMac').val())){
                    $('#modalEditBeaconInputMac').parent().addClass('has-error');
                    return true;
                }else{
                    $('#modalEditBeaconInputMac').parent().removeClass('has-error');
                    return false;
                }
            },
            isEnableBtnSave:function(){
                if(validators.validateMac($('#modalEditBeaconInputMac').val())){
                    $('#modalEditBeaconBtnSave').prop('disabled',true);
                    return false;
                }else{
                    $('#modalEditBeaconBtnSave').prop('disabled',false);
                    return true;
                }
            }
        }
    },
    building:{
        modalCreate:{
            isValidName:function(){
                if( validators._appVue.modalCreateBuilding.inputName.value != "" ){
                    validators._appVue.modalCreateBuilding.inputName.hasError="";
                    validators._appVue.modalCreateBuilding.inputName.msgError="";
                    return true;
                }else{
                    validators._appVue.modalCreateBuilding.inputName.hasError="has-error";
                    validators._appVue.modalCreateBuilding.inputName.msgError="El nombre no puede ser vacio";
                    return false;
                }
            },
            isValidImage:function(){
                if( document.getElementById("input-modalCreateBuildingImage").files.length == 1 ){
                    validators._appVue.modalCreateBuilding.inputImage.hasError="";
                    validators._appVue.modalCreateBuilding.inputImage.msgError="";
                    return true;
                }else{
                    validators._appVue.modalCreateBuilding.inputImage.hasError="has-error";
                    validators._appVue.modalCreateBuilding.inputImage.msgError="Imagen Invalida";
                    return false;
                }
            },
            isValid:function(){
                return validators.building.modalCreate.isValidName() && validators.building.modalCreate.isValidImage() ;
            },
            isEnableBtnCreate:function () {
                if( validators._appVue.modalCreateBuilding.inputName.value != "" && document.getElementById("input-modalCreateBuildingImage").files.length == 1 ){
                    validators._appVue.modalCreateBuilding.btnCreate.disabled="";
                }else{
                    validators._appVue.modalCreateBuilding.btnCreate.disabled="disabled";
                }
            }
        },
        modalEdit:{
            isValidName:function(){
                if( validators._appVue.modalEditBuilding.inputName.value != "" ){
                    validators._appVue.modalEditBuilding.inputName.hasError="";
                    validators._appVue.modalEditBuilding.inputName.msgError="";
                    return true;
                }else{
                    validators._appVue.modalEditBuilding.inputName.hasError="has-error";
                    validators._appVue.modalEditBuilding.inputName.msgError="El nombre no puede ser vacio";
                    return false;
                }
            },
            isValid:function(){
                return validators.building.modalEdit.isValidName();
            },
            isEnableBtnEdit:function () {
                if( validators._appVue.modalEditBuilding.inputName.value != ""){
                    validators._appVue.modalEditBuilding.btnSave.disabled="";
                    validators._appVue.modalEditBuilding.btnSave.disabled="";
                }else{
                    validators._appVue.modalEditBuilding.btnSave.disabled="disabled";
                }
            }
        }
    },
    floor:{
        modalCreate:{
            isValidImage:function(){
                if( document.getElementById("input-modalCreateFloorImage").files.length == 1 ){
                    validators._appVue.modalCreateFloor.inputImage.hasError="";
                    validators._appVue.modalCreateFloor.inputImage.msgError="";
                    return true;
                }else{
                    validators._appVue.modalCreateFloor.inputImage.hasError="has-error";
                    validators._appVue.modalCreateFloor.inputImage.msgError="Imagen Invalida";
                    return false;
                }
            },
            isValid:function(){
                return validators.floor.modalCreate.isValidImage() ;
            },
            isEnableBtnCreate:function () {
                if(document.getElementById("input-modalCreateBuildingImage").files.length == 1 ){
                    validators._appVue.modalCreateFloor.btnCreate.disabled="";
                }else{
                    validators._appVue.modalCreateFloor.btnCreate.disabled="disabled";
                }
            }
        },
        modalEditImage:{
            isValidImage:function(){
                if( document.getElementById("input-modalEditImageFloorImage").files.length == 1 ){
                    validators._appVue.modalEditImageFloor.inputImage.hasError="";
                    validators._appVue.modalEditImageFloor.inputImage.msgError="";
                    return true;
                }else{
                    validators._appVue.modalEditImageFloor.inputImage.hasError="has-error";
                    validators._appVue.modalEditImageFloor.inputImage.msgError="Imagen Invalida";
                    return false;
                }
            },
            isValid:function(){
                return validators.floor.modalEditImage.isValidImage() ;
            },
            isEnableBtnCreate:function () {
                if(document.getElementById("input-modalEditImageFloorImage").files.length == 1 ){
                    validators._appVue.modalEditImageFloor.btnEdit.disabled="";
                }else{
                    validators._appVue.modalEditImageFloor.btnEdit.disabled="disabled";
                }
            }

        }

    }
};

environment.register('validators', validators);
