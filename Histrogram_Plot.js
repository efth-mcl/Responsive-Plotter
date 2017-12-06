$(document).ready(function () {
    var hist = new HIST("Canvas", 500);
    hist.graph.Data.DataY = math.randomInt([math.randomInt(3,10)], 100)
    hist.graph.Data.DataX = math.range(1, hist.graph.Data.DataY.length)['_data']
    hist.PLOT_HISTOGRAM();
    hist.SetHistMessage();
    $(window).resize(function () { UpdateHist(hist) });
});
