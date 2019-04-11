// this's the main js files

$(document).ready(function () {

  var app = angular.module("wehome-map", []);

  var map = new AMap.Map("container", {
    resizeEnable: true
  });

  map.plugin(["AMap.ToolBar"], function () {
    map.addControl(new AMap.ToolBar());
  });

  if (location.href.indexOf('&guide=1') !== -1) {
    map.setStatus({scrollWheel: false})
  }

  var auto = new AMap.Autocomplete({
    input: "tipinput"
  });
  AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
  function select(e) {
    if (e.poi && e.poi.location) {
      map.setZoom(15);
      map.setCenter(e.poi.location);
    }
  }

  app.config(['$interpolateProvider',
    function($interpolateProvider) {
        // Swig uses {{}} for variables which makes it clash with the use of {{}} in AngularJS.
        // Replaced use of {{}} with [[]] in AngularJS to make it work with Swig.
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
    ]);


  app.controller("wehome-con", function ($scope) {
    $scope.location = "John";
    $scope.lng = 0;
    $scope.lat = 0;
    $scope.aqi = 0;

    map.on('click', function (e) {
      $scope.lng = e.lnglat.getLng();
      $scope.lat = e.lnglat.getLat();
      document.getElementById("lnglat").value = $scope.lng + ',' + $scope.lat;
      // todo get aqi from back-end
      $http({
        method: 'GET',
        url: "/aqi",
        data: {
          lng: $scope.lng,
          lat: $scope.lat,
        },
      }).success(function (e) {
          alert(e);
        }
      )

    });


  });

});


