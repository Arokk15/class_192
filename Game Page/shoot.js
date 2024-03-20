AFRAME.registerComponent("bullets",{
    init:function(){
        this.shoot_b()
    },
    shoot_b:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1 ,               
                })
                bullet.setAttribute("material","color","black")
              //  console.log("A bullet is created...")
              var cam=document.querySelector("#cam")
              var pos=cam.getAttribute("position")
              bullet.setAttribute("position",{
                x:pos.x,
                y:pos.y,
                z:pos.z
              })
              var camera=document.querySelector("#cam").object3D;
              var direction=new THREE.Vector3()
              camera.getWorldDirection(direction)
              bullet.setAttribute("velocity",direction.multiplyScalar(-10))

              bullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:0,
                
              })
              var scene = document.querySelector("#scene");

              bullet.addEventListener("collide",this.remove_b)
              
              scene.appendChild(bullet);

              

              var posCheck=  bullet.getAttribute("velocity");
              console.log(posCheck)
              if(posCheck.z <-2){
                var scene = document.querySelector("#scene");
                scene.removeChild(bullet)
              }
              


            }
        })
    },
    remove_b:function(e){
        
        var b_element=e.detail.target.el
        console.log(b_element)
        var e_element=e.detail.body.el
        console.log(e_element.id)
        if(e_element.id.includes("points")){
            e_element.setAttribute("material",{
                opacity:0
            })
            var scene = document.querySelector("#scene");
            var scene_e = document.querySelector("#enemy_c");

            var scoreEl=document.querySelector("#score_v")
            var scoreTotal = parseInt(scoreEl.getAttribute("text").value)
            scoreTotal += 5;
            scoreEl.setAttribute("text",{
                value:scoreTotal
            })
     
            var db=firebase.database();
            var userID = document.querySelector("#userID_details")
            var userData = parseInt(userID.getAttribute("text").value)
            db.ref("/users/"+userData).update({
                score: scoreTotal
            })


            
            scene_e.removeChild(e_element)
            scene.removeChild(b_element)
        
        }
        
    }

    
 })