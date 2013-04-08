var body = document.getElementsByTagName('head')[0];
// adding  the script file 


// adding  the css file 
var link = document.createElement("link");
var src = "https://c9.io/juan-lavaina/widgets/workspace/css/youtube.css";

link.setAttribute('href',src);
link.setAttribute('type',"text/css");
link.setAttribute('rel',"stylesheet");
body.appendChild(link);


var divVideos = document.getElementById('youTubeVideos');
var youTubeUser = divVideos.getAttribute('youTubeUser');

var widget = new youTube(youTubeUser);
var videos = widget.getVideos();

var html = "<table>";
for(var x = 0; x<videos.length; x++){

    html +="<tr>";
    html += "<td>";
    html +="<div class = 'youTube'>";
    html += "<a href = '#'><img src = '"+videos[x].imgMD+"' /><span class = 'play'><span></span></span></a>";
    html +="</div>"
    html += "</td>";
    
    html +="<td>";
    html +="<label>"+videos[x].title+"</label>";
    html +="</td>";
    html +="</tr>";
}
html += "</table>";

divVideos.innerHTML = html;
