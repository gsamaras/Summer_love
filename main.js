var sunTapped_global = 0;
var timer_global;

function clearWaves() {
  clearTimeout(timer_global);
  document.getElementById("tapTxt").innerHTML="";
  document.getElementById("wave1").style.opacity = 0;
  document.getElementById("wave2").style.opacity = 0;
  document.getElementById("oceanDiv").style.opacity = 0;
  document.getElementById("sonarWave").classList.remove("sonar-wave");
  document.getElementById("sooperIdea").classList.remove("hide");
  setTimeout(hideSooperIdea, 4000);
  document.getElementById("sandWriting").style.opacity = 1;
  document.getElementById("loveTxt").style.opacity = 1;
  document.getElementById("heart").style.opacity = 1;
  sunTapped_global = 1;
  document.getElementsByClassName("sonar-emitter")[0].removeAttribute("onclick");
  document.getElementsByClassName("sonar-emitter")[0].style.cursor = "default";
}

function hideSooperIdea() {
  document.getElementById("sooperIdea").style.opacity=0;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

var greek = ["\u03B1", "\u03B2", "\u03B3", "\u03B4", "\u03B5", "\u03B6", "\u03B7", "\u03B8",
"\u03B9", "\u03BA", "\u03BB", "\u03BC", "\u03BD", "\u03BE", "\u03BF", "\u03C0", "\u03C1",
"\u03C3", "\u03C4", "\u03C5", "\u03C6", "\u03C7", "\u03C8", "\u03C9"
];

window.onload = function() {
  var url = window.location.href;
  var i = url.indexOf("?");
  if(i >= 0)
  {
    document.getElementById("startBtn").style.opacity = 0;
    var first_part = url[i + 1];
    if(url[i + 2] != '=')
      first_part += url[i + 2];
    var equal_sign_i = url.indexOf("=");
    var second_part = url[equal_sign_i + 1];
    if(equal_sign_i + 2 != url.length)
      second_part += url[equal_sign_i + 2];
    var first_letter = (isLetter(first_part)) ? first_part : greek[first_part];
    var second_letter = (isLetter(second_part)) ? second_part : greek[second_part];
    document.getElementById("loveTxt").innerHTML = first_letter + " + " + second_letter;
    if(!sunTapped_global)
      timer_global = setTimeout(writeTap, 4000);
  }
  else
  {
    document.getElementById("startBtn").focus();
    document.getElementById("sonarWave").classList.remove("sonar-wave");
  }
};

function writeTap() {
  document.getElementById("tapTxt").innerHTML="Tap";
}

$("#okBtn").on("click touchstart", function(){
    $("#form1div").hide();
    $(".modal-title").text("Share this link with your loved one!");
    $('label[for="hers"]').text("");
    var hers_val = $("#hers").val();
    var hers_i = greek.indexOf(hers_val.toLowerCase());
    var hers_char = (hers_i == -1) ? hers_val : hers_i;
    var his_val = $("#his").val();
    var his_i = greek.indexOf(his_val.toLowerCase());
    var his_char = ( his_i == -1 ) ? his_val : his_i;
    $("#hers").attr('maxlength', '70');
    $("#hers").val(function () {return "http://cgi.di.uoa.gr/~grad1459/summer_love/index.html?" + hers_char + "=" + his_char;})
    document.getElementById('hers').readOnly = true;
    document.getElementById('hers').disabled = true;
    document.getElementById('hers').style.cursor = "copy";
    $("#copyBtn").removeClass("hide");
    $(this).hide();
});

$(document).ready(function(){
    $('form > div > input').keyup(function() {
        var empty = false;
        $('form > div > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
            $('#okBtn').attr('disabled', 'disabled');
        } else {
            $('#okBtn').removeAttr('disabled');
        }
    });

    $('#hers').bind('keyup blur',function(){
      var node = $(this);
      node.val(node.val().replace(/[^A-ZA-zΑ-Ωα-ωίϊΐόάέύϋΰήώ]/g,'') ); }
    );
    $('#his').bind('keyup blur',function(){
      var node = $(this);
      node.val(node.val().replace(/[^A-ZA-zΑ-Ωα-ωίϊΐόάέύϋΰήώ]/g,'') ); }
    );
});

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();

    $("#copiedNotification").removeClass("hide");
    setTimeout(function() { $("#copiedNotification").fadeOut(1000); }, 5000);
}

