

var btn_s = document.getElementById("btn_s")

document.getElementById("lab").style.transform = "translateX(0px)"
document.getElementById("info").innerText = "Iam New Bounty Hunter"
btn_s.addEventListener("click", () => {
    var lab = document.getElementById("lab")
    if (lab.style.transform == "translateX(0px)") {
        document.getElementById("info").innerText = "Iam Experianced Bounty Hunter"
        lab.style.transform = "translateX(-500px)"
    }
    else {
        lab.style.transform = "translateX(0px)"
        document.getElementById("info").innerText = "Iam New Bounty Hunter"
    }
})


$(document).ready(function () {
    console.log("Login or sign UP page")
})

function loginData() {

}

$(function () {
    $("#code_gen").click(
        function () {

            s_code = "";
            var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            for (var i = 0; i < 6; i++) {
                var r = Math.floor(Math.random() * 36)
                s_code += letters[r]
            }
            $("#c_s_code").val(s_code)
            console.log(s_code);
            

        }
    )

    $("#create_id").click(function () {
        var name, m_no, s_code;

        name = $("#c_name").val();
        m_no = $("#c_p_no").val();
        s_code = $("#c_s_code").val()

        if (name !== "" && m_no !== "" && s_code !== "") {
            var db = firebase.database();
            db.ref("/users/" + m_no + "/").set({
                name: name,
                mobileNumber: m_no,
                secretCode: s_code,
                life:100,
                score:0,
                status:"offline"
            });
            alert("Successfuly created the user...")
            document.getElementById("lab").style.transform = "translateX(0px)"
            document.getElementById("lab").innerText = "Iam New Bounty Hunter"

  
        }
        else {
            alert("please fill up the detials") 

        }

    })


    $("#start_g").click(function(){
        var name, m_no, s_code;

        name = $("#name").val();
        m_no = $("#p_no").val();
        s_code = $("#s_code").val()
        var secretCodeDB , nameDB , mobDB;

        if(name !== "" && m_no !== "" && s_code !== ""){
            var db = firebase.database();
            db.ref("/users/"+m_no+"/").on("value",(data)=>{
               secretCodeDB = data.val().secretCode;
               nameDB = data.val().name;
               mobDB = data.val().mobileNumber;
               //console.log(secretCodeDB,nameDB,mobDB);
               //console.log(name, m_no, s_code);
               status
    
               if(name == nameDB  && m_no==mobDB && secretCodeDB==s_code){
                   alert("All ok....")
                   location.replace("./Game Page/game_p.html?user_id="+mobDB)
               }else{
                   alert("The data does not match...You are an intruder....")
               }
            });

   
           
        }
        else{

        }
    })
    
})

function signUpData() {

}