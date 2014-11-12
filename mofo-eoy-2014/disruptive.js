console.log('loaded disruptive.js');

Physics(function(world){

  var viewWidth = window.innerWidth;
  var viewHeight = window.innerHeight;

  var renderer = Physics.renderer('dom', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: false//, // don't display meta data
    // styles: {
    //     // set colors for the circle bodies
    //     'circle' : {
    //         strokeStyle: '#351024',
    //         lineWidth: 1,
    //         fillStyle: '#d33682',
    //         angleIndicator: '#351024'
    //     }
    // }
  });

  // add the renderer
  world.add( renderer );
  // render on each step
  world.on('step', function(){
    world.render();
  });

  // bounds of the window
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  // constrain objects to these bounds
  world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.99
  }));

  for (var i = 0; i < 50; i++) {
    world.add(
        Physics.body('rectangle', {
          x: Math.floor(Math.random() * viewWidth),
          y: 0, // y-coordinate
          vx: Math.random(), // velocity in x-direction
          vy: 0.01, // velocity in y-direction
          width: 42,
          height: 42
        })
    );

    console.log('hi');
  }

  // ensure objects bounce when edge collision is detected
  world.add( Physics.behavior('body-impulse-response') );

  // add some gravity
  world.add( Physics.behavior('constant-acceleration') );

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function( time, dt ){

      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

});
