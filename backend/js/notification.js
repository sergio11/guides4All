
$(document).ready(function() {
    // Smart Wizard events
    $("#smartwizardSendNotification").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        $("#smartwizardSendNotification-message-box").append("<br /> > <strong>leaveStep</strong> called on " + stepNumber + ". Direction: " + stepDirection);
        var res = confirm("Do you want to leave the step "+stepNumber+"?");
        if(!res){
            $("#smartwizardSendNotification-message-box").append(" <strong>leaveStep</strong> Cancelled");
        }else{
            $("#smartwizardSendNotification-message-box").append(" <strong>leaveStep</strong> Allowed");
        }
        return res;
    });

    // This event should initialize before initializing smartWizard
    // Otherwise this event wont load on first page load
    $("#smartwizardSendNotification").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
        $("#smartwizardSendNotification-message-box").append(" > <strong>showStep</strong> called on " + stepNumber + ". Direction: " + stepDirection+ ". Position: " + stepPosition);
    });

    $("#smartwizardSendNotification").on("beginReset", function(e) {
        $("#smartwizardSendNotification-message-box").append("<br /> > <strong>beginReset</strong> called");
    });

    $("#smartwizardSendNotification").on("endReset", function(e) {
        $("#smartwizardSendNotification-message-box").append(" > <strong>endReset</strong> called");
    });

    $("#smartwizardSendNotification").on("themeChanged", function(e, theme) {
        $("#smartwizardSendNotification-message-box").append("<br /> > <strong>themeChanged</strong> called. New theme: " + theme);
    });

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
        .addClass('btn btn-info')
        .on('click', function(){ alert('Finish Clicked'); });
    var btnCancel = $('<button></button>').text('Cancel')
        .addClass('btn btn-danger')
        .on('click', function(){ $('#smartwizardSendNotification').smartWizard("reset"); });

    // Smart Wizard initialize
    $('#smartwizardSendNotification').smartWizard({
        selected: 0,
        theme: 'arrows',
        transitionEffect:'fade',
        toolbarSettings: {toolbarPosition: 'bottom',
            toolbarExtraButtons: [btnFinish, btnCancel]
        }
    });

    // External Button Events
    $("#smartwizardSendNotification-reset-btn").on("click", function() {
        // Reset wizard
        $('#smartwizardSendNotification').smartWizard("reset");
        return true;
    });

    $("#smartwizardSendNotification-prev-btn").on("click", function() {
        // Navigate previous
        $('#smartwizardSendNotification').smartWizard("prev");
        return true;
    });

    $("#smartwizardSendNotification-next-btn").on("click", function() {
        // Navigate next
        $('#smartwizardSendNotification').smartWizard("next");
        return true;
    });
});