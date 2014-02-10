// FX.js
//   - Nicholas Hydock
// =======================
//
// Just some custom JS effects for the theme
// Nothin all too special.  Primarily designed
// just to add some flair to the theme and
// help it stand out from others.
//
// Make sure JQuery and Bootstrap.js are
// imported into the HTML before this, as
// this file is dependent on their operations
// and methods.
//

//function that'll scroll the page up to the top when the title
//button in the header bar is clicked
function reset(){

	$("html, body").animate({ scrollTop: 0 }, "slow");
}

//function that occurs on scrolling
//causes the header bar to slide in our out depending on current document position
var permtop = $("#controls").offset().top;
var refresh = function(){

	var windowTop = $(document).scrollTop();

	if (windowTop > permtop)
	{
	    $("#controls").css(
	    	{ 
	    		position: 'fixed', 
	    		top: 0, 
	    		width: $(document).width()
	    	}
	    );
	    $("#wrapper").css(
	    	{ 
	    		'margin-top': $(".navbar").height() 
	    	}
	    );
	}
	else
	{
	    $("#controls").css({ position: 'relative', top: 0, width: $(document).width()});
	    $("#wrapper").css({ 'margin-top': "0px" });
	}

	$("controls").css({width: "100%"});
}

//function that checks if there's a livestream connection
function livestream(channelName){
	    
    var chan = "http://api.justin.tv/api/stream/list.json?channel="+channelName+"&jsonp=?";
    var result = false;
	$.getJSON(chan, function(json)
    {
        try
        {
            var check = json[0].channel.channel_url == "http://www.justin.tv/"+channelName;
            result = true;
        }
        catch (err)
        {
        }
    });

    return result;
}

//construct tag menu
function constructTagMenu(){

	var tags = '{text:Popular Tags}'.split(",");
    for (var i = 0; i < tags.length; i++)
    {
        var tag = tags[i].trim();
        var item = document.createElement("li");
        var link = document.createElement("a");
        
        link.setAttribute("href", "/tagged/"+tag.toLowerCase().replace(/\s/, '-'));
        link.innerHTML = tag;
        item.appendChild(link);
        $("#TagMenu").append(item);
    }
}

function constructBlogMenu(){

	//construct blog menu
    var blogs = '{text:Blogs}'.split(",");
    for (var i = 0; i < blogs.length; i++)
    {
        var blog = blogs[i].split("|");
        var item = document.createElement("li");
        var link = document.createElement("a");
        
        link.setAttribute("href", blog[1].trim());
        link.innerHTML = blog[0].trim();
        item.appendChild(link);

        $("#BlogMenu").append(item);
    } 
}

function pageExists(url)
{
	var http = new XMLHttpRequest();
    http.open('HEAD', '/about', false);
    http.send();
    return (http.status != 404);
}

function setup() {
    $('.link_copied').css({ 'bottom': -$(this).outerHeight() });
    
    //show about if the page does exists
    if (pageExists('/about')){
        $("#about").css({display:"block"});
    }
    
    //little highlight glow on the side of posts to indicate which
    //one the mouse is currently over
    $('#wrapper #content .post').hover(
        function(){
            $(this).children('.activeind').stop().animate({ opacity:1.0 }, 200);
            $(this).children('.btn-group-vertical').stop().animate({ opacity: 1.0 }, 200);
        },
        function(){
            $(this).children('.activeind').stop().animate({ opacity:0 }, 200);
            $(this).children('.btn-group-vertical').stop().animate({ opacity: 0 }, 200);
        }
    );
    
    $('#wrapper #content .post .btn-group-vertical .btn').hover(
      function(){
            $(this).stop().animate({width: '200px'}, 200);
      },
      function(){
            $(this).stop().animate({width: '44px'}, 200);
      }
    );
    
    //make a menu appear when a header bar button is hovered over
    $('.dropdown').hover(
    
        function(){
            var menu = $(this).children('ul');
            $(menu).css({display: "block"});
            $(menu).stop().animate({ opacity: 1.0 , 'margin-top': 2}, 200);
        },
        function(){
            var menu = $(this).children('ul');
            $(menu).stop().animate({ opacity: 0 , 'margin-top': -6}, 200, function(){$(menu).css({display: "none"})});
        }
    );
    
    
    
    $('.dropdown-toggle').dropdown();
    $('.dropdown-toggle').dropdownHover();
    
    if (document.URL.match(/ask$/))
    {
        $('#disqus_thread').css("display", "none");
    }
    
    //hide certain elements on pages that don't have them
    var url = '{Permalink}';
    if (url.match(/\/post\//) == null){
        $("#wrapper #content .post .panel-heading").hide();
        $("#wrapper #content .post .controls").hide();
        $("#wrapper #content .post .footer").hide();
        
    }
                    
    refresh();
}