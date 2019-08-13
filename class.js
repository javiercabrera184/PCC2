"use strict";


exports.Datos = function(match,player,x,y,time) {
  this.match=match;
  this.player=player;
  this.x=x;
  this.y=y;
  this.time=time;
  this.ID = crea_id(match,player,time);
}

function crea_id(match,player,time){
  return match+","+player+","+time;
}
