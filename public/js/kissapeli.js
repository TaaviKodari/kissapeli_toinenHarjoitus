let taustakuva;
let kissakuva;
let lautanY = 350;
let lautan_leveys = 80;
let taustan_korkeus = 400;
let taustan_leveys = 800;

var kissalista = [];
var kissa_ajastin;
var elamia_jaljella = 9;
var pelastetut_kissat = 0;
function  preload(){
  //taustakuva = loadImage('https://igno.cc/opetus/kuvat/tausta.png');
  taustakuva = loadImage ('https://graphicriver.img.customer.envatousercontent.com/files/260591795/snowy%20fir%20trees%20at%20night%20_pv.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=1c178aeab073fa29e1c49e0caeb244ce')
  //kissakuva = loadImage('https://igno.cc/opetus/kuvat/cat.png');
  kissakuva = loadImage('https://lh3.googleusercontent.com/proxy/dLwoCXzaOSkRxioP_TRDVhgoc43dTZ4nutRc93k9umncTL5HR82yapw_ab734FUDo2dfGJerXforRUgNfsC7ROq0-R3BC5IA');
}

function setup(){
  var canvas = createCanvas(taustan_leveys,taustan_korkeus);
  canvas.parent("kissapeli");
  angleMode(DEGREES);
  luo_kissoja();
  //clearTimeout(kissa_ajastin);
}

function draw(){
  image(taustakuva,0,0,taustan_leveys,taustan_korkeus);

  luo_lautta();

  kissalista.forEach(function(kissa_olio, monesko) {
    kissa_olio.liikuta();

    if(kissa_olio.Y > taustan_korkeus)
    {
      kissalista.splice(monesko,1);
      elamia_jaljella = elamia_jaljella -1;
    }

    if (kissa_olio.X > taustan_leveys) {
      kissalista.splice(monesko,1);
      pelastetut_kissat = pelastetut_kissat +1;
    }
  });
 textSize(40);
 textAlign(LEFT,TOP);
 text("Elämät: " + elamia_jaljella + " pelastetut kissat: " + pelastetut_kissat,5,5);
if(elamia_jaljella <= 0)
{
  gameOver();
}
}

function luo_lautta(){
  fill('#ffe6e6');
  rect(mouseX, taustan_korkeus - 50, lautan_leveys,30,20,20,0,0);
}

function luo_kissoja(){
  let uusi_kisu = new Kissa();
  kissalista.unshift(uusi_kisu);
  kissa_ajastin = setTimeout(luo_kissoja,2000);
}

class Kissa {
  constructor() {
    this.X = 30;
    this.Y = 200;
    this.Xnopeus = 2;
    this.Ynopeus = -2; // lähetetään kissa yläspäin ja painovoima tuo sitten alaspäin
    this.korkeus = 50;
    this.leveys = 50;
    this.kulma = 0;
  }

  liikuta(){
  this.X = this.X + this.Xnopeus;
  this.Ynopeus = this.Ynopeus + 0.05;
  if(this.Y + this.korkeus/2 > lautanY)
  {
    if(this.X > mouseX && this.X < mouseX + lautan_leveys)
    {
      this.Ynopeus = -abs(this.Ynopeus);
    }
  }
  this.Y = this.Y + this.Ynopeus;
  this.kulma = this.kulma + 1;
  push();
  translate(this.X,this.Y);
  rotate(this.kulma);
  imageMode(CENTER);
  image(kissakuva,0,0,this.leveys,this.korkeus);
  pop();
  }
}

function gameOver()
{
  noLoop();
  textSize(80);
  textAlign(CENTER)
  text("Game Over",taustan_leveys/2,taustan_korkeus/2);
}
