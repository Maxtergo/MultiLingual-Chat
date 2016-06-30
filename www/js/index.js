/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$( ".register" ).animate({
    top: "-=150"
  }, 1000, function() {
    // Animation complete.
        $("#wide-buttons").fadeIn(500);
  });

//$(".creategroup").fadeIn(500);

function showform(datap){
    $("#wide-buttons").slideUp(500)
    $("#"+datap).slideDown(500)
}

function backbutton(datab){
    $("#"+datab).slideUp(500)
    $("#wide-buttons").slideDown(500)   
}

function al(data,res){
    if(res==1){
        $(".error").html("* "+data);
        $(".error").fadeIn(500);
        $(".error").delay(3000).fadeOut(500);
    }
    if(res==2){
        $(".success").html("* "+data);
        $(".success").fadeIn(500);
        $(".success").delay(3000).fadeOut(500);
    }
}

function signup(){
    
    var fbURL="http://yfy.venuehook.pk/signup.php";
    
    $.post( fbURL, { username: $("#username").val(), password: $("#password").val(), email: $("#email").val(), language: $("#language").val()})
    .done(function( data ) {
        if(parseInt(data)==-1){
            al("Username or Email already exist!",1);    
        }
        if(parseInt(data)==-2){
            al("Please fil the form correctly!",1);    
        }
        
        if(parseInt(data)==0){
            al("Your account has been successfully created.<br>You may Signin now.",2);
            backbutton("signup");
            
        }
        
    })
    .fail(function() {
        al( "Unknown Error!" ,1);
    });
}

function setCookie(cname, cvalue) {
    window.localStorage.setItem(cname, cvalue);
}

function getCookie(cname) {
    
    return window.localStorage.getItem(cname);
}

function dispAll(){
    return getCookie("email")+" "+getCookie("language");
}

function signin(){
    
    var fbURL="http://yfy.venuehook.pk/signin.php";
    
    window.localStorage.clear();
    
    $.post( fbURL, { email: $("#emaili").val(), password: $("#passwordi").val()})
    .done(function( data ) {
        document.cookie="";
        if(parseInt(data)==-1){
            al("Username or password is incorrect!",1);    
        }else if(parseInt(data)==-2){
            al("Incomplete information!",1);    
        }else{
            al("You are successfuly logged in..",2);
            //backbutton("signup");
            setCookie("email",$("#emaili").val(),2);
            var language=["English","French","German"];
            setCookie("language",language[parseInt(data)-1],2);
            
            window.location.href = "groups.html";
        }
        
    })
    .fail(function() {
        al( "Unknown Error",1 );
    });
    
}

function signout(){
    window.localStorage.clear();
    window.location.href = "index.html"
}

function groupsInit(){
    if(getCookie("email")==null){
        window.location.href = "index.html";
    }
    document.getElementById("email").innerHTML="<i class='fa fa-user'></i><a> Welcome "+getCookie("email")+"</a>";
    //alert(getCookie("email"));
}

function gotochat(data){
    setCookie('chat',data);
    window.location.href = "chat.html"
}

function creategroup(){
     var fbURL="http://yfy.venuehook.pk/membership.php";
    
    $.post( fbURL, { group: $("#group").val().replace(" ",""), email: getCookie("email").replace(" ","")})
    .done(function( data ) {
       
        if(parseInt(data)==-1){
            al("Group Already Existed!",1);    
        }else if(parseInt(data)==-2){
            al("Incomplete information!",1);    
        }else{
            al("You have successfully created a group.",2);
            window.location.href = "groups.html";
        }
    })
    .fail(function() {
        al( "Unknown Error",1 );
    });
}

function groupsInsert(d){
    if(d===0){
        var fbURL="http://yfy.venuehook.pk/groupInfo.php";
        //alert(getCookie("email").replace(" ","")+" "+getCookie("email").replace(" ","").length);
        $.post( fbURL, { email: getCookie("email").replace(" ","")}, "json")
        .done(function( data ) {
            var obj=jQuery.parseJSON(data);
            for(var key in obj){
                
                //
                
                $("#groups").append("<li class='left clearfix'><span class='chat-img pull-left'><a onclick=\"gotochat(\'"+ obj[key] +"\')\">\
                                        <img src='http://placehold.it/50/cccc00/fff&amp;text=GR' class='img-circle'>\
                                        \
                                    </span>\
                                        <div class='chat-body clearfix'>\
                                            <div style='padding-top:15px;' class='header'>\
                                                <strong class='primary-font'>"+obj[key]+"</strong> <small class='pull-right text-muted'>\
                                                    Click To Chat</small>\
                                            </div>\
                                        </div>\
                                    </a></li>");
            }
            
            
            
        })
        .fail(function() {
            alert( "Unknown Error" );
        });
        
        
    }else if(d === 1){
        
        var fbURL="http://yfy.venuehook.pk/getnotgroup.php";
        //alert(getCookie("email").replace(" ","")+" "+getCookie("email").replace(" ","").length);
        $.post( fbURL, { email: getCookie("email").replace(" ","")}, "json")
        .done(function( data ) {
            var obj=jQuery.parseJSON(data);
            for(var key in obj){
                
                //
                
                $("#groups").append("<li id='"+obj[key]+"' class='left clearfix'><span class='chat-img pull-left'><a onclick=\"addmetogroup(\'"+ obj[key] +"\')\">\
                                        <img src='http://placehold.it/50/cccc00/fff&amp;text=GR' class='img-circle'>\
                                        \
                                    </span>\
                                        <div class='chat-body clearfix'>\
                                            <div style='padding-top:15px;' class='header'>\
                                                <strong class='primary-font'>"+obj[key]+"</strong> <small class='pull-right text-muted'>\
                                                    Add me to group</small>\
                                            </div>\
                                        </div>\
                                    </a></li>");
            }
            
            
            
        })
        .fail(function() {
            alert( "Unknown Error" );
            
        });
    }
}

