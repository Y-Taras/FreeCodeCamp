$(document).ready(function() {

    var channelsArray = [
        "freecodecamp", "storbeck", "terakilobyte",
        "habathcx", "RobotCaleb", "MedryBW",
        "thomasballinger", "noobs2ninjas", "beohoff",
        "brunofin", "comster404", "asdfhjklzxv",
        "sheevergaming", "OgamingSC2", "cretetion", "ESL_SC2"
    ];

    for (var i = 0; i < channelsArray.length; i += 1) {
        showChannel(channelsArray[i]);
    }
    $("#online").change(function() {
        $(".offline").hide();
        $(".online").show();
    });
    $("#offline").change(function() {
        $(".online").hide();
        $(".offline").show();
    });
    $("#all").change(function() {
        $(".online").show();
        $(".offline").show();
    });

    function showChannel(channel) {
        var request1 = 'https://api.twitch.tv/kraken/streams/' +
            channel + '?callback=?';
        var request2 = 'https://api.twitch.tv/kraken/users/' +
            channel + '?callback=?';

        $.when($.getJSON(request1), $.getJSON(request2)).then(function(d1, d2) {
            var status;
            var statusClass = "";
            var logo;
            var bio;
            var data1 = d1[0];
            var data2 = d2[0];

            if (data1.stream === null) {
                status = 'Offline';
                statusClass = ' offline';
            } else if (data1.status === 404) {
                status = data1.message;
                statusClass = ' offline';
            } else if (data1.status === 422) {
                status = 'Account Closed';
                statusClass = ' offline';
            } else {
                status = data1.stream.channel.status;
                statusClass = ' online';
            }
            if ((data2.logo === null) || (data2.logo === undefined)) {
                logo = './logo.svg';
            } else { logo = data2.logo; }
            if ((data2.bio === null) || (data2.bio === undefined)) {
                bio = "";
            } else { bio = data2.bio; }

            $('.container').append('<div class="row vertical-align' + statusClass +'">' +
                '<div class="col-xs-3 col-lg-1"> <img src="' + logo +
                '" class="img-thumbnail" alt = ""></div>' +
                '<div class="col-xs-9 col-lg-2 text-center" >' +
                '<a href= "https://www.twitch.tv/' + channel +
                '" target = "_blank">' + channel + '</a>' +
                '</div><div class="col-xs-12 col-lg-6">' + bio +
                '</div><div class="col-xs-12 col-lg-3 text-center">' + status +
                '</div></div>');
        });
    }
});
