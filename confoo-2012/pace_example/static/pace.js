var smoothie_ecg1 = new SmoothieChart(),
    smoothie_ecg2 = new SmoothieChart(),
    ecg1 = new TimeSeries,
    ecg2 = new TimeSeries;

smoothie_ecg1.addTimeSeries(ecg1, {
    strokeStyle:'rgb(0, 255, 0)',
    fillStyle:'rgba(0, 255, 0, 0.4)',
    lineWidth:3 });

smoothie_ecg2.addTimeSeries(ecg2, {
    strokeStyle:'rgb(255, 0, 255)',
    fillStyle:'rgba(255, 0, 255, 0.4)',
    lineWidth:3 });

$(document).ready(function(){
    var ws = new WebSocket($('body').attr('data-web-socket'));
    smoothie_ecg1.streamTo(document.getElementById("ecg1"));
    smoothie_ecg2.streamTo(document.getElementById("ecg2"));

    ws.onmessage = function (msg) {
        var out = msg.data.split('|');
        ecg1.append(parseFloat(out[0]), parseFloat(out[1]));
        ecg2.append(parseFloat(out[0]), parseFloat(out[2]));
    };
    ws.onopen = function() {
        ws.send('connected');
    };
});
