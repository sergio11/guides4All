var baseURLMakers = "http://guide4all.es/img/makers";
var appVue = new Vue({
    el: '#app',
    data: {

        name: "",
        //----------------------------------------------------------------------------------------------------->
        //                                  DEPARTMENTS                                                      -->
        //----------------------------------------------------------------------------------------------------->
        departments: [],
        buildings: [],


        modalCreateDepartament: {
            inputName: {
                value: '',
                hasError: "",
                msgError: ""
            },
            btnCreate: {
                disabled: 'disabled'
            }
        },

        modalEditDepartament: {
            inputId: {
                value: ""
            },
            inputName: {
                value: '',
                hasError: "",
                msgError: ""
            },
            btnSave: {
                disabled: 'disabled'
            }
        },

        modalDeleteDepartament: {
            id: "",
            name: ""
        },
        //----------------------------------------------------------------------------------------------------->
        //                                  USERS                                                            -->
        //----------------------------------------------------------------------------------------------------->
        modalCreateUser: {
            inputName: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputEmail: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputPassword: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputPasswordRepeat: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputDepartment: {
                value: '',
                hasError: "",
                msgError: ""
            },
            btnCreate: {
                disabled: 'disabled'
            }
        },

        modalEditUser: {
            inputId: {
                value: ""
            },
            inputName: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputEmail: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputPassword: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputPasswordRepeat: {
                value: '',
                hasError: "",
                msgError: ""
            },
            inputDepartment: {
                value: '',
                hasError: "",
                msgError: ""
            },
            btnSave: {
                disabled: ''
            }
        },
        markers: {

            black: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-black.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            blue: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-blue.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            green: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-green.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            grey: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-grey.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            orange: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-orange.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            red: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-red.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            violet: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-violet.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            yellow: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-yellow.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            black_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-black-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            blue_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-blue-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            green_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-green-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            grey_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-grey-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            orange_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-orange-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            red_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-red-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            violet_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-violet-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            },
            yellow_error: {
                iconUrl: "http://guide4all.es/img/markers/marker-icon-2x-yellow-error.png",
                shadowUrl: "http://guide4all.es/img/markers/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }
        },
        //----------------------------------------------------------------------------------------------------->
        //                                  MAP BEACONS                                                      -->
        //----------------------------------------------------------------------------------------------------->
        mapBeacons: {
            name: "beacons",
            map: "",
            showAllFloorBeacons: false,
            currentBuildingName: "",
            currentBuildindId: "",
            currentFloor: "",
            beacons: [],
            currentPaintedBuildingFloors: {
                //idBuilding:currentFloor
            },
            selectedTileSet: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            onClickBuilding: function (event) {
                L.DomEvent.stop(event);
                var floor = event.target;
                if (appVue.mapBeacons.currentBuildindId != floor.buildingId) {
                    appVue.selectBuilding(appVue.mapBeacons, event);
                } else {
                    moduleBeacons.createInFloor(event);
                }
            },
            floorUp: function () {
                appVue.floorUp(appVue.mapBeacons);
                appVue.repaintBeacons();
            },
            floorDown: function () {
                appVue.floorDown(appVue.mapBeacons);
                appVue.repaintBeacons();
            }
        },
        modalBeaconEdit: {
            id: ""
        },
        //----------------------------------------------------------------------------------------------------->
        //                                  MAP BUILDINGS                                                    -->
        //----------------------------------------------------------------------------------------------------->
        mapBuildings: {
            name: "building",
            map: "",
            currentBuildingName: "",
            currentBuildindId: "",
            currentFloor: "",
            currentPaintedBuildingFloors: {
                //idBuilding:currentFloor
            },
            selectedTileSet: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            onClickBuilding: function (event) {
                L.DomEvent.stop(event);
                appVue.selectBuilding(appVue.mapBuildings, event);
            },
            floorUp: function () {
                appVue.removeMarkersEditFloor();
                appVue.floorUp(appVue.mapBuildings);
            },
            floorDown: function () {
                appVue.removeMarkersEditFloor();
                appVue.floorDown(appVue.mapBuildings);
            },
            markersEdit: []
        },
        modalCreateBuilding: {
            inputLat: "",
            inputLng: "",
            inputName: {
                value: "",
                hasError: "",
                msgError: ""
            },
            inputFloor: {
                value: 0,
            },
            inputImage: {
                hasError: "",
                msgError: ""
            },
            btnCreate: {
                disabled: "disabled"
            }
        },
        modalEditBuilding: {
            inputId: {
                value: ""
            },
            inputName: {
                value: '',
                hasError: "",
                msgError: ""
            },
            btnSave: {
                disabled: ''
            }
        },
        modalDeleteBuilding: {
            buildingId: "",
            buildingName: "",
        },
        modalCreateFloor: {
            inputImage: {
                hasError: "",
                msgError: ""
            },
            inputFloor: {
                value: 0,
            },
            btnCreate: {
                disabled: "disabled"
            }
        },
        modalDeleteFloor: {
            floorId: "",
            buildingName: "",
            floor: 0
        },
        modalEditImageFloor: {
            floorId: "",
            inputImage: {
                hasError: "",
                msgError: ""
            },
            btnEdit: {
                disabled: "disabled"
            }
        },

        //----------------------------------------------------------------------------------------------------->
        //                                  MAP REAL TIME POSITION                                           -->
        //----------------------------------------------------------------------------------------------------->
        mapRealTimePosition: {
            name: "mapRealTimePosition",
            map: "",
            currentBuildingName: "",
            currentBuildindId: "",
            currentFloor: "",
            showAllFloorUsers: false,
            currentPaintedBuildingFloors: {
                //idBuilding:currentFloor
            },
            selectedTileSet: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            onClickBuilding: function (event) {
                L.DomEvent.stop(event);
                appVue.selectBuilding(appVue.mapRealTimePosition, event);
            },
            floorUp: function () {
                appVue.floorUp(appVue.mapRealTimePosition);
                appVue.repaintAllLastPositions();
            },
            floorDown: function () {
                appVue.floorDown(appVue.mapRealTimePosition);
                appVue.repaintAllLastPositions();
            },
            selectedUsers: [],
            selectedDepartments: []
        },
        lastPositions: []

    },
    watch: {},
    methods: {
        //----------------------------------------------------------------------------------------------------->
        //                                 METHODS DEPARTMENTS                                               -->
        //----------------------------------------------------------------------------------------------------->
        getDepartment: function (id) {
            return this.departments[this.getIndexDepartment(id)];
        },
        getIndexDepartment: function (id) {
            return functiontofindIndexByKeyValue(this.departments, 'id', id);
        },
        addDepartment: function (departamentAdd) {
            this.departments.push({id: departamentAdd.id, name: departamentAdd.get('name'), users: []});
        },
        updateDepartment: function (departmentUpdate) {
            this.departments[this.getIndexDepartment(departmentUpdate.id)].name = departmentUpdate.get('name');
        },
        removeDepartment: function (departmentRemove) {
            Vue.delete(this.departments, this.getIndexDepartment(departmentRemove.id));
        },

        modalCreateDepartamentName_change: function () {
            validators.department.modalCreate.isValidName();
            validators.department.modalCreate.isEnableBtnCreate();
        },
        modalEditDepartamentName_change: function () {
            validators.department.modalEdit.isValidName();
            validators.department.modalEdit.isEnableBtnSave();
        },
        numUsersInDepartment: function (departmentId) {
            var indexDepartment = this.getIndexDepartment(departmentId);
            return this.departments[indexDepartment].users.length;
        },

        //----------------------------------------------------------------------------------------------------->
        //                                  METHODS USERS                                                    -->
        //----------------------------------------------------------------------------------------------------->
        findUser: function findUser(userId) {
            for (i = 0; i < this.departments.length; i++) {
                for (j = 0; j < this.departments[i].users.length; j++) {
                    if (this.departments[i].users[j].id === userId) {
                        return this.departments[i].users[j];
                    }
                }
            }
            return null;
        },
        findDepartmentOfUser: function (userId) {
            for (i = 0; i < this.departments.length; i++) {
                for (j = 0; j < this.departments[i].users.length; j++) {
                    if (this.departments[i].users[j].id === userId) {
                        return this.departments[i];
                    }
                }
            }
            return null;
        },
        addUser: function (userAdd) {
            var idDepartment = userAdd.get('departmentId');
            var indexDepartment = this.getIndexDepartment(idDepartment);
            if (idDepartment == null) {
                return;
            }

            this.departments[indexDepartment].users.push({
                id: userAdd.id,
                name: userAdd.get('name'),
                username: userAdd.get('username')
            });
        },
        updateUser: function (userUpdate) {
            var lastDepartament = this.findDepartmentOfUser(userUpdate.id);

            if (lastDepartament.id != userUpdate.get('departmentId')) {
                Vue.delete(lastDepartament.users, functiontofindIndexByKeyValue(lastDepartament.users, 'id', userUpdate.id));
                this.addUser(userUpdate);
            } else {
                var user = this.findUser(userUpdate.id);
                user.name = userUpdate.get('name');
                user.username = userUpdate.get('username');
            }
        },
        removeUser: function (userRemove) {
            var lastDepartament = this.findDepartmentOfUser(userRemove.id);
            Vue.delete(lastDepartament.users, functiontofindIndexByKeyValue(lastDepartament.users, 'id', userRemove.id));
        },

        //MODAL CREATE USER CHANGE INPUTS
        modalCreateUserName_change: function () {
            validators.user.modalCreate.isValidName(this);
            validators.user.modalCreate.isEnableBtnCreate(this);
        },
        modalCreateUserEmail_change: function () {
            validators.user.modalCreate.isValidEmail(this);
            validators.user.modalCreate.isEnableBtnCreate(this);
        },
        modalCreateUserPassword_change: function () {
            validators.user.modalCreate.isValidPassword(this);
            validators.user.modalCreate.isEnableBtnCreate(this);
        },
        modalCreateUserPasswordRepeat_change: function () {
            validators.user.modalCreate.isValidPassword(this);
            validators.user.modalCreate.isEnableBtnCreate(this);
        },

        //MODAL EDIT USER CHANGE INPUTS
        modalEditUserName_change: function () {
            validators.user.modalEdit.isValidName(this);
            validators.user.modalEdit.isEnableBtnSave(this);
        },
        modalEditUserEmail_change: function () {
            validators.user.modalEdit.isValidEmail(this);
            validators.user.modalEdit.isEnableBtnSave(this);
        },
        modalEditUserPassword_change: function () {
            validators.user.modalEdit.isValidPassword(this);
            validators.user.modalEdit.isEnableBtnSave(this);
        },
        modalEditUserPasswordRepeat_change: function () {
            validators.user.modalEdit.isValidPassword(this);
            validators.user.modalEdit.isEnableBtnSave(this);
        },
        //----------------------------------------------------------------------------------------------------->
        //                                  METHODS BEACONS                                                  -->
        //----------------------------------------------------------------------------------------------------->
        beaconMapLoad: function () {
            console.log("beaconMapLoad");
            this.mapBeacons.map = L.map('map', {
                center: [40.965303, -5.671127],
                minZoom: 2,
                zoom: 15
            });

            var basemap = L.tileLayer(this.mapBeacons.selectedTileSet, {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            });

            if (this.mapBeacons.map.hasLayer(basemap)) {
                this.mapBeacons.map.removeLayer(basemap);
            } else {
                this.mapBeacons.map.addLayer(basemap);
            }
            var roads = L.gridLayer.googleMutant({
                type: 'roadmap'
            }).addTo(this.mapBeacons.map);

            this.mapBeacons.map.on('click', environment.get('moduleBeacons').create);
        },
        beaconsMapRepaintBeacons: function () {
            this.mapBeacons.beacons.forEach(function (currentBeacon) {
                if (appVue.mapBeacons.currentFloor == "Todas" || currentBeacon.indexFloor == appVue.mapBeacons.currentFloor) {
                    currentBeacon.addTo(appVue.mapBeacons.map);
                } else {
                    currentBeacon.remove();
                }
            });
        },
        getBeacon: function (id) {
            return this.mapBeacons.beacons[this.getIndexBeacon(id)];
        },
        getIndexBeacon: function (id) {
            return functiontofindIndexByKeyValue(this.mapBeacons.beacons, 'id', id);
        },
        addBeaconOnLoad: function (beaconAdd) {
            var beacon = {
                id: beaconAdd.id,
                lat: beaconAdd.get("xy").latitude,
                lng: beaconAdd.get("xy").longitude,
                mac: beaconAdd.get("mac"),
                url: beaconAdd.get("url"),
                floorId: beaconAdd.get("floorId")
            };
            this.mapBeacons.beacons.push(beacon);
        },
        addBeacon: function (beaconAdd) {
            var beacon = {
                id: beaconAdd.id,
                lat: beaconAdd.get("xy").latitude,
                lng: beaconAdd.get("xy").longitude,
                mac: beaconAdd.get("mac"),
                url:beaconAdd.get("url"),
                floorId: beaconAdd.get("floorId")
            };
            this.mapBeacons.beacons.push(beacon);

            this.addLayerBeacon(beacon);
        },
        updateBeacon: function (beaconUpdate) {
            var beacon = this.getBeacon(beaconUpdate.id);
            beacon.lat = beaconUpdate.get("xy").latitude;
            beacon.lng = beaconUpdate.get("xy").longitude;
            beacon.mac = beaconUpdate.get("mac");
            beacon.url = beaconUpdate.get("url");
            beacon.floorId = beaconUpdate.get("floorId");

            this.addLayerBeacon(beacon);
        },
        removeBeacon: function (beaconRemove) {
            this.removeLayerBeacon(beaconRemove.id);
            var indexOfBeacon = this.getIndexBeacon(beaconRemove.id);
            Vue.delete(this.mapBeacons.beacons, indexOfBeacon);
        },
        paintBeaconsOnLoad: function () {
            this.repaintBeacons();
        },
        repaintBeacons: function () {
            for (var i = 0; i < this.mapBeacons.beacons.length; i++) {
                this.addLayerBeacon(this.mapBeacons.beacons[i]);
            }
        },
        addLayerBeacon: function (beacon) {
            try {
                this.removeLayerBeacon(beacon.id);

                if (this.mapBeacons.showAllFloorBeacons == false) {
                    //Si es interior comprobamos que haya que pintarla
                    if (beacon.floorId != "") {
                        var floor = this.getFloor(beacon.floorId);
                        if (this.mapBeacons.currentPaintedBuildingFloors[floor.buildingId] != floor.floor) {
                            return;
                        }
                    }
                }

                var icon;
                if (beacon.mac == "") {
                    icon = new L.Icon(this.markers.red);
                } else {
                    if (beacon.floorId == "") {
                        icon = new L.Icon(this.markers.yellow);
                    } else {
                        icon = new L.Icon(this.markers.green);
                    }
                }

                var marker = L.marker([beacon.lat, beacon.lng], {
                    draggable: true,
                    icon: icon
                });

                marker.id = beacon.id;
                marker.mac = beacon.mac;
                marker.url = beacon.url;
                marker.floorId = beacon.floorId;
                marker.bindPopup("");
                marker.on('dragend', environment.get('moduleBeacons').move);
                marker.on('click', environment.get('moduleBeacons').edit);
                marker.addTo(this.mapBeacons.map);
            } catch (ex) {
                console.log(ex);
            }

        },
        removeLayerBeacon: function (beaconId) {
            var layers = Object.values(this.mapBeacons.map._layers).filter(function (l) {
                return l.id == beaconId
            });
            for (var i = 0; i < layers.length; i++) {
                layers[i].remove();
            }
        },
        //----------------------------------------------------------------------------------------------------->
        //                                  METHODS BUILDINGS                                                -->
        //----------------------------------------------------------------------------------------------------->
        buildingsMapLoad: function () {
            console.log("buildingsMapLoad");
            this.mapBuildings.map = L.map('mapBuildings', {
                center: [40.965303, -5.671127],
                minZoom: 2,
                zoom: 15
            });

            var basemap = L.tileLayer(this.mapBuildings.selectedTileSet, {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            });

            if (this.mapBuildings.map.hasLayer(basemap)) {
                this.mapBuildings.map.removeLayer(basemap);
            } else {
                this.mapBuildings.map.addLayer(basemap);
            }
            var roads = L.gridLayer.googleMutant({
                type: 'roadmap'
            }).addTo(this.mapBuildings.map);

            this.mapBuildings.map.on('click', environment.get('moduleBuildings').openModalCreateBuilding);

        },
        getIndexBuilding: function (id) {
            return functiontofindIndexByKeyValue(this.buildings, 'id', id);
        },
        getBuilding: function (id) {
            return this.buildings[this.getIndexBuilding(id)];
        },

        addBuilding: function (buildingAdd) {
            var buildingJson = {
                id: buildingAdd.id,
                name: buildingAdd.get('name'),
                floors: {}
            };
            this.buildings.push(buildingJson);
        },
        updateBuilding: function (buildingUpdate) {
            var building = this.getBuilding(buildingUpdate.id);
            building.name = buildingUpdate.get('name');
            var maps = this.arrayOfMaps();
            for (var i = 0; i < maps.length; i++) {
                var map = maps[i];
                if (map.currentBuildindId == buildingUpdate.id) {
                    map.currentBuildingName = buildingUpdate.get('name');
                }
            }
        },
        removeBuilding: function (buildingRemove) {

        },

        modalCreateBuildingName_change: function () {
            validators.building.modalCreate.isValidName();
            validators.building.modalCreate.isEnableBtnCreate();
        },
        modalCreateBuildingImage_change: function () {
            validators.building.modalCreate.isValidImage();
            validators.building.modalCreate.isEnableBtnCreate();

        },
        modalEditBuildingName_change: function () {
            validators.building.modalEdit.isValidName();
            validators.building.modalEdit.isEnableBtnEdit();
        },

        //----------------------------------------------------------------------------------------------------->
        //                                  METHODS FlOORS                                                   -->
        //----------------------------------------------------------------------------------------------------->
        getFloor: function (floorId) {
            for (var i = 0; i < this.buildings.length; i++) {
                for (var j = 0; j < Object.keys(appVue.buildings[i].floors).length; j++) { //NO funciona con appVue.buildings[i].floors.length
                    var floorKey = Object.keys(appVue.buildings[i].floors)[j];
                    if (this.buildings[i].floors[floorKey].id == floorId) {
                        return this.buildings[i].floors[floorKey];
                    }
                }
            }
            return null;
        },
        getFirstFloor: function (building) {
            var sortedKeys = Object.keys(building.floors).sort(AscendingNumberSort);
            return building.floors[sortedKeys[0]];
        },
        getFloorFromBuildingIdAndNumFloor: function (buildingId, numFloor) {
            return this.getBuilding(buildingId).floors[numFloor];
        },

        addFloorLoad: function (floorAdd) {
            var indexBuilding = this.getIndexBuilding(floorAdd.get('buildingId'));
            var floorJson = {
                id: floorAdd.id,
                buildingId: floorAdd.get('buildingId'),
                url: floorAdd.get('image').url().replace("http", "http"),
                floor: floorAdd.get('floor'),
                lat1: floorAdd.get('lat1'),
                lng1: floorAdd.get('lng1'),
                lat2: floorAdd.get('lat2'),
                lng2: floorAdd.get('lng2'),
                lat3: floorAdd.get('lat3'),
                lng3: floorAdd.get('lng3'),
            };
            this.buildings[indexBuilding].floors[floorAdd.get('floor')] = floorJson;
        },
        addFloor: function (floorAdd) {
            var indexBuilding = this.getIndexBuilding(floorAdd.get('buildingId'));
            var floorJson = {
                id: floorAdd.id,
                buildingId: floorAdd.get('buildingId'),
                url: floorAdd.get('image').url(),
                floor: floorAdd.get('floor'),
                lat1: floorAdd.get('lat1'),
                lng1: floorAdd.get('lng1'),
                lat2: floorAdd.get('lat2'),
                lng2: floorAdd.get('lng2'),
                lat3: floorAdd.get('lat3'),
                lng3: floorAdd.get('lng3'),
                opacity: 0.9
            };
            this.buildings[indexBuilding].floors[floorAdd.get('floor')] = floorJson;

            var maps = this.arrayOfMaps();
            for (var i = 0; i < maps.length; i++) {
                var map = maps[i];
                if (map.currentPaintedBuildingFloors[floorAdd.get('buildingId')] == undefined) {
                    this.addLayerFloor([map], floorJson);
                }
            }
        },
        updateEditFloor: function (currentFloor, numberMarker, lat, lng) {
            currentFloor['lat' + numberMarker] = lat;
            currentFloor['lng' + numberMarker] = lng;
            currentFloor['opacity'] = 0.5;
            this.addLayerFloor([this.mapBuildings], currentFloor);
        },
        updateFloor: function (floorUpdate) {
            var floor = this.getFloorFromBuildingIdAndNumFloor(floorUpdate.get('buildingId'), floorUpdate.get('floor'));
            floor.url = floorUpdate.get('image').url();
            floor.floor = floorUpdate.get('floor');
            floor.lat1 = floorUpdate.get('lat1');
            floor.lng1 = floorUpdate.get('lng1');
            floor.lat2 = floorUpdate.get('lat2');
            floor.lng2 = floorUpdate.get('lng2');
            floor.lat3 = floorUpdate.get('lat3');
            floor.lng3 = floorUpdate.get('lng3');
            floor.opacity = 0.9;
            var maps = this.arrayOfMaps();
            for (var i = 0; i < maps.length; i++) {
                if (maps[i].currentPaintedBuildingFloors[floorUpdate.get('buildingId')] == floorUpdate.get('floor')) {
                    this.addLayerFloor([maps[i]], floor);
                }
            }

            //Verificar si se está editando esa planta
            if (this.mapBuildings.markersEdit.length > 0 && this.mapBuildings.currentBuildindId == floorUpdate.get('buildingId') && this.mapBuildings.currentFloor == floorUpdate.get('floor')) {
                this.addMarkersEditFloor(floor);
            }
        },
        removeFloor: function (floorRemove) {
            var building = appVue.getBuilding(floorRemove.get('buildingId'));
            delete building.floors[floorRemove.get('floor')];
            var maps = appVue.arrayOfMaps();
            for (var i = 0; i < maps.length; i++) {
                var map = maps[i];
                appVue.removeLayerFloorFromMapAndIdFloor(map.map, floorRemove.id);

                if (map.currentPaintedBuildingFloors[floorRemove.get('buildingId')] == floorRemove.get('floor')) {
                    var firstFloor = appVue.getFirstFloor(building);
                    appVue.removeMarkersEditFloor();
                    if (firstFloor != undefined) {
                        appVue.addLayerFloor([map], firstFloor);
                        map.currentFloor = firstFloor.floor;
                    } else {
                        if (map.currentBuildindId == floorRemove.get('buildingId')) {
                            map.currentBuildindId = "";
                            map.currentFloor = "";
                            map.currentBuildingName = "";
                        }
                    }
                }
            }
            //Borrar el edificio si es la ultima planta que se borra
            if (Object.keys(building.floors).length == 0) {
                Vue.delete(this.buildings, appVue.getIndexBuilding(floorRemove.get('buildingId')));

                var maps = this.arrayOfMaps();
                for (var i = 0; i < maps.length; i++) {
                    var map = maps[i];
                    if (map.currentBuildindId == floorRemove.get('buildingId')) {
                        map.currentBuildingName = "";
                        map.currentBuildindId = "";
                        map.currentFloor = "";
                    }
                }
            }

        },

        //----------------------------------------------------------------------------------------------------->
        //                          METHODS MAPS BUILD AND FlOORS                                            -->
        //----------------------------------------------------------------------------------------------------->
        paintFloorsOnLoad: function () {
            for (var i = 0; i < this.buildings.length; i++) {
                this.addLayerFloor(this.arrayOfMaps(), this.getFirstFloor(this.buildings[i]));
            }
        },
        arrayOfMaps: function () {
            return [this.mapBeacons, this.mapBuildings, this.mapRealTimePosition];
        },

        addLayerFloor: function (maps, floor) {
            for (var i = 0; i < maps.length; i++) {

                var overlay = L.imageOverlay.rotated(floor.url, L.latLng(floor.lat1, floor.lng1), L.latLng(floor.lat2, floor.lng2), L.latLng(floor.lat3, floor.lng3), {
                    opacity: floor.opacity,
                    interactive: true
                });
                overlay.buildingId = floor.buildingId;
                overlay.floorId = floor.id;
                overlay.floor = floor.floor;
                overlay.on('click', maps[i].onClickBuilding);

                //Borrar la antigua
                this.removeLayerFloorFromMapAndIdBuilding(maps[i].map, floor.buildingId);

                maps[i].map.addLayer(overlay);
                maps[i].currentPaintedBuildingFloors[floor.buildingId] = floor.floor;
            }
        },
        removeLayerFloorFromMapAndIdFloor: function (map, floorId) {
            var layers = Object.values(map._layers).filter(function (l) {
                return l.floorId == floorId && l.floor != undefined
            });

            for (var i = 0; i < layers.length; i++) {
                layers[i].remove();
            }
        },
        removeLayerFloorFromMapAndIdBuilding: function (map, idBuilding) {
            var layers = Object.values(map._layers).filter(function (l) {
                return l.buildingId == idBuilding && l.floor != undefined //El que venga se caga  l.floor!=undefined -> difirenciar las marcas de mover la planta
            });

            for (i = 0; i < layers.length; i++) {
                layers[i].remove();
            }
        },

        addMarkersEditFloor: function (floor) {
            this.removeMarkersEditFloor();

            for (var i = 1; i < 4; i++) {
                var markerCorner = L.marker(L.latLng(floor['lat' + i], floor['lng' + i]), {draggable: true});
                markerCorner.buildingId = floor.buildingId;
                markerCorner.idFloor = floor.id;
                markerCorner.number = i;
                markerCorner.addTo(this.mapBuildings.map);
                this.mapBuildings.markersEdit.push(markerCorner);
                markerCorner.on('drag', moduleBuildings.floorCornerDrag);
                markerCorner.on('dragend', moduleBuildings.floorCornerDragEnd);
            }
        },
        removeMarkersEditFloor: function () {
            for (var i = 0; i < this.mapBuildings.markersEdit.length; i++) {
                this.mapBuildings.markersEdit[i].remove();
            }
            this.mapBuildings.markersEdit = [];
        },

        selectBuilding: function (map, event) {
            var floor = event.target;
            if (map.name == this.mapBuildings.name) {
                this.removeMarkersEditFloor();
            }
            map.currentBuildindId = floor.buildingId;
            map.currentFloor = floor.floor;
            map.currentBuildingName = this.getBuilding(floor.buildingId).name;
        },
        floorUp: function (map) {
            //Si no está seleccionado el edificio
            if (map.currentBuildindId == "") {
                environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
                return;
            }

            var building = this.getBuilding(map.currentBuildindId);
            var currentFloor = map.currentPaintedBuildingFloors[map.currentBuildindId];

            var plantas = Object.keys(building.floors).sort(AscendingNumberSort);
            var index = plantas.indexOf('' + currentFloor);

            //Validar que no se encuentra en la ultima planta
            if (index == plantas.length - 1) {
                environment.get('moduleAlertsVisual').notificationWarning('No existen más plantas');

            } else {
                var newIndexfloor = plantas[index + 1];
                this.addLayerFloor([map], building.floors[newIndexfloor]);
                map.currentFloor = newIndexfloor;
            }
        },
        floorDown: function (map) {
            //Si no está selecionado el edificio
            if (map.currentBuildindId == "") {
                environment.get('moduleAlertsVisual').notificationWarning('Seleccione un edificio');
                return;
            }

            var building = this.getBuilding(map.currentBuildindId);
            var currentFloor = map.currentPaintedBuildingFloors[map.currentBuildindId];

            var floors = Object.keys(building.floors).sort(AscendingNumberSort);

            var index = floors.indexOf('' + currentFloor);

            //Si ya se encuentra en la primera planta
            if (index == 0) {
                environment.get('moduleAlertsVisual').notificationWarning('No existen más plantas');

            } else {
                var newIndexfloor = floors[index - 1];
                this.addLayerFloor([map], building.floors[newIndexfloor]);
                map.currentFloor = newIndexfloor;
            }
        },

        modalCreateFloorImage_change: function () {
            validators.floor.modalCreate.isValidImage();
            validators.floor.modalCreate.isEnableBtnCreate();
        },
        modalEditImageFloorImage_change: function () {
            validators.floor.modalEditImage.isValidImage();
            validators.floor.modalEditImage.isEnableBtnCreate();
        },
        //----------------------------------------------------------------------------------------------------->
        //                          LIST USERS DEPARTMENT                                                    -->
        //----------------------------------------------------------------------------------------------------->

        /*recalculateAllDepeartamentsSelected:function(){
            this.calculateDepartmentsSelected(this.mapRealTimePosition);
        },*/

        calculateDepartmentsSelected: function (objBase) {
            for (var i = 0; i < this.departments.length; i++) {
                var numUsersSelected = 0;
                for (var j = 0; j < this.departments[i].users.length; j++) {
                    if (objBase.selectedUsers.indexOf(this.departments[i].users[j].id) > -1) {
                        numUsersSelected++;
                    }
                }
                if (numUsersSelected == this.departments[i].users.length && numUsersSelected != 0) {
                    objBase.selectedDepartments.push(this.departments[i].id)
                } else {
                    if (objBase.selectedDepartments.indexOf(this.departments[i].id) > -1) {
                        objBase.selectedDepartments.splice(objBase.selectedDepartments.indexOf(this.departments[i].id), 1);
                    }
                }
                document.getElementById('mapRealTimeCountUsersDepartment' + this.departments[i].id).innerHTML = numUsersSelected;
            }
        },

        selectDeselectAllUsersDepartment: function (objBase, idDepartment) {
            var department = this.getDepartment(idDepartment);

            var actionSelect = true;
            if (objBase.selectedDepartments.indexOf(department.id) > -1) {
                actionSelect = false;
            }

            for (var i = 0; i < department.users.length; i++) {
                if (actionSelect) {
                    if (objBase.selectedUsers.indexOf(department.users[i].id) == -1) {
                        objBase.selectedUsers.push(department.users[i].id)
                    }
                } else {
                    if (objBase.selectedUsers.indexOf(department.users[i].id) > -1) {
                        objBase.selectedUsers.splice(objBase.selectedUsers.indexOf(department.users[i].id), 1);
                    }
                }
            }
            this.calculateDepartmentsSelected(objBase);
        },

        //----------------------------------------------------------------------------------------------------->
        //                          METHODS MAPS REAL TIME                                                   -->
        //----------------------------------------------------------------------------------------------------->
        realTimePositionMapLoad: function () {
            console.log("realTimeMapLoad");
            this.mapRealTimePosition.map = L.map('mapRealTimePosition', {
                center: [40.965303, -5.671127],
                minZoom: 2,
                zoom: 15
            });

            var basemap = L.tileLayer(this.mapRealTimePosition.selectedTileSet, {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            });

            if (this.mapRealTimePosition.map.hasLayer(basemap)) {
                this.mapRealTimePosition.map.removeLayer(basemap);
            } else {
                this.mapRealTimePosition.map.addLayer(basemap);
            }
            var roads = L.gridLayer.googleMutant({
                type: 'roadmap'
            }).addTo(this.mapRealTimePosition.map);

        },
        mapRealTimeCalculateDepartmentsSelected: function () {
            this.calculateDepartmentsSelected(this.mapRealTimePosition);
            this.repaintAllLastPositions();
        },
        mapRealTimeSelectAllUsersDepartment: function (idDepartment) {
            this.selectDeselectAllUsersDepartment(this.mapRealTimePosition, idDepartment);
            this.repaintAllLastPositions();
        },
        mapRealTimeSelectAllUsers:function(){
            this.mapRealTimePosition.selectedUsers=[];
            for(var i=0;i<this.departments.length;i++){
                for(var j=0;j<this.departments[i].users.length;j++){
                    this.mapRealTimePosition.selectedUsers.push(this.departments[i].users[j].id);
                }
            }
            this.mapRealTimeCalculateDepartmentsSelected();
        },
        mapRealTimeDeselectAllUsers:function(){
            this.mapRealTimePosition.selectedUsers=[];
            this.mapRealTimeCalculateDepartmentsSelected();
        },
        //----------------------------------------------------------------------------------------------------->
        //                         LAST POSITIONS                                                            -->
        //----------------------------------------------------------------------------------------------------->
        getIndexLastPosition: function (id) {
            return functiontofindIndexByKeyValue(this.lastPositions, 'id', id);
        },
        getLastPosition: function (id) {
            return this.lastPositions[this.getIndexLastPosition(id)];
        },
        addLastPosition: function (lastPositionAdd) {
            console.log("addLastPosition");
            try {
                var lastPosition = {
                        id: lastPositionAdd.id,
                        userId: lastPositionAdd.get('userId'),
                        lat: lastPositionAdd.get('position').latitude,
                        lng: lastPositionAdd.get('position').longitude,
                        timeStamp:lastPositionAdd.get('timeStamp'),
                        floorId: lastPositionAdd.get('floorId')
                    }
                ;
                console.log(lastPosition);
                this.lastPositions.push(lastPosition);
                this.addLayerLastPosition(lastPosition);
            } catch (ex) {
                console.log(ex);
            }

        },
        updateLastPosition: function (lastPositionUpdate) {
            console.log("updateLastPosition");
            var lastPosition = this.getLastPosition(lastPositionUpdate.id);
            lastPosition.userId = lastPositionUpdate.get('userId');
            lastPosition.lat = lastPositionUpdate.get('position').latitude;
            lastPosition.lng = lastPositionUpdate.get('position').longitude;
            lastPosition.timeStamp=lastPositionUpdate.get('timeStamp'),
                lastPosition.floorId = lastPositionUpdate.get('floorId');
            this.addLayerLastPosition(lastPosition);
            console.log("lat:"+ lastPosition.lat);
            console.log("lng:"+ lastPosition.lng);
        },
        removeLastPosition: function () {

        },
        repaintAllLastPositions: function () {
            for (var i = 0; i < this.lastPositions.length; i++) {
                this.addLayerLastPosition(this.lastPositions[i]);
            }
        },
        addLayerLastPosition: function (lastPosition) {
            try {
                this.removeLayerLastPosition(lastPosition.id);

                //Si el usuario no está selecionado
                if(this.mapRealTimePosition.selectedUsers.indexOf(lastPosition.userId)==-1){
                    return;
                }

                if (this.mapRealTimePosition.showAllFloorUsers == false) {
                    if (lastPosition.floorId != "") {
                        var floor = this.getFloor(lastPosition.floorId);
                        if (this.mapRealTimePosition.currentPaintedBuildingFloors[floor.buildingId] != floor.floor) {
                            return;
                        }
                    }
                }

                var intervalSeconds=60*5;
                const now = new Date();
                var currentTime=now.getTime();
                var error=lastPosition.timeStamp<currentTime-intervalSeconds*1000;

                var icon;
                if (lastPosition.floorId == "") {
                    //Exterior
                    if(error){
                        icon = new L.Icon(this.markers.yellow_error);
                    }else{
                        icon = new L.Icon(this.markers.yellow);
                    }
                } else{
                    var floor = this.getFloor(lastPosition.floorId);
                    if (this.mapRealTimePosition.currentPaintedBuildingFloors[floor.buildingId] != floor.floor) {
                        //In Other floor
                        if(error){
                            icon = new L.Icon(this.markers.orange_error);
                        }else{
                            icon = new L.Icon(this.markers.orange);
                        }
                    }else{
                        if(error){
                            icon = new L.Icon(this.markers.green_error);
                        }else{
                            icon = new L.Icon(this.markers.green);
                        }
                    }
                }

                var marker = L.marker([lastPosition.lat, lastPosition.lng], {
                    icon: icon
                });
                marker.id = lastPosition.id;
                marker.userId = lastPosition.userId;
                marker.floorId = lastPosition.floorId;
                var user=this.findUser(marker.userId);
                var department=this.findDepartmentOfUser(user.id);
                marker.bindPopup('<div width="860" height="315"></div>' +
                    '<b>Nombre: </b>'+user.name +
                    '<br><b>Departamento: </b>'+department.name,{
                    maxWidth: 1000
                });
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });

                marker.addTo(this.mapRealTimePosition.map);
            } catch (ex) {
                console.log(ex);
            }
        },
        removeLayerLastPosition: function (layerId) {
            var layers = Object.values(this.mapRealTimePosition.map._layers).filter(function (l) {
                return l.id == layerId
            });
            for (var i = 0; i < layers.length; i++) {
                layers[i].remove();
            }
        }
    }
});

environment.register('appVue', appVue);
validators._appVue = appVue;

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}

function AscendingNumberSort(a, b) {
    return a - b;
}




