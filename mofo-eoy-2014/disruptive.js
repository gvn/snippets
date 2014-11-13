function init () {
  Physics(function(world){

    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    const envelopeCount = 75;

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

    var envelopes = [];

    // Create and add all the envelopes
    for (var i = 0; i < envelopeCount; i++) {
      envelopes.push(new Physics.body('rectangle', {
        x: viewWidth / 2,
        y: 0,
        vx: (Math.random() / 15) * (Math.random() > 0.5 ? 1 : -1),
        vy: 0.1 * Math.random() + 0.4,
        width: 40,
        height: 30,
        angle: Math.random() * 360,
        cof: 0.5,
        restitution: 0.6
      }));

      setTimeout(function () {
        world.add(envelopes[i]);
        i--;
      }, Math.random() * 3000)
    }

    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    // add some gravity
    var gravity = Physics.behavior('constant-acceleration');
    gravity.setAcceleration({ x: 0, y: 0.0004 }); // default { x: 0, y: 0.0004 }

    world.add(gravity);

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time, dt ){
      world.step(time);
    });

    // start the ticker
    Physics.util.ticker.start();

    // Pause simulation after a while to stop pegging cpu
    setTimeout(function() {
      console.log('pausing world');
      world.pause();
    }, 20000);

  });
}

// Ensure the necessary elements are available since this script runs prior to DOM ready
var readyInterval = setInterval(function () {
  if (document.querySelector('#launcher')) {
    clearInterval(readyInterval);
    init();
  }
},1);
