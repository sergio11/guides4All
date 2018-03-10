Parse.serverURL = 'http://localhost:1339/parse';
var queryDepartment = new Parse.Query("Department");
queryDepartment.limit(100000);

var queryUser = new Parse.Query(Parse.User);
queryUser.limit(100000);

var querryFloor = new Parse.Query("Floor");
querryFloor.limit(100000);

var querryBuilding = new Parse.Query("Building");
querryBuilding.limit(100000);

var queryBeacons = new Parse.Query("Beacon");
queryBeacons.limit(100000);

var Position = Parse.Object.extend("Position");
Parse.Object.registerSubclass('Position', Position);
var queryPosition = new Parse.Query("Position");
queryPosition.limit(100000);

var LastPosition = Parse.Object.extend("LastPosition");
Parse.Object.registerSubclass('LastPosition', LastPosition);
var queryLastPosition = new Parse.Query("LastPosition");
queryLastPosition.limit(100000);

//var logger = require('parse-server').logger;

//Regla departamentos con distinto nombre
Parse.Cloud.beforeSave("Department", function (request, response) {
    queryDepartment.equalTo("name", request.object.get("name"));
    queryDepartment.find({
        useMasterKey: true,
        success: function (departaments) {
            if (departaments.length > 0) {
                response.error("Ya existe un departamento con este nombre");
            } else {
                response.success("OK");
            }
        }, error: function (error) {
            response.error("Error query", error.toString());
        }
    });
});

//Regla departamentos, no eliminar departamentos que contengan usuarios
Parse.Cloud.beforeDelete("Department", function (request, response) {
    queryUser.equalTo("departmentId", request.object.id);
    queryUser.find({
        useMasterKey: true,
        success: function (users) {
            if (users.length > 0) {
                response.error("El departamento contiene usuarios");
            } else {
                response.success("OK");
            }
        }, error: function (error) {
            response.error("Error query", error.toString());
        }
    });
});


//Regla actualizar datos usuario
Parse.Cloud.define("updateUser", function (request, response) {
    request.log.info("Cloudfunction updateUser info");
    request.log.error("CloudFunction updateUser");
    queryUser.equalTo("objectId", request.params.objectId);
    queryUser.first({
        useMasterKey: true,
        success: function (object) {
            object.set("name", request.params.name);
            object.set("username", request.params.username);
            object.set("departmentId", request.params.departmentId);

            if (request.params.password != "") {
                object.set("password", request.params.password);
            }
            object.save(null, {
                useMasterKey: true,
                success: function (objectSaved) {
                    response.success("OK");
                },
                error: function (error) {
                    response.error(error.message);
                }
            });
        },
        error: function (error) {
            response.error(error.message);
        }
    });
});

//Regla Beacons diferente mac
Parse.Cloud.beforeSave("Beacon", function (request, response) {
    if (request.object.isNew()) {
        response.success("OK");
    } else {
        if (request.object.get("mac") == "") {
            response.success();
        }
        queryBeacons.equalTo("mac", request.object.get("mac"));
        queryBeacons.notEqualTo("objectId", request.object.id);
        queryBeacons.find({
            useMasterKey: true,
            success: function (beacons) {
                if (beacons.length == 0) {
                    response.success();
                } else {
                    response.error("Ya existe una baliza con la misma mac");
                }
            },
            error: function (beacon, error) {
                response.error(error.toString());
            }
        });
    }

});

//Regla no crear plantas en el mismo edificio con el mismo numero
Parse.Cloud.beforeSave("Floor", function (request, response) {
    if (request.object.isNew()) {
        querryFloor.equalTo("buildingId", request.object.get("buildingId"));
        querryFloor.equalTo("floor", request.object.get("floor"));
        querryFloor.find({
            useMasterKey: true,
            success: function (beacons) {
                if (beacons.length == 0) {
                    response.success();
                } else {
                    response.error("Ya existe una planta con el mismo creada");
                }
            },
            error: function (beacon, error) {
                response.error(error.toString());
            }
        });
    } else {
        response.success();
    }
});

//Borrar las balizas de esa planta y edificio si es la unica planta
Parse.Cloud.afterDelete("Floor", function (request) {
    //Borrar balizas
    queryBeacons.equalTo("floorId", request.object.id);
    queryBeacons.find({
        useMasterKey: true,
        success: function (beacons) {
            for (var i = 0; i < beacons.length; i++) {
                beacons[i].destroy({
                    useMasterKey: true,
                    success: function (myObject) {
                        //Se ha boorado las balizas
                    },
                    error: function (myObject, error) {
                        console.error(error.toString());
                    }
                });
            }
        },
        error: function (myObject, error) {
            console.error(error.toString());
        }
    });
    //Boorar el edifico si es la ultima planta
    querryFloor.equalTo("buildingId", request.object.get("buildingId"));
    querryFloor.find({
        useMasterKey: true,
        success: function (floors) {
            if (floors.length == 0) {
                //Solo hay la planta que se está boorando se boora el edificio
                querryBuilding.equalTo("objectId", request.object.get("buildingId"));
                querryBuilding.find({
                    useMasterKey: true,
                    success: function (buildings) {
                        buildings[0].destroy({
                            useMasterKey: true,
                            success: function (myObject) {
                                //Se ha boorado el edificio
                            },
                            error: function (myObject, error) {
                                console.error(error.toString());
                            }
                        });
                    },
                    error: function (building, error) {
                        console.error(error.toString());
                    }
                });
            } else {

            }
        },
        error: function (beacon, error) {
            console.error(error.toString());
        }
    });
});

