<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!--Name Logo-->
    <title>Leroy4All</title>
    <link rel="icon" type="image/png" href="img/logoLogin2.png"/>

    <!--Jquery-->
    <script src="https://code.jquery.com/jquery-latest.js"></script>

    <!--Css ADMIN LTE-->
    <link rel="stylesheet" href="./bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css">
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">

    <!--JS ADMIN LTE-->
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="bower_components/fastclick/lib/fastclick.js"></script>
    <script src="dist/js/adminlte.min.js"></script>


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

    <!--Jquery UI-->
    <link rel="stylesheet" href="css/libs/jquery-ui.min.css">
    <script src="js/libs/jquery-ui.min.js"></script>
    <script src="js/libs/vue.js"></script>
    <!--Smart Wizard-->
    <link rel="stylesheet" href="css/libs/smart_wizard.css">
    <link rel="stylesheet" href="css/libs/smart_wizard_theme_arrows.css">
    <link rel="stylesheet" href="css/libs/smart_wizard_theme_circles.css">
    <link rel="stylesheet" href="css/libs/smart_wizard_theme_dots.css">
    <script type="application/javascript" src="js/libs/jquery.smartWizard.js"></script>

    <!--toastr-->
    <script src="js/libs/toastr.min.js"></script>
    <link rel="stylesheet" href="css/libs/toastr.min.css">


    <!--Parse-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/parse/1.11.0/parse.min.js"></script>

    <!-- Leaflet -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.css">
    <link rel="stylesheet" href="css/map.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEZetabubiXKetzbAmmlgIezKOwgx69Dk"></script>
    <script src='https://unpkg.com/leaflet.gridlayer.googlemutant@latest/Leaflet.GoogleMutant.js'></script>

    <link rel="stylesheet" href="css/libs/leaflet.awesome-markers.css">
    <script src="js/libs/leaflet.awesome-markers.js"></script>
    <script src="js/libs/Leaflet.ImageOverlay.Rotated.js"></script>
    <!--Custom css-->
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="css/animation.css">


</head>

<!--<body class="hold-transition skin-blue sidebar-mini">-->
<body class="hold-transition login-page2">
<div id="app">
    <?php include('pages/loginPage2.html'); ?>
    <?php include('pages/loadingPage.html'); ?>
    <div class="wrapper hidden" id="dashboardPage">
        <?php include('pages/dashboard/main-header2.html'); ?>
        <?php include('pages/dashboard/main-sidebar2.html'); ?>
        <?php include('pages/dashboard/pageManagementDepartments.html'); ?>
        <?php include('pages/dashboard/pageManagementUsers.html'); ?>
        <?php include('pages/dashboard/pageManagementBuildings.html'); ?>
        <?php include('pages/dashboard/pageManagementBeacons.html'); ?>
        <?php include('pages/dashboard/pageRealTimePosition.html'); ?>
        <?php include('pages/dashboard/pageHistoricalPositions.html'); ?>
        <?php include('pages/dashboard/pageAlertCreate.html'); ?>
        <?php include('pages/dashboard/pageAlertsList.html'); ?>
        <?php include('pages/dashboard/pageAlertsTriggered.html'); ?>
        <?php include('pages/dashboard/pageSendNotification.html'); ?>
        <?php include('pages/dashboard/pageNotificationsList.html'); ?>

        <footer class="main-footer">
            <div class="pull-right hidden-xs">
                <b>Version</b> 1.0
            </div>
            <strong>Copyright &copy; 2017 <a href="http://leroy4all.es/">Leroy4all</a>.</strong> All rights
            reserved.
        </footer>
    </div>
</div>
</body>


<script src="js/moduleEnvironment.js"></script>

<script src="js/moduleConfigParse.js"></script>

<!--APP JS-->
<script src="js/modulePagination2.js"></script>
<script src="js/validators.js"></script>
<script src="js/moduleAlertsVisual.js"></script>

<script src="js/moduleVue.js"></script>


<!--Dashboard-->
<script src="js/moduleDepartments.js"></script>
<script src="js/moduleUsers.js"></script>
<script src="js/moduleBuildings.js"></script>
<!--
<script src="js/alerts.js"></script>
<script src="js/notification.js"></script>-->
<script src="js/moduleBeacons.js"></script>
<script src="js/moduleRealTimePosition.js"></script>
<script src="js/moduleLogin.js"></script>

