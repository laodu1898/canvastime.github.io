let WINDOW_WIDTH = 1024;
let WINDOW_HEIGHT = 768;
let RADIUS = 8;
let MARGIN_TOP = 60;
let MARGIN_LEFT = 30;
let settime = [22,00,2]
let canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
let balls = [];
let add = 0
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    render( context )

}

let interval = setInterval(() => {
    updatetime()
    render(context)
},15)


function updatetime () {

    let cur = [...settime]
    if (settime[1] === 0 && settime[2] === 0 && settime[0] === 0) {
        return settime = [0,0,0]
    }
    add++
    if (add === 67){
        add = 0
        settime[2]--
    }
    if (settime[2] === 0 ){
        if (settime[1] === 0){
            if (settime[0] === 0){
                return settime = [0,0,0]
            }
            settime[1] = 60
            settime[0]--
        }
        settime[1]--
        settime[2] = 60
    }
    let next = [...settime]
    changeballs(cur,next)
    updateBalls()
}



function render( cxt ){

    var hours = settime[0]
    var minutes = settime[1]
    var seconds = settime[2]
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
}

function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
}

function changeballs (cur,next){
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},0)
   setTimeout(() => {
       if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
   },50)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},150)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},250)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},350)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},450)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},550)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},650)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},750)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},850)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},950)
    setTimeout(() => {
        if( next[2] != cur[2]){
        if( parseInt(cur[0]/10) != parseInt(next[0]/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(cur[0]/10) );
        }
        if( parseInt(cur[0]%10) != parseInt(next[0]%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cur[0]/10) );
        }

        if( parseInt(cur[1]/10) != parseInt(next[1]/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]/10) );
        }
        if( parseInt(cur[1]%10) != parseInt(next[1]%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cur[1]%10) );
        }

        if( parseInt(cur[2]/10) != parseInt(next[2]/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]/10) );
        }
        if( parseInt(cur[2]%10) != parseInt(next[2]%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(cur[2]%10) );
        }
    }
},1000)


}
