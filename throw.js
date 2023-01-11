AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
    this.removeBall();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        scene.appendChild(ball );
        //add the collide event listener to the bullet
        ball.addEventListener("collide", this.removeBall);
      }
      removeBall: function (e) {

        //bullet element
        var element = e.detail.target.el;

        //element which is hit
        var elementHit = e.detail.body.el;

        if (elementHit.id.includes("pin")) {

          //impulse and point vector
          var impulse = new CANNON.Vec3(0,1,-15);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );

          elementHit.body.applyForce(impulse, worldPoint);

          
          //remove event listener
          element.removeEventListener("collide", this.removeBall);

          //remove the bullets from the scene
          var scene = document.querySelector("#scene");
          scene.removeChild(element);

        }

      };

     


      
    });
  },
});


