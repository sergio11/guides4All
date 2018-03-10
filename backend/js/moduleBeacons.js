var moduleBeacons = (function ($,_environment) {
    var Beacon = _environment.get('Parse').Object.extend("Beacon");
    _environment.get('Parse').Object.registerSubclass('Beacon', Beacon);

    var queryBeacons = new  (_environment.get('Parse')).Query(Beacon);
    queryBeacons.limit(100000);

    var subscriptionBeacons = queryBeacons.subscribe();

    subscriptionBeacons.on('create',_environment.get('appVue').addBeacon);
    subscriptionBeacons.on('update',_environment.get('appVue').updateBeacon);
    subscriptionBeacons.on('delete',_environment.get('appVue').removeBeacon);

    function load_Public(callback) {
        _environment.get('appVue').beaconMapLoad();

        queryBeacons.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    _environment.get('appVue').addBeaconOnLoad(results[i]);
                }
                typeof (callback) == "function" && callback();
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

    function create_public(event) {
        var beacon = new Beacon();

        beacon.set("xy",new Parse.GeoPoint(event.latlng.lat, event.latlng.lng));
        beacon.set("floorId","");
        beacon.set("mac","");
        beacon.set("url","");
        beacon.save(null, {
            success: function(beacon) {
                _environment.get('moduleAlertsVisual').notificationSuccess('Baliza creada');
            },
            error: function(beacon, error) {
                _environment.get('moduleAlertsVisual').notificationError(error.message,error.code);
            }
        });
    }

    function createInFloor_public(event){
        var floor=event.target;

        var beacon = new Beacon();
        beacon.set("floorId",floor.floorId);
        beacon.set("xy",new Parse.GeoPoint(event.latlng.lat, event.latlng.lng));
        beacon.set("mac","");
        beacon.set("url","");
        beacon.save(null, {
            success: function(beacon) {
                _environment.get('moduleAlertsVisual').notificationSuccess('Baliza creada');
            },
            error: function(beacon, error) {
                _environment.get('moduleAlertsVisual').notificationError(error.message,error.code);
            }
        });
    }

    function edit_Public(event){
        var marker=event.target;
        _environment.get('appVue').modalBeaconEdit.id=marker.id;
        var modal=  '<div class="row" style="width: 350px; padding: 5px;">                                                                          ' +
                    '   <h3>Baliza</h3>                                                                                                             ' +
                    '   <div class="form-group">                                                                                                    ' +
                    '      <label for="modalEditBeaconInputMac">Mac:</label>                                                                        ' +
                    '      <input class="form-control" id="modalEditBeaconInputMac" type="text" value="'+marker.mac+'">                             ' +
                    '   </div>                                                                                                                      ' +
                    '   <div class="form-group">                                                                                                    ' +
                    '      <label for="modalEditBeaconInputURL">URL:</label>                                                                        ' +
                    '      <input class="form-control" id="modalEditBeaconInputURL" type="text" value="'+marker.url+'">                             ' +
                    '   </div>                                                                                                                      ' +
                    '   <div class="clearfix" ></div>                                                                                               ' +
                    '   <button  class="btn btn-danger" onclick="moduleBeacons.remove()">Eliminar</button>                                          ' +
                    '   <button  class="btn btn-primary pull-right" onclick="moduleBeacons.save()" id="modalEditBeaconBtnSave">Guardar</button>     ' +
                    '</div>                                                                                                                         ';
        marker._popup.setContent(modal).openPopup();
        validators.beacon.modalEdit.isEnableBtnSave();

        $('#modalEditBeaconInputMac').bind("change paste keyup", function () {
            validators.beacon.modalEdit.isValidMac();
            validators.beacon.modalEdit.isEnableBtnSave();
        });
    }

    function move_Public(e) {
        var marker=e.target;
        var position = e.target.getLatLng();

        queryBeacons.get(marker.id,{
            success:function (markUpdate){
                markUpdate.set('xy',new Parse.GeoPoint(position.lat, position.lng));
                markUpdate.save(null,{
                    success: function (markSaved) {
                        _environment.get('moduleAlertsVisual').notificationSuccess('Baliza movida');
                    },
                    error:function (market, error) {
                        _environment.get('moduleAlertsVisual').notificationError(error.message);
                    }
                });
            },
            error:function (market, error) {
                console.log(error.toString());
            }
        });
    }

    function save_Public(){
        if(validators.beacon.modalEdit.isEnableBtnSave()) {
            queryBeacons.get(_environment.get('appVue').modalBeaconEdit.id, {
                success: function (markUpdate) {
                    markUpdate.set('mac', $('#modalEditBeaconInputMac').val());
                    markUpdate.set('url', $('#modalEditBeaconInputURL').val());
                    markUpdate.set('floor', Number($('#modalEditBeaconInputFloor').val()));
                    markUpdate.save(null, {
                        success: function (markSaved) {
                            _environment.get('moduleAlertsVisual').notificationSuccess('Baliza editada');
                        },
                        error: function (market, error) {
                            _environment.get('moduleAlertsVisual').notificationError(error.message);
                        }
                    });
                },
                error: function (market, error) {
                    console.log(error.toString());
                }
            });
        }
    }

    function remove_Public(){
        queryBeacons.get(_environment.get('appVue').modalBeaconEdit.id, {
            success: function (currentMarker) {
                currentMarker.destroy({
                    success: function(marker) {
                        _environment.get('moduleAlertsVisual').notificationWarning('Baliza eliminada');
                    },
                    error: function(error) {
                        _environment.get('moduleAlertsVisual').notificationError(error.message,error.code);
                    }
                });
            }
        });
    }


    function editFloorDown_Public(){
        $('#modalEditBeaconInputFloor').val(Number($('#modalEditBeaconInputFloor').val())-1);
    }

    function editFloorUp_Public() {
        $('#modalEditBeaconInputFloor').val(Number($('#modalEditBeaconInputFloor').val())+1);
    }

    return{
        load:load_Public,
        create:create_public,
        createInFloor:createInFloor_public,
        edit:edit_Public,
        move:move_Public,
        save:save_Public,
        remove:remove_Public
    }

})(jQuery,environment);

environment.register('moduleBeacons', moduleBeacons);