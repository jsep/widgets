function youTube(obj){
    
    if(!(this instanceof youTube)){
        throw new Error ("Constructor can't be called as a function");
    }
    
    this.user = "";
    this.data = "";
    this.numOfVideos = 10;
    this.urlVideosData = "";
    this.dataType = "jsonc";
    this.apiVersion = "2";
    
     /* Settings the values */
    if(typeof obj === "string")
    {
        // If the parameter is a string is the youTube user
        this.user = obj;
    }else if(typeof obj === "object"){
        
        this.user = (typeof obj.user !== "undefined")?obj.user:"";
        this.numOfVideos = (typeof obj.numOfVideos !== "undefined")?obj.numOfVideos:10;
    }
    
    this.urlVideosData = "https://gdata.youtube.com/feeds/api/users/"+this.user+"/uploads?v="+this.apiVersion+"&alt="+this.dataType;
    
    
    /*End settings the values */
 
}

youTube.prototype.getData = function(){
    
    if( this.user == "" )
    {
         throw new Error ("No user specified. Need a youtube user to proceed");
    }
    // creating de XMLHttpRequest
    var objRequest = "";
   
    if(window.XMLHttpRequest)
    { // code for IE7+, Firefox, Chrome, Opera, Safari      
        objRequest = new XMLHttpRequest();
    }else{
        // code for IE6, IE5
        objRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Making the request
    this.obj = objRequest;
    objRequest.open("GET",this.urlVideosData,false);
    objRequest.send();
    this.data = JSON.parse(objRequest.responseText);
    return this.data;
    
}

youTube.prototype.getVideos = function(){
    
    if(this.data == "")
        this.data = this.getData();

    var videos  = [];
    for (var i = 0; i < this.numOfVideos; i++) {
        var video = this.data.data.items[i];
        video.img1 = "http://i3.ytimg.com/vi/"+video.id+"/1.jpg";
        video.img2 = "http://i3.ytimg.com/vi/"+video.id+"/2.jpg";
        video.img3 = "http://i3.ytimg.com/vi/"+video.id+"/3.jpg";
        video.imgSD = video.thumbnail.sqDefault;
        video.imgHD = video.thumbnail.hqDefault;
        video.imgMD = "http://i3.ytimg.com/vi/"+video.id+"/mqdefault.jpg";
        
        videos.push(video);
    }    
    
    return videos;
        
}

youTube.prototype.getVideosHTML = function(){
    
    if(this.data == "")
        this.data = this.getData();

    var videos = widget.getVideos();
    
    var html = "<div class = 'divContainerYouTube'>";
    html += "<table>";
    
    for(var x = 0; x<videos.length; x++){
    
        html +="<tr>";
        html += "<td>";
        html +="<div class = 'youTube'>";
        html += "<a href = '#'><img src = '"+videos[x].imgMD+"' /><span class = 'play'><span></span></span></a>";
        html +="</div>"
        html += "</td>";
        
        var title = (videos[x].title.length > 30 )?videos[x].title.substring(0,30)+" ...":videos[x].title;
        
        html +="<td>";
        html +="<label>"+title+"</label>";
        html +="</td>";
        html +="</tr>";
    }
    
    html += "</table>";
    html += "</div>";
    
    return html;
        
}



// implementing the script

var head = document.getElementsByTagName('head')[0];

// adding  the css file 
var link = document.createElement("link");
var src = "https://c9.io/juan-lavaina/widgets/workspace/css/youtube.css";

link.setAttribute('href',src);
link.setAttribute('type',"text/css");
link.setAttribute('rel',"stylesheet");

head.appendChild(link);

var divVideos = document.getElementById('youTubeVideos');
var youTubeUser = divVideos.getAttribute('youTubeUser');

var widget = new youTube(youTubeUser);
var html = widget.getVideosHTML();

divVideos.innerHTML = html;