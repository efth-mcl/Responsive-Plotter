function ScaleData(Data,ScFrom,ScTo,minD=0,maxD=100)
{
    return math.add(math.multiply(math.add(Data,-minD),(ScTo-ScFrom)/(maxD-minD)),ScFrom);
}
function TYPE(input)
{
    var T=Object.prototype.toString.call(input);
    T=T.replace("[object ","");
    T=T.replace("]","");
    if(T=="Array")
    {

        var i=0;
        while(i<input.length)
        {
            var Artype=(typeof input[i]);
            if(Artype!=(typeof input[0]))
            {

                return T+" Object";
            }
            i++;
        }
        return T+" "+Artype[0].toUpperCase()+Artype.substr(1);

    }
    return T;

}

function LoadData(dataX = null,dataY = null)
{
//string
//Array string
//Array number
//DataX
var DataX;
var DataY;

if(TYPE(dataX)=="String")
{
    DataX = dataX.split(',');
}
else if(TYPE(dataX)=="Array String")
{
    DataX = dataX;
}
//DataY
if(TYPE(dataY)=="String")
{
    DataY = dataY.split(',');
    for (var i = 0; i < DataY.length; i++)
    {
        DataY[i] = Number(DataY[i]);
    }
}
else if(TYPE(dataY)="Array Number")
{
    DataY = dataY;
}
return [DataX,DataY];
}
function Graph(CanvasID,Height)
{
    this.graphID=CanvasID;
    this.Canvas=document.getElementById(CanvasID);
    this.CanvasParent=$(this.Canvas).parent();
    this.Canvas.width=this.CanvasParent.width() - 20;
    this.Canvas.height=Height;
    this.Data={
        DataX: [""],
        DataY: [""]
    };
    this.StartPos={
        x:100,
        y:this.Canvas.height-65
    };
    this.EndPos={
        x:this.Canvas.width-20,
        y:15
    };

}

////////////////////////////////////////
/////////////TIMESIRIES BIGIN///////////
////////////////////////////////////////

