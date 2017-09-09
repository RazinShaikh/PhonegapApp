var loginView = myApp.addView('.view-login', {
    domCache: true
});

$$('#login').on('click', function () {

    myApp.showPreloader('Logging in');

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
            myApp.alert('Incorrect username or password', 'Login failed');
            $$('.login-screen input[name = "password"]').val('');
        }
    });
});

 //sign up

$$('#signup').on('click', function () {
    myApp.showPreloader('Signing up')
    var uname = $$('.login-screen input[name = "S-username"]').val();
    var pwd = $$('.login-screen input[name = "S-password"]').val();
    var email = $$('.login-screen input[name = "S-email"]').val();
    var query = 'http://192.168.0.111:8080/login.json';
    var postdata ={};

    postdata.username = uname;
    postdata.password = pwd;
    postdata.email = email;
    $$.ajax({
        url: query,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(postdata),
        success: function(data, textStatus ){
            // We have received response and can hide activity indicator
            myApp.hidePreloader();
            myApp.alert('Verification message has been sent to '+email+'. Please confirm your email address to complete the registration.', 'Verify your email');
            $$('.login-screen input[name = "S-username"]').val('');
            $$('.login-screen input[name = "S-email"]').val('');
            $$('.login-screen input[name = "S-password"]').val('');
            $$('.login-screen input[name = "S-confirmPassword"]').val('');
            $$('.login-screen input[name = "username"]').val(uname);
            loginView.router.loadPage({pageName: 'login'});
        },
        error: function(xhr, textStatus, errorThrown){
            // We have received response and can hide activity indicator
            myApp.hidePreloader();
            myApp.alert('Please verify your information', 'Registration unsuccessful');
            $$('.login-screen input[name = "S-password"]').val('');
            $$('.login-screen input[name = "S-confirmPassword"]').val('');
        }
    });
});

