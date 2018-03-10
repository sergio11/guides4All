var moduleBuildings = (function ($, _environment) {

    var Building = _environment.get('Parse').Object.extend("Building");
    _environment.get('Parse').Object.registerSubclass('Building', Building);

    var queryBuildings = new (_environment.get('Parse')).Query(Building);
    queryBuildings.limit(100000);

    var subscriptionBuildings = queryBuildings.subscribe();

    subscriptionBuildings.on('create', _environment.get('appVue').addBuilding);
    subscriptionBuildings.on('update', _environment.get('appVue').updateBuilding);
    subscriptionBuildings.on('delete', _environment.get('appVue').removeBuilding);

    //Floors
    var Floor = _environment.get('Parse').Object.extend("Floor");
    _environment.get('Parse').Object.registerSubclass('Floor', Floor);

    var queryFloors = new (_environment.get('Parse')).Query(Floor);
    queryFloors.limit(100000);

    var subscriptionFloors = queryFloors.subscribe();
    subscriptionFloors.on('create', _environment.get('appVue').addFloor);
    subscriptionFloors.on('update', _environment.get('appVue').updateFloor);
    subscriptionFloors.on('delete', _environment.get('appVue').removeFloor);

    function load_Public(callback) {
        _environment.get('appVue').buildingsMapLoad();

        queryBuildings.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    _environment.get('appVue').addBuilding(results[i]);
                }

                queryFloors.find({
                    success: function (results) {
                        for (var i = 0; i < results.length; i++) {
                            _environment.get('appVue').addFloorLoad(results[i]);
                        }
                        typeof (callback) == "function" && callback();
                    },
                    error: function (error) {
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });
            },
            error: function (error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });


    }

    //Modal create building
    function openModalCreateBuilding_Public(event) {
        _environment.get('appVue').modalCreateBuilding.inputLat = event.latlng.lat;
        _environment.get('appVue').modalCreateBuilding.inputLng = event.latlng.lng;
        _environment.get('appVue').modalCreateBuilding.inputName.value = "";
        _environment.get('appVue').modalCreateBuilding.inputFloor.value = 0;
        $('#input-modalCreateBuildingImage').val('');

        $('#modal-createBuilding').modal();
    }

    function modalCreateBuildingFloorUp_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        _environment.get('appVue').modalCreateBuilding.inputFloor.value++;

    }

    function modalCreateBuildingFloorDown_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        _environment.get('appVue').modalCreateBuilding.inputFloor.value--;
    }

    function create_Public(event) {
        if (!validators.building.modalCreate.isValid()) {
            return;
        }
        //Create Building
        var newBuilding = new Building();
        newBuilding.set('name', _environment.get('appVue').modalCreateBuilding.inputName.value);
        newBuilding.save(null, {
            success: function (buildingSaved) {
                //Crear la planta 0

                //Subir la imagen
                var fileUploadControl = $("#input-modalCreateBuildingImage")[0];
                if (fileUploadControl.files.length > 0) {
                    var file = fileUploadControl.files[0];
                    var name = "photo.jpg";
                }
                var parseFile = new Parse.File(name, file);
                parseFile.save().then(function () {
                    // The file has been saved to Parse.
                }, function (error) {
                    _environment.get('moduleAlertsVisual').notificationError(error.message);

                });


                var newFloor = new Floor();
                newFloor.set("image", parseFile);
                newFloor.set("buildingId", buildingSaved.id);
                newFloor.set("floor", _environment.get('appVue').modalCreateBuilding.inputFloor.value);
                newFloor.set("lat1", _environment.get('appVue').modalCreateBuilding.inputLat);
                newFloor.set("lng1", _environment.get('appVue').modalCreateBuilding.inputLng);

                newFloor.set("lat2", _environment.get('appVue').modalCreateBuilding.inputLat);
                newFloor.set("lng2", _environment.get('appVue').modalCreateBuilding.inputLng + 0.001);

                newFloor.set("lat3", _environment.get('appVue').modalCreateBuilding.inputLat - 0.001);
                newFloor.set("lng3", _environment.get('appVue').modalCreateBuilding.inputLng);

                newFloor.save(null, {
                    success: function (floorSaved) {
                        _environment.get('moduleAlertsVisual').notificationSuccess('Edificio y Planta creada');
                        $('#modal-createBuilding').modal('hide');
                    },
                    error: function (market, error) {
                        _environment.get('moduleAlertsVisual').notificationError(error.message);
                    }
                });

            },
            error: function (market, error) {
                _environment.get('moduleAlertsVisual').notificationError(error.message);
            }
        })
    }

    //Modal Edit Building
    function openModalEditBuilding_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        //Si no esta seleccionado un edificio
        _environment.get('appVue').modalEditBuilding.inputName.value = _environment.get('appVue').mapBuildings.currentBuildingName;
        _environment.get('appVue').modalEditBuilding.inputId.value = _environment.get('appVue').mapBuildings.currentBuildindId;
        if (_environment.get('appVue').mapBuildings.currentBuildindId == "") {
            _environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
            return;
        }
        _environment.get('appVue').modalCreateFloor.inputFloor.value = Number(_environment.get('appVue').mapBuildings.currentFloor) + 1;
        $('#modal-editBuilding').modal();
    }

    function edit_Public() {
        if (validators.building.modalEdit.isValid()) {
            var buildingId = _environment.get('appVue').modalEditBuilding.inputId.value;
            queryBuildings.get(buildingId, {
                success: function (building) {
                    building.set('name', _environment.get('appVue').modalEditBuilding.inputName.value);
                    building.save(null, {
                        success: function (successData) {
                            $('#modal-editBuilding').modal('hide');
                            _environment.get('moduleAlertsVisual').notificationSuccess('Nombre de edificio editado');

                        },
                        error: function (error) {
                            _environment.get('moduleAlertsVisual').notificationError(error.message);
                        }
                    });
                },
                error: function (building, error) {
                    console.log(error.toString());
                }
            });
        }
    }

    //Modal remove Building
    function openModalRemoveBuilding_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        if (_environment.get('appVue').mapBuildings.currentBuildindId == "") {
            _environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
            return;
        }
        //Si no esta seleccionado un edificio
        _environment.get('appVue').modalDeleteBuilding.buildingName = _environment.get('appVue').mapBuildings.currentBuildingName;
        _environment.get('appVue').modalDeleteBuilding.buildingId = _environment.get('appVue').mapBuildings.currentBuildindId;
        $('#modal-removeBuilding').modal();
    }

    function remove_Public() {
        var buildingId = _environment.get('appVue').modalDeleteBuilding.buildingId;

        Parse.Cloud.run("deleteBuilding", {
                objectId: buildingId,
            },
            {
                success: function () {
                    $('#modal-removeBuilding').modal('hide');
                    _environment.get('moduleAlertsVisual').notificationWarning('Edificio eliminado');
                },
                error: function (error) {
                    console.log("error", error);
                    _environment.get('moduleAlertsVisual').notificationError(error.message, error.code);
                }
            }
        );
    }

    //Modal create floor
    function openModalCreateFloor_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        //Si no esta seleccionado un edificio
        if (_environment.get('appVue').mapBuildings.currentBuildindId == "") {
            _environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
            return;
        }
        _environment.get('appVue').modalCreateFloor.inputFloor.value = Number(_environment.get('appVue').mapBuildings.currentFloor) + 1;
        $('#modal-createFloor').modal();
    }

    function modalCreateFloorFloorUp_Public() {
        _environment.get('appVue').modalCreateFloor.inputFloor.value++;
    }

    function modalCreateFloorFloorDown_Public() {
        _environment.get('appVue').modalCreateFloor.inputFloor.value--;
    }

    //Modal Edit image
    function openModalEditImageFloor_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        if (_environment.get('appVue').mapBuildings.currentBuildindId == "") {
            _environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
            return;
        }
        var currentFloor = _environment.get('appVue').mapBuildings.currentFloor;
        var buildingId = _environment.get('appVue').mapBuildings.currentBuildindId;
        var currentFloorId = _environment.get('appVue').getFloorFromBuildingIdAndNumFloor(buildingId, currentFloor).id;
        console.log("floorID" + currentFloorId);
        _environment.get('appVue').modalEditImageFloor.floorId = currentFloorId;
        $('#modal-editImageFloor').modal();
    }

    function saveImageFloor_Public() {

        if (validators.floor.modalEditImage.isValid()) {
            var floorID = _environment.get('appVue').modalEditImageFloor.floorId;
            console.log("floorID2" + floorID);
            queryFloors.get(floorID, {
                success: function (floor) {
                    //Subir la imagen
                    var fileUploadControl = $("#input-modalEditImageFloorImage")[0];
                    if (fileUploadControl.files.length > 0) {
                        var file = fileUploadControl.files[0];
                        var name = "photo.jpg";
                    }
                    var parseFile = new Parse.File(name, file);
                    parseFile.save().then(function () {
                        // The file has been saved to Parse.
                    }, function (error) {
                        _environment.get('moduleAlertsVisual').notificationError(error.message);

                    });

                    floor.set("image", parseFile);
                    floor.save(null, {
                        success: function (floorSaved) {
                            _environment.get('moduleAlertsVisual').notificationSuccess('Planta editada');
                            $('#modal-editImageFloor').modal('hide');
                        },
                        error: function (market, error) {
                            _environment.get('moduleAlertsVisual').notificationError(error.message);
                        }
                    });

                },
                error: function (floor, error) {
                    _environment.get('moduleAlertsVisual').notificationError(error.message, error.code);
                }
            })

        }
    }

    //Edit corner floor
    function floorCornerEdit_Public() {
        //Si no esta seleccionado un edificio
        if (_environment.get('appVue').mapBuildings.currentBuildindId == "") {
            _environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
            return;
        }
        var currentFloor = _environment.get('appVue').getFloorFromBuildingIdAndNumFloor(_environment.get('appVue').mapBuildings.currentBuildindId, _environment.get('appVue').mapBuildings.currentFloor);
        _environment.get('appVue').addMarkersEditFloor(currentFloor);
    }

    function floorCornerDrag_Public(event) {
        var currentFloor = _environment.get('appVue').getFloorFromBuildingIdAndNumFloor(_environment.get('appVue').mapBuildings.currentBuildindId, _environment.get('appVue').mapBuildings.currentFloor);

        var markerCorner = event.target;
        var position = event.target.getLatLng();
        _environment.get('appVue').updateEditFloor(currentFloor, markerCorner.number, position.lat, position.lng);
    }

    function floorCornerDragEnd_Public(event) {
        var markerCorner = event.target;
        var position = event.target.getLatLng();

        queryFloors.get(markerCorner.idFloor, {
            success: function (floorUpdate) {
                floorUpdate.set('lat' + markerCorner.number, position.lat);
                floorUpdate.set('lng' + markerCorner.number, position.lng);
                floorUpdate.save(null, {
                    success: function (floorSaved) {
                        _environment.get('moduleAlertsVisual').notificationSuccess('Esquina Movida');
                    },
                    error: function (floor, error) {
                        _environment.get('moduleAlertsVisual').notificationError("123" + error.message, error.code);
                    }
                });
            },
            error: function (marker, error) {
                _environment.get('moduleAlertsVisual').notificationError("123" + error.message, error.code);
            }
        });
    }

    //select building
    function selectBuilding_Public(event) {
        L.DomEvent.stop(event);
        var floor = event.target;
        _environment.get('appVue').removeMarkersEditFloor();
        _environment.get('appVue').mapBuildings.currentBuildindId = floor.buildingId;
        _environment.get('appVue').mapBuildings.currentFloor = floor.floor;
        _environment.get('appVue').mapBuildings.currentBuildingName = _environment.get('appVue').getBuilding(floor.buildingId).name;
    }

    function floorUp_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        _environment.get('appVue').floorUp(_environment.get('appVue').mapBuildings);
    }

    function floorDown_Public() {
        _environment.get('appVue').removeMarkersEditFloor();
        _environment.get('appVue').floorDown(_environment.get('appVue').mapBuildings);
    }

    function openModalRemoveFloor_Public() {
        //Si no esta seleccionado un edificio
        _environment.get('appVue').removeMarkersEditFloor();
        if (_environment.get('appVue').mapBuildings.currentBuildindId == "") {
            _environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
            return;
        }

        _environment.get('appVue').modalDeleteFloor.buildingName = _environment.get('appVue').mapBuildings.currentBuildingName;
        _environment.get('appVue').modalDeleteFloor.floor = _environment.get('appVue').mapBuildings.currentFloor;
        $('#modal-removeFloor').modal();
    }

    function removeFloor_Public() {
        var currentFloor = _environment.get('appVue').getFloorFromBuildingIdAndNumFloor(_environment.get('appVue').mapBuildings.currentBuildindId, _environment.get('appVue').mapBuildings.currentFloor);

        queryFloors.get(currentFloor.id, {
            success: function (floorRemove) {
                floorRemove.destroy({
                    success: function (floorRemove) {
                        $('#modal-removeFloor').modal('hide');
                        _environment.get('moduleAlertsVisual').notificationWarning('Planta eliminada');
                    },
                    error: function (error) {
                        console.log(error);
                        _environment.get('moduleAlertsVisual').notificationError(error.message, error.code);
                    }
                });
            }
        });
    }

    function createFloor_Public() {
        if (!validators.floor.modalCreate.isValid()) {
            return;
        }

        //UPLOAD FILE
        var fileUploadControl = $("#input-modalCreateFloorImage")[0];
        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            var name = "photo.jpg";
        }
        var parseFile = new Parse.File(name, file);
        parseFile.save().then(function () {
            // The file has been saved to Parse.
        }, function (error) {
            _environment.get('moduleAlertsVisual').notificationError(error.message);

        });

        var buildingId = _environment.get('appVue').mapBuildings.currentBuildindId;
        var building = _environment.get('appVue').getBuilding(buildingId);
        var firstFloor = _environment.get('appVue').getFirstFloor(building);

        //CREATE THE FLOOR
        var newFloor = new Floor();
        newFloor.set("image", parseFile);
        newFloor.set("buildingId", buildingId);
        newFloor.set("floor", _environment.get('appVue').modalCreateFloor.inputFloor.value);


        newFloor.set("lat1", firstFloor.lat1);
        newFloor.set("lng1", firstFloor.lng1);

        newFloor.set("lat2", firstFloor.lat2);
        newFloor.set("lng2", firstFloor.lng2);

        newFloor.set("lat3", firstFloor.lat3);
        newFloor.set("lng3", firstFloor.lng3);

        newFloor.save(null, {
            success: function (floorSaved) {
                _environment.get('moduleAlertsVisual').notificationSuccess('Planta creada');
                $('#modal-createFloor').modal('hide');
            },
            error: function (market, error) {
                _environment.get('moduleAlertsVisual').notificationError(error.message);
            }
        });

    }

    return {
        load: load_Public,
        floorUp: floorUp_Public,
        floorDown: floorDown_Public,

        openModalCreateBuilding: openModalCreateBuilding_Public,
        modalCreateBuildingFloorUp: modalCreateBuildingFloorUp_Public,
        modalCreateBuildingFloorDown: modalCreateBuildingFloorDown_Public,
        create: create_Public,

        openModalEditBuilding: openModalEditBuilding_Public,
        edit: edit_Public,

        openModalRemoveBuilding: openModalRemoveBuilding_Public,
        remove: remove_Public,

        floorCornerEdit: floorCornerEdit_Public,
        floorCornerDrag: floorCornerDrag_Public,
        floorCornerDragEnd: floorCornerDragEnd_Public,

        openModalCreateFloor: openModalCreateFloor_Public,
        createFloor: createFloor_Public,

        openModalRemoveFloor: openModalRemoveFloor_Public,
        removeFloor: removeFloor_Public,
        modalCreateFloorFloorUp: modalCreateFloorFloorUp_Public,
        modalCreateFloorFloorDown: modalCreateFloorFloorDown_Public,

        openModalEditImageFloor: openModalEditImageFloor_Public,
        editImageFloor: saveImageFloor_Public
    }

})(jQuery, environment);
environment.register('moduleBuildings', moduleBuildings);

