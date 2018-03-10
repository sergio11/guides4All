$(document).ready(function() {
    // Smart Wizard events
    $("#smartwizardCreateAlert").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        $("#smartwizardCreateAlert-message-box").append("<br /> > <strong>leaveStep</strong> called on " + stepNumber + ". Direction: " + stepDirection);
        var res = confirm("Do you want to leave the step "+stepNumber+"?");
        if(!res){
            $("#smartwizardCreateAlert-message-box").append(" <strong>leaveStep</strong> Cancelled");
        }else{
            $("#smartwizardCreateAlert-message-box").append(" <strong>leaveStep</strong> Allowed");
        }
        return res;
    });

    // This event should initialize before initializing smartWizard
    // Otherwise this event wont load on first page load
    $("#smartwizardCreateAlert").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
        $("#smartwizardCreateAlert-message-box").append(" > <strong>showStep</strong> called on " + stepNumber + ". Direction: " + stepDirection+ ". Position: " + stepPosition);
    });

    $("#smartwizardCreateAlert").on("beginReset", function(e) {
        $("#smartwizardCreateAlert-message-box").append("<br /> > <strong>beginReset</strong> called");
    });

    $("#smartwizardCreateAlert").on("endReset", function(e) {
        $("#smartwizardCreateAlert-message-box").append(" > <strong>endReset</strong> called");
    });

    $("#smartwizardCreateAlert").on("themeChanged", function(e, theme) {
        $("#smartwizardCreateAlert-message-box").append("<br /> > <strong>themeChanged</strong> called. New theme: " + theme);
    });

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
        .addClass('btn btn-info')
        .on('click', function(){ alert('Finish Clicked'); });
    var btnCancel = $('<button></button>').text('Cancel')
        .addClass('btn btn-danger')
        .on('click', function(){ $('#smartwizardCreateAlert').smartWizard("reset"); });

    // Smart Wizard initialize
    $('#smartwizardCreateAlert').smartWizard({
        selected: 0,
        theme: 'arrows',
        transitionEffect:'fade',
        toolbarSettings: {toolbarPosition: 'bottom',
            toolbarExtraButtons: [btnFinish, btnCancel]
        }
    });

    // External Button Events
    $("#smartwizardCreateAlert-reset-btn").on("click", function() {
        // Reset wizard
        $('#smartwizardCreateAlert').smartWizard("reset");
        return true;
    });

    $("#smartwizardCreateAlert-prev-btn").on("click", function() {
        // Navigate previous
        $('#smartwizardCreateAlert').smartWizard("prev");
        return true;
    });

    $("#smartwizardCreateAlert-next-btn").on("click", function() {
        // Navigate next
        $('#smartwizardCreateAlert').smartWizard("next");
        return true;
    });
});
