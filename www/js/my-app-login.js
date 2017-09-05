var loginView = myApp.addView('.view-login', {
    domCache: true
});

$$('#login').on('click', function () {

    myApp.showPreloader('Logging in')

	var uname = $$('.login-screen input[name = "username"]').val();
	var pwd = $$('.login-screen input[name = "password"]').val();
	var query = 'http://192.168.0.111:8080/login.json';
	var postdata ={};

	postdata.username = uname;
	postdata.password = pwd;
	$$.ajax({
        url: query,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(postdata),
        success: function(data, textStatus ){
            myApp.hidePreloader();
            myApp.closeModal();
        },
        error: function(xhr, textStatus, errorThrown){
            myApp.hidePreloader();
            myApp.alert('Login was unsuccessful, please verify username and password and try again');

            $$('#login-email').val('');
            $$('#login-password').val('');
        }
	});
});

 //sign up

$$('#good').on('click', function () {
    myApp.showPreloader('Signing up')
    var uname = $$('.login-screen input[name = "S-username"]').val();
    var pwd = $$('.login-screen input[name = "S-password"]').val();
    var email = $$('.login-screen input[name = "S-email"]').val();
    var vcode = $$('.login-screen input[name = "verify"]').val();
    var query = 'http://192.168.0.111:8080/login.json';
    var postdata ={};

    postdata.username = uname;
    postdata.password = pwd;
    postdata.email = email;
    postdata.vcode = vcode;
    $$.ajax({
        url: query,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(postdata),
        success: function(data, textStatus ){
            // We have received response and can hide activity indicator
            myApp.hidePreloader();
            myApp.alert('We have sent a mail to your email address, Please confirm your email address to complete the registration');
            loginView.router.loadPage({pageName: 'login'});
            $$('.login-screen input[name="username"]').val(uname);
        },
        error: function(xhr, textStatus, errorThrown){
            // We have received response and can hide activity indicator
            myApp.hidePreloader();
            myApp.alert('Registration was unsuccessful, please verify the information');

            $$('#login-email').val('');
            $$('#login-password').val('');
        }
	});
});



 $$('.hide').on('click', function () {

        var htmlStr =   '<li class="item-content">'+
                        '	<div class="item-inner">'+
                        '		<div class="item-title label">'+
                        '			Email'+
                        '		</div>'+
                        '		<div class="item-input">'+
                        '			<input name="email" placeholder="Enter the Email" type="email">'+
                        '		</div>'+
                        '	</div>'+
                        '</li>';

        $$('#hide').append(htmlStr);
        $$('#disapp').html(" ");
        $$('#login').html("");
		$$('#back').show();

		$$('#good').show();
 });

 $$('#back').on('click', function () {
	Window.location='index.html';
 });
