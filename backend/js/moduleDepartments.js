var moduleDepartments = (function ($,_environment) {
    var Department = _environment.get('Parse').Object.extend("Department");
    _environment.get('Parse').Object.registerSubclass('Department', Department);

    var queryDepartments = new  (_environment.get('Parse')).Query(Department);
    var subscriptionDepartments = queryDepartments.subscribe();

    subscriptionDepartments.on('create', _environment.get('appVue').addDepartment);
    subscriptionDepartments.on('update', _environment.get('appVue').updateDepartment);
    subscriptionDepartments.on('delete', _environment.get('appVue').removeDepartment);

    function load_Public(callback) {
        queryDepartments.find({
            success: function (departments) {
                for (var i = 0; i < departments.length; i++) {
                    _environment.get('appVue').addDepartment(departments[i]);
                }
                typeof (callback) == "function" && callback();
            },
            error: function (error) {
                _environment.get('moduleAlertsVisual').notificationError("Error cargando los departamentos:"+ error.message,error.code);
            }
        });
    }

    //----------------------------------------------------------------------------------------------------->
    //                                  MODAL CREATE DEPARTMENT                                          -->
    //----------------------------------------------------------------------------------------------------->
    function modalCreateReset(){
        _environment.get('appVue').modalCreateDepartament.inputName.value="";
        _environment.get('appVue').modalCreateDepartament.inputName.hasError="";
        _environment.get('appVue').modalCreateDepartament.inputName.msgError="";
        _environment.get('appVue').modalCreateDepartament.btnCreate.disabled="disabled";
    }

    function ModalCreateOpen_Public(){
        modalCreateReset();
        $('#modal-createDepartment').modal();
    }

    function create_Public() {
        if(validators.department.modalCreate.isValid()) {
            var department = new Department();
            department.set('name', _environment.get('appVue').modalCreateDepartament.inputName.value);
            department.save(null, {
                success: function (department) {
                    $('#modal-createDepartment').modal('hide');
                    _environment.get('moduleAlertsVisual').notificationSuccess('Departamento creado');
                },
                error: function (department, error) {
                    console.log(error);
                    _environment.get('moduleAlertsVisual').notificationError(error.message);
                }
            });
        }
    }

    //----------------------------------------------------------------------------------------------------->
    //                                  MODAL EDIT DEPARTMENT                                            -->
    //----------------------------------------------------------------------------------------------------->
    function modalEditReset(){
        _environment.get('appVue').modalEditDepartament.inputName.hasError="";
        _environment.get('appVue').modalEditDepartament.inputName.msgError="";
        _environment.get('appVue').modalEditDepartament.btnSave.disabled="";
    }

    function modalEditOpen_Public(id,name){
        modalEditReset();
        _environment.get('appVue').modalEditDepartament.inputId.value=id;
        _environment.get('appVue').modalEditDepartament.inputName.value=name;
        $('#modal-editDepartment').modal();
    }

    function edit_Public(){
        if(validators.department.modalEdit.isValid()){
            queryDepartments.get(_environment.get('appVue').modalEditDepartament.inputId.value, {
                success: function (currentDepartment) {
                    currentDepartment.set('name',_environment.get('appVue').modalEditDepartament.inputName.value);
                    currentDepartment.save(null,{
                        success: function(department) {
                            $('#modal-editDepartment').modal('hide');
                            _environment.get('moduleAlertsVisual').notificationSuccess('Departamento editado');
                        },
                        error:function (department,error) {
                            _environment.get('moduleAlertsVisual').notificationError(error.message);
                        }
                    });

                }
            });
        }
    }

    //----------------------------------------------------------------------------------------------------->
    //                                  MODAL REMOVE DEPARTMENT                                          -->
    //----------------------------------------------------------------------------------------------------->
    function modalRemove_Public(id,name){
        _environment.get('appVue').modalDeleteDepartament.id=id;
        _environment.get('appVue').modalDeleteDepartament.name=name;
        $('#modal-removeDepartment').modal();
    }

    function remove_Public() {
        queryDepartments.get(_environment.get('appVue').modalDeleteDepartament.id, {
            success: function (currentDepartment) {
                currentDepartment.destroy({
                    success: function(department) {
                        $('#modal-removeDepartment').modal('hide');
                        _environment.get('moduleAlertsVisual').notificationWarning('Departamento eliminado');
                    },
                    error: function(error) {
                        console.log(error);
                        _environment.get('moduleAlertsVisual').notificationError(error.message,error.code);
                    }
                });
            }
        });
    }

    return{
        load:load_Public,
        modalCreateOpen:ModalCreateOpen_Public,
        create:create_Public,
        openModalEdit:modalEditOpen_Public,
        edit:edit_Public,
        openModalRemove:modalRemove_Public,
        remove:remove_Public
    }

})(jQuery,environment);

environment.register('moduleDepartments',moduleDepartments);













