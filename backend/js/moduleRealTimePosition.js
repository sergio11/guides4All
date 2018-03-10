var moduleRealTimePosition = (function ($,_environment) {

    var LastPosition = _environment.get('Parse').Object.extend("LastPosition");
    _environment.get('Parse').Object.registerSubclass('LastPosition', LastPosition);

    var queryLastPositions = new  (_environment.get('Parse')).Query(LastPosition);
    var subscriptionLastPostions = queryLastPositions.subscribe();

    subscriptionLastPostions.on('create', _environment.get('appVue').addLastPosition);
    subscriptionLastPostions.on('update', _environment.get('appVue').updateLastPosition);
    subscriptionLastPostions.on('delete', _environment.get('appVue').removeLastPosition);

    function load_Public(callback) {
        _environment.get('appVue').realTimePositionMapLoad();

        queryLastPositions.find({
            success: function (lastPositions) {
                for (var i = 0; i < lastPositions.length; i++) {
                    _environment.get('appVue').addLastPosition(lastPositions[i]);
                }
                typeof (callback) == "function" && callback();
            },
            error: function (error) {
                _environment.get('moduleAlertsVisual').notificationError("Error cargando las posiciones de tiempo real:"+ error.message,error.code);
            }
        });


        typeof (callback) == "function" && callback();


            var data=[];
            var d = new Date();
            var n = d.getMilliseconds();
            for(i=0;i<1000;i++){
                data.push([n-i*10000,Math.floor((Math.random() * 3)+30 )])
            }

                console.log(data)
                Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Humedad'
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Humedad'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        name: '%',
                        data: data
                    }]
                });

        var data=[];
        var d = new Date();
        var n = d.getMilliseconds();
        for(i=0;i<1000;i++){
            data.push([n-i*10000,Math.floor((Math.random() * 3)+30 )])
        }

        console.log(data)

        Highcharts.chart('container2', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Temperature'
            },
            subtitle: {
                text: '...'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Sala1',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'Sala2',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
        //End load

        Highcharts.chart('container3', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'CO2'
            },
            subtitle: {

            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'CO2'
                },
                labels: {
                }
            },
            tooltip: {

            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [
                {
                name: 'C02',
                data: [280,281,282,283,285,289,302,315,300,303,315,295,310,300
                ]
            }]
        });
    }

    return{
        load:load_Public
    }

})(jQuery,environment);
environment.register('moduleRealTimePosition', moduleRealTimePosition);