Parse.Cloud.define('deleteBuilding', function (request, response) {
    var buildingId = request.params.objectId;
    querryFloor.equalTo("buildingId", buildingId);
    querryFloor.find({
        useMasterKey: true,
        success: function (floors) {
            var arrayPromise = [];
            for (var i = 0; i < floors.length; i++) {
                arrayPromise.push(new Promise(function (resolve, reject) {
                    floors[i].destroy({
                        useMasterKey: true,
                        success: resolve,
                        error: reject
                    })
                }))
            }
            Promise.all(arrayPromise).then(function (data) {
                //El edificio se borra solo al boorar la ultima planta
                response.success('OK');
            }).fail(function () {
                response.error("Error borrando plantas");
            });

        }
    });
});

function addPositionBeacon(userId, mac, timeStamp,request) {
    request.log.error("CloudFunction addPositionBeacon"+ mac);
    try {
        queryBeacons.equalTo("mac", mac);
        queryBeacons.find({
            success: function (beacons) {
                request.log.error("Num Beacons"+ beacons.length);
                if (beacons.length === 1) {
                    request.log.error("Se almacena position");

                       var position = new Position();
                       position.set("position", beacons[0].get("xy"));
                       position.set("floorId", beacons[0].get("floorId"));
                       position.set("timestamp", Number(timestamp));
                       position.set("beacon", true);
                       position.set("userId", userId);
                       position.save();
                   

                    request.log.error("Se ha almacenado la posicion");
                    //Add / edit to last positions
                    queryLastPosition.equalTo("userId", userId);
                    queryLastPosition.find({
                        success: function (lastPositions) {
                            request.log.error("Num Last Position"+ beacons.length);
                            if (lastPositions.length == 0) {
                                var lastPosition = new LastPosition();
                                lastPosition.set("position", beacons[0].get("xy"));
                                lastPosition.set("floorId", beacons[0].get("floorId"));
                                lastPosition.set("timeStamp", Number(timeStamp));
                                lastPosition.set("beacon", true);
                                lastPosition.set("userId", userId);
                                lastPosition.save();
                            } else {
                                lastPositions[0].set("position", beacons[0].get("xy"));
                                lastPositions[0].set("floorId", beacons[0].get("floorId"));
                                lastPositions[0].set("timeStamp", Number(timeStamp));
                                lastPositions[0].set("beacon", true);
                                lastPositions[0].save();
                            }
                        }
                    });

                } else {
                    //No se ha encontrado el beacon con esa mac,
                }
            }
        });
    } catch (ex) {
        return ex;
    }
    return "OK"
}

function addPositionGps(userId, lat, lng, timeStamp) {

    var position = new Position();
    position.set("position", new Parse.GeoPoint({latitude: lat, longitude: lng}));
    position.set("floorId", "");
    position.set("timestamp", Number(timeStamp));
    position.set("userId", userId);
    position.set("beacon", false);
    position.save();

    //Add / edit to last positions
    queryLastPosition.equalTo("userId", userId);
    queryLastPosition.find({
        success: function (lastPositions) {
            if (lastPositions.length == 0) {
                var lastPosition = new LastPosition();
                lastPosition.set("position", new Parse.GeoPoint({latitude: lat, longitude: lng}));
                lastPosition.set("floorId", "");
                lastPosition.set("timeStamp", Number(timeStamp));
                lastPosition.set("userId", userId);
                lastPosition.set("beacon", false);
                lastPosition.save();
            } else {
                lastPositions[0].set("position", new Parse.GeoPoint({latitude: lat, longitude: lng}));
                lastPositions[0].set("floorId", "");
                lastPositions[0].set("timeStamp", Number(timeStamp));
                lastPositions[0].set("beacon", false);
                lastPositions[0].save();
            }
        }
    });
}

Parse.Cloud.define("position", function (request, response) {
    try {
        var numParams = Object.keys(request.params).length;
        request.log.error("CloudFunction position:" + numParams);
        if (numParams == 3) {//BLE -> ID MAC TIME
            request.log.error("CloudFunction Add Beacon");
            return addPositionBeacon("Hw8hWyzfEV", request.params.mac, request.params.timestamp,request);
            response.success("OK");
        } else if (numParams == 4) {//GPS -> ID Longitud Latitud time
            addPositionGps("Hw8hWyzfEV", request.params.lat, request.params.lng, request.params.timestamp);
            response.success("OK");
        } else {
            response.error("Error: Num params not valid NumParams:" + numParams);
        }
    } catch (ex) {
        request.log.error(ex);
    }
});

Parse.Cloud.define("positions", function (request, response) {
    request.log.error("CloudFunction positions");
    try {
        for (i = 0; i < Object.keys(request.params).length; i++) {
            addPosition(request.params["object_" + i], request);
        }
        response.success("OK");
    } catch (ex) {
        request.log.error(ex);
        response.success(ex);
    }
});

function addPosition(_positionAdd, request) {
    var numParams = Object.keys(_positionAdd).length;
    if (numParams == 3) {//BLE -> ID MAC TIMErequest.log.error("CloudFunction Add Beacon");
        request.log.error("CloudFunction Beacon");
        addPositionBeacon("Hw8hWyzfEV", _positionAdd.mac, _positionAdd.timestamp);
    } else if (numParams == 4) {//GPS -> ID Longitud Latitud time
        addPositionGps("Hw8hWyzfEV", _positionAdd.lat, _positionAdd.lng, _positionAdd.timestamp);
    } else {
        //Invalid Num Params
    }
    return "addPosition";
}