function addmetogroup(group){
    var fbURL="http://yfy.venuehook.pk/addmetogroup.php";
        //alert(getCookie("email").replace(" ","")+" "+getCookie("email").replace(" ","").length);
        $.post( fbURL, { email: getCookie("email").replace(" ",""),group:group})
        .done(function( data ) {
            $("#"+group).fadeOut(500);
        })
        .fail(function() {
            alert( "Unknown Error" );
            
        });
    
}


function receiver(){
    var fbURL="http://yfy.venuehook.pk/receiver.php";
    $.post( fbURL, { email: getCookie("email").replace(" ",""),group:getCookie("chat").replace(" ","")})
        .done(function( data ) {
            data = jQuery.parseJSON(data);
            
        
            msg = data.msg;
            time = data.time;
            email = data.email;
            alert(msg.length);
            
            for(i = 0; i < msg.length; i++) {
                if(email[i].replace(" ","") != getCookie("email").replace(" ","")){
                str="<li class='left clearfix'><span class='chat-img pull-left'>\
                                <img src='http://placehold.it/50/55C1E7/fff&amp;text=OT' alt='User Avatar' class='img-circle'>\
                            </span>\
                                <div class='chat-body clearfix'>\
                                    <div class='header'>\
                                        <strong class='primary-font'>"+email[i]+"</strong> <small class='pull-right text-muted'>\
                                            <span class='glyphicon glyphicon-time'></span>"+time[i]+"</small>\
                                    </div>\
                                    <p>"+msg[i]+"</p>\
                                </div>\
                            </li>";
                $("#chatmain").append(str);
                }
                //$('.panel-body').animate({ scrollDown: 0px }, 50);
            }
            
            
            
        })
    
        .fail(function() {
            alert( "Unknown Error" );
            
        });
}

function getData(){
    
    var fbURL="http://yfy.venuehook.pk/curtime.php";
    //alert($("#group").val()+" "+getCookie("email"));
    
    $.post(fbURL)
    .done(function( data ) {
        //alert(data);
        
        setTimeout(getData, 2000);
    })
    .fail(function() {
        //alert( "Unknown Error",1 );
        setTimeout(getData, 5000);
    });
}

function createThread(){
    //alert("aaa");
    setTimeout(getData, 2000);
    
}


function messagesend(){
    var fbURL="http://yfy.venuehook.pk/server.php";
    //alert(getCookie("chat").replace(" ","")+getCookie("email").replace(" ","")+ getCookie("language").replace(" ","")+ $("#message").val());
    
    
    $.post( fbURL, { room: getCookie("chat").replace(" ",""),email: getCookie("email").replace(" ",""),message: $("#message").val()})
    .done(function( data ) {
        if(data.length<5){
            str="<li class='right clearfix'><span class='chat-img pull-right'>\
                                <img src='http://placehold.it/50/FA6F57/fff&amp;text=ME' class='img-circle'>\
                            </span>\
                                <div class='chat-body clearfix'>\
                                    <div class='header'>\
                                        <small style='color:red' class=' text-muted'><span class='glyphicon glyphicon-time'></span> Message Not Sent </small>\
                                        <strong class='pull-right primary-font'>"+getCookie("email").replace(" ","")+"</strong>\
                                    </div>\
                                    <p style='text-align:right'>"+$("#message").val()+"\
                                    </p>\
                                </div>\
                            </li>";
            $("#chatmain").append(str);
            document.getElementById("message").value = "";
        }else{
            str="<li class='right clearfix'><span class='chat-img pull-right'>\
                                <img src='http://placehold.it/50/FA6F57/fff&amp;text=ME' class='img-circle'>\
                            </span>\
                                <div class='chat-body clearfix'>\
                                    <div class='header'>\
                                        <small class=' text-muted'><span class='glyphicon glyphicon-time'></span>"+data+"</small>\
                                        <strong class='pull-right primary-font'>"+getCookie("email").replace(" ","")+"</strong>\
                                    </div>\
                                    <p style='text-align:right'>"+$("#message").val()+"\
                                    </p>\
                                </div>\
                            </li>";
            $("#chatmain").append(str);
            document.getElementById("message").value = "";
        }
    })
    .fail(function() {
        str="<li class='right clearfix'><span class='chat-img pull-right'>\
                                <img src='http://placehold.it/50/FA6F57/fff&amp;text=ME' class='img-circle'>\
                            </span>\
                                <div class='chat-body clearfix'>\
                                    <div class='header'>\
                                        <small style='color:red' class=' text-muted'><span class='glyphicon glyphicon-time'></span> Message Not Sent </small>\
                                        <strong class='pull-right primary-font'>"+getCookie("email").replace(" ","")+"</strong>\
                                    </div>\
                                    <p style='text-align:right'>"+$("#message").val()+"\
                                    </p>\
                                </div>\
                            </li>";
            $("#chatmain").append(str);
            document.getElementById("message").value = "";
    });
}