function init () {
  Physics(function(world){

    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    var elLauncher = document.querySelector('#launcher');

    var renderer = Physics.renderer('dom', {
      el: 'viewport',
      width: viewWidth,
      height: viewHeight,
      meta: false
    });

    // add the renderer
    world.add( renderer );

    // render on each step
    world.on('step', function(){
      world.render();
    });

    // bounds of the window
    var viewportBounds = Physics.aabb(0, -100, viewWidth, elLauncher.offsetTop);

    // constrain objects to these bounds
    world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.5,
      cof: 0.5
    }));

    // pos: The position of the attraction point
    // strength: How strong the attraction is (default: 1)
    // order: The power of the inverse distance (default: 2 because that is newtonian gravity... inverse square)
    // max: The maximum distance in which to apply the attraction (default: Infinity)
    // min: The minimum distance above which to apply the attraction (default: very small non-zero)

    // var elPrimaryEnvelope = document.querySelector('#primary-envelope');

    // world.add(Physics.behavior('attractor', {
    //   pos: new Physics.vector(elPrimaryEnvelope.offsetLeft, elPrimaryEnvelope.offsetTop),
    //   strength: 10,
    //   min: 1,
    //   max: 10
    // }))

    // Add all the envelopes
    for (var i = 0; i < 60; i++) {
      setTimeout(function () {
        world.add(
          Physics.body('rectangle', {
            x: viewWidth / 2,
            y: 0,
            vx: (Math.random() / 15) * (Math.random() > 0.5 ? 1 : -1),
            vy: 0.1 * Math.random() + 0.4,
            width: 42,
            height: 42,
            cof: 0.5,
            restitution: 0.6
          })
        );
      }, Math.random() * 2000)
    }

    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    // add some gravity
    var gravity = Physics.behavior('constant-acceleration');
    gravity.setAcceleration({ x: 0, y: 0.0004 }); // default { x: 0, y: 0.0004 }
    world.add(gravity);

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time, dt ){
      world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();

  });
}

// Ensure the necessary elements are available since this script runs prior to DOM ready
var readyInterval = setInterval(function () {
  if (document.querySelector('#launcher')) {
    clearInterval(readyInterval);
    init();
  }
},1);