TimeSires.prototype.SetTimeMessage = function()
{
    var self =this;
    console.log(self.TimeMessage(event))
    document.getElementById(this.graph.Canvas.id).onmousemove=function (e){self.TimeMessage(event)};
}
function TimeSires(CanvasID,Height,datax,datay)
{

    this.graph =new Graph(CanvasID,Height);
    $(".MessageDiv"+this.graph.Canvas.id).remove();

        $(this.graph.CanvasParent).append("<div id='TimeSiriesM"+this.graph.Canvas.id+"' class='T1 MessageDiv"+this.graph.Canvas.id+"'><span></span></div>");

        $(".T1").css({
            "position":"fixed",
            "width":"250px",
            "display":"none",
            "color":"#FFF",
            "background-color":"#5E00FF"
        });

    this.graph.Data.DataX=datax;
    this.graph.Data.DataY=datay;
    if(this.graph.Data.DataX!=null && this.graph.Data.DataY!=null)
    {
        this.PLOT_TimeSiries();

        this.SetTimeMessage();
    }
}
TimeSires.prototype.TimeMessage = function(event)
{
    var ctx = this.graph.Canvas.getContext("2d");
    var TimeMax=math.max(this.graph.Data.DataX);
    var TimeMin=math.min(this.graph.Data.DataX);
    var Normstats=ScaleData(this.graph.Data.DataY,this.graph.StartPos.y,this.graph.EndPos.y);
    var NormTime=ScaleData(this.graph.Data.DataX,this.graph.StartPos.x,this.graph.Canvas.width-5,TimeMin,TimeMax);

    //////

    var x = event.clientX;
    var y = event.clientY;
    var rect = this.graph.Canvas.getBoundingClientRect();

    var div = $("#TimeSiriesM"+this.graph.Canvas.id);
    //  ScaleData(Data,ScFrom,ScTo,minD=0,maxD=100)
    var XX=ScaleData(x, this.graph.StartPos.x+rect.left-40,this.graph.Canvas.width-5 +rect.left-div.width(),this.graph.StartPos.x+rect.left-40,this.graph.Canvas.width-5 +rect.left);



    var x = x - rect.left;
    var y = y - rect.top;
    var r=10;
    var check=math.prod(math.add(math.add(math.square(math.add(NormTime,-x)),math.square(math.add(Normstats,-y))),-(r*r)));
    if(check<0)
    {
        var i=math.abs(math.add(NormTime,-x)).indexOf(math.min(math.abs(math.add(NormTime,-x))));
        div.children("span").html("Date & Hour: <br>"+((new Date(this.graph.Data.DataX[i])).toLocaleString())+"<br>score: "+this.graph.Data.DataY[i]);
        div.fadeIn();
        div.css({
            "left": XX+ "px",
            "top": (y + rect.top - div.height()-20) + "px"
        });
    }
    else
    {
        div.fadeOut();
        div.children("span").html("");
    }

}
TimeSires.prototype.PLOT_TimeSiries= function(){



    var ctx = this.graph.Canvas.getContext("2d");
    var TimeMax=math.max(this.graph.Data.DataX);
    var TimeMin=math.min(this.graph.Data.DataX);
    var Normstats=ScaleData(this.graph.Data.DataY,this.graph.StartPos.y,this.graph.EndPos.y);
    var NormTime=ScaleData(this.graph.Data.DataX,this.graph.StartPos.x,this.graph.Canvas.width-5,TimeMin,TimeMax);


    /// Lines
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ///katheth grmamh
    ctx.moveTo(this.graph.StartPos.x,ScaleData(-1,this.graph.StartPos.y,this.graph.EndPos.y));
    ctx.lineTo(this.graph.StartPos.x,ScaleData(101,this.graph.StartPos.y,this.graph.EndPos.y));
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = "24px Arial";
    //time
    ctx.fillText("Time",(this.graph.Canvas.width-5- this.graph.StartPos.x-40)/2, ScaleData(-10,this.graph.StartPos.y,this.graph.EndPos.y));
    //Score
    ctx.fillText("Score",this.graph.StartPos.x-90, ScaleData(70,this.graph.StartPos.y,this.graph.EndPos.y));


    ctx.font = "14px Arial";
    //0%
    ctx.fillText("0%", this.graph.StartPos.x-40, ScaleData(0,this.graph.StartPos.y,this.graph.EndPos.y));
    ctx.moveTo(this.graph.StartPos.x-10, ScaleData(0,this.graph.StartPos.y,this.graph.EndPos.y));
    ctx.lineTo(this.graph.Canvas.width-5, ScaleData(0,this.graph.StartPos.y,this.graph.EndPos.y));
    //100%
    ctx.fillText("100%", this.graph.StartPos.x-40, ScaleData(100,this.graph.StartPos.y,this.graph.EndPos.y));
    ///
    ctx.stroke();
    //50%
    ctx.setLineDash([20, 15]);
    ctx.fillText("50%", this.graph.StartPos.x-40, ScaleData(50,this.graph.StartPos.y,this.graph.EndPos.y));
    ctx.moveTo(this.graph.StartPos.x-10, ScaleData(50,this.graph.StartPos.y,this.graph.EndPos.y));
    ctx.lineTo(this.graph.Canvas.width-5, ScaleData(50,this.graph.StartPos.y,this.graph.EndPos.y));
    ctx.stroke();
    ctx.closePath();



    ctx.beginPath();
    ctx.setLineDash([0, 0]);
    ctx.moveTo(NormTime[0],Normstats[0]);
    for(var i=1;i<NormTime.length;i++)
    {
        ctx.lineTo(NormTime[i],Normstats[i]);
        console.log(NormTime[i]+"   "+Normstats[i]);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    var radius = 5;

    ctx.beginPath();
    ctx.fillStyle = 'green';
    for(var i=0;i<NormTime.length;i++)
    {
        ctx.moveTo(NormTime[i], Normstats[i]);
        ctx.arc(NormTime[i], Normstats[i], radius, 0, 2 * Math.PI, false);
    }
    ctx.fill();
    ctx.closePath();

}
function UpdateTimeSiries(TimeSiriesObj)
{
    TimeSiriesObj.graph.Canvas.width=$(TimeSiriesObj.graph.Canvas).parent().width() - 20;
    TimeSiriesObj.graph.EndPos.x=TimeSiriesObj.graph.Canvas.width-20;
    TimeSiriesObj.PLOT_TimeSiries();
    TimeSiriesObj.SetTimeMessage();
}


/////////////////////////////////////////
/////////////TIMESIRIES END//////////////
/////////////////////////////////////////


/////////////////////////////////////////
///////////////HIST BIGIN////////////////
/////////////////////////////////////////
function HIST(CanvasID,Height,datax,datay)
{

    this.graph =new Graph(CanvasID,Height);
    $(".MessageDiv"+this.graph.Canvas.id).remove();

        $(this.graph.CanvasParent).append("<div id='Hist"+this.graph.Canvas.id+"' class='H1 MessageDiv"+this.graph.Canvas.id+"'><span></span></div>");

        $(".H1").css({
            "position":"fixed",
            "width":"80px",
            "display":"none",
            "color":"black"
        });

    this.graph.Data.DataX=datax;
    this.graph.Data.DataY=datay;
    if(this.graph.Data.DataX!=null && this.graph.Data.DataY!=null)
    {
        this.PLOT_HISTOGRAM();
    }

    $(this.graph.Canvas).hover(function (){
        $("#Hist"+this.id).show()
    },function (){
        $("#Hist"+this.id).hide()
    });
}

function UpdateHist(HistObj)
{
    HistObj.graph.Canvas.width=$(HistObj.graph.Canvas).parent().width() - 20;
    HistObj.graph.EndPos.x=HistObj.graph.Canvas.width-20;
    HistObj.PLOT_HISTOGRAM();
    HistObj.SetHistMessage();


}
HIST.prototype.SetHistMessage =function ()
{
    var self =this;
    document.getElementById(self.graph.Canvas.id).onmousemove=  function(e){self.HistMessage(event)};
}
HIST.prototype.PLOT_HISTOGRAM = function() {

    function SPLIT_TEXT(text,dx) {
        if (ctx.measureText(text).width >dx) {
            var h = 0;
            var pos = text.lastIndexOf(" ");
            console.log(text)
            text = text.substring(0, pos) + "." + text.substring(pos + 1);
            text = text.split(".");
            b = text[1];
            while (ctx.measureText(text[0]).width > dx) {
                pos = text[0].lastIndexOf(" ");
                if (pos == -1) {
                    break;
                }
                text[0] = text[0].substring(0, pos) + "." + text[0].substring(pos + 1);
                text = text[0].split(".");
                text[1] = text[1] + " " + b;
                b = text[1];
                if (ctx.measureText(text[0]).width <= dx) {
                    ctx.fillText(text[0], PosX, TextHeight + h);
                    //13~=font size
                    h = h + 13;
                    if (ctx.measureText(text[1]).width > dx) {
                        text = [text[1]];
                        b = "";
                    }
                }
            }
            if (h == 0 || pos == -1) {
                ctx.fillText(text[0], PosX, TextHeight + h);
                h = h + 13;
            }
            if (text[1] != " ")
                ctx.fillText(text[1], PosX, TextHeight + h);
        }
        else {
            ctx.fillText(text, PosX, TextHeight);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////END FUNCTIONS///////////////////////////////////////////////////

    var ctx=this.graph.Canvas.getContext("2d");

    //distance from top
    var T = this.graph.EndPos.y;

    var HistHeight = this.graph.StartPos.y;
    var TextHeight = HistHeight+ 20;
    var PosX0 = this.graph.StartPos.x;
    var PosX = PosX0;
    var DataX=this.graph.Data.DataX;
    console.log(DataX);
    var DataY=this.graph.Data.DataY;
    this.dx = ((this.graph.EndPos.x)-(PosX0)) /(2 * DataX.length-1);
    console.log("dx = "+ this.dx);


    ctx.font = "12px Arial";

    //HIST BIGIN
    var Hist = ScaleData(DataY,HistHeight,T);
    ctx.beginPath();
    for (var i = 0; i < DataX.length; i++) {

        ctx.fillStyle = 'black';
        SPLIT_TEXT(DataX[i],this.dx);

        ctx.fillStyle = '#f00';
        ctx.moveTo(PosX, HistHeight);
        ctx.lineTo(PosX, Hist[i]);

        PosX = PosX + this.dx;
        ctx.lineTo(PosX, Hist[i]);
        ctx.lineTo(PosX, HistHeight);
        PosX = PosX + this.dx;
    }
    ctx.closePath();
    ctx.fill();
    /// END HIST

    /// Lines
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;
    //0%
    ctx.fillText("0%", PosX0 - 40, ScaleData(0,HistHeight,T));
    ctx.moveTo(PosX0 - 10, ScaleData(0,HistHeight,T));
    ctx.lineTo(PosX - this.dx, ScaleData(0,HistHeight,T));
    ctx.stroke();

     ctx.setLineDash([20, 15]);
    //50%
    ctx.fillText("50%", PosX0 - 40,ScaleData(50,HistHeight,T));
    ctx.moveTo(PosX0 - 10, ScaleData(50,HistHeight,T));
    ctx.lineTo(PosX - this.dx, ScaleData(50,HistHeight,T));
    //100%
    ctx.fillText("100%", PosX0 - 40,ScaleData(100,HistHeight,T));
    ctx.moveTo(PosX0 - 10, ScaleData(100,HistHeight,T));
    ctx.lineTo(PosX - this.dx, ScaleData(100,HistHeight,T));
    ///
    ctx.stroke();
    ctx.fillText("50%", PosX0 - 40,ScaleData(50,HistHeight,T));
    ctx.moveTo(PosX0 - 10, ScaleData(50,HistHeight,T));
    ctx.lineTo(PosX - this.dx, ScaleData(50,HistHeight,T));
    ctx.stroke();



}

HIST.prototype.HistMessage = function(event) {
    var x = event.clientX;
    var y = event.clientY;
    var div = $("#Hist"+this.graph.Canvas.id);
    div.css("left", (x + 3) + "px");
    div.css("top", (y - div.height() - 3) + "px");
    var rect = this.graph.Canvas.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;
    if((x-this.graph.StartPos.x)>=0 && x-this.graph.EndPos.x<=0)
    {
        var i = Math.floor((x-this.graph.StartPos.x)/this.dx)
        if(i%2==0)
        {
            i=Math.ceil(i / 2)
            if (i < this.graph.Data.DataY.length)
            {
                div.children("span").html(this.graph.Data.DataY[i] + "%");
            }
            else if (i >= this.graph.Data.DataY.length)
            {
                div.children("span").html("No Data");
            }


        }
        else
        {
            div.children("span").html("");
        }
    }
    else
    {
        div.children("span").html("");
    }
}
////////////////////////////////////////////
//////////////////END HIST//////////////////
////////////////////////////////////////////
