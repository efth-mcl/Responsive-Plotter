$(document).ready(function () {
    var TS = new TimeSires("Canvas", 500);
    TS.graph.Data.DataY = math.randomInt([math.randomInt(3, 15)], 100)
    var Dates = []
    var day_i =new Date()
    for (var i = 0; i < TS.graph.Data.DataY.length; i++) {
        day_i.setTime(day_i.getTime()+math.randomInt(172800000))
        Dates.push(day_i.getTime())
        console.log(i)
    }
    TS.graph.Data.DataX = Dates
    console.log(TS.graph.Data.DataY.length)
    TS.PLOT_TimeSiries();
    TS.SetTimeMessage();
    $(window).resize(function () { UpdateTimeSiries(TS) });
});
