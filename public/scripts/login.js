var loginPage = {
  var users = {
    "llamle": {
      password: "Leon",
      fullName: "Leon Lamle"
    },
    "dbodan": {
      password: "Dima",
      fullName: "Dmitriy Bodan"
    },
    "bgoodman": {
      password: "Brandon",
      fullName: "Brandon Goodman"
    }
  };

  function validate() {
      var un = document.getElementById("usern").value;
      var pw = document.getElementById("pword").value;
      var valid = -1;

      if (users[un] && user[un].password === pw) {
        alert ("Login was successful");
        document.getElementById("mandatory1").value = fnArray[valid];
      } else {
        alert("Invalid Username and/or Password! Please try again. You will not be able to submit this form without a successful login")
        document.getElementById("pword").value = "";
        document.getElementById("usern").value = "";
        document.getElementById("usern").focus();
      }
  },

  function newUser() {
      var unNew = document.getElementById("usernNew").value;
      var pwNew = document.getElementById("pwordNew").value;
      var fnNew = document.getElementById("fnameNew").value;

      users[unNew] = {"password" : pwNew, "fullName" : fnNew};
  },
};

$('newUser').on('click', function newUser());
