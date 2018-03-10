var moduleAlertsVisual=(function (_environment) {
    function alertOperationSuccess_Public(text){
        toastr.success(text);
    }

    function alertOperationDanger_Public(text){
        toastr.warning(text);
    }

    function alertOperationError_Public(text, code){
        if(code==119){
            toastr.error("Usuario sin permisos para la operacion");
            _environment.get('moduleLogin').logout();
        }else{
            toastr.error(text);
        }
    }

    return{
        notificationSuccess:alertOperationSuccess_Public,
        notificationWarning:alertOperationDanger_Public,
        notificationError:alertOperationError_Public
    }
})(environment);

environment.register('moduleAlertsVisual', moduleAlertsVisual);