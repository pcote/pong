(function(){
    var cxt = document.getElementById("canv").getContext("2d")
    var new_paddle_y;
    var ball_x_direction = 1
    var ball_y_direction = 0
    var game_over = false
    var SCREEN_WIDTH = 600
    var SCREEN_HEIGHT = 600

    function Sprite(x,y,w,h){
        this.x = x
        this.y = y
        this.width = w
        this.height = h
    }

    var ball = new Sprite(80, 20, 10, 10)
    var paddle = new Sprite(10, 10, 10, 80)

    var bounce_detected = function(){
        ball_right_edge = ball.x + ball.width
        ball_left_edge = ball.x
        paddle_right_edge = paddle.x + paddle.width
        paddle_top = paddle.y
        paddle_bottom = paddle.y + paddle.height

        if(ball_right_edge === SCREEN_WIDTH){
            return true
        }
        if(ball_left_edge === paddle_right_edge && ball.y >= paddle_top && ball.y <= paddle_bottom){
            return true
        }
        else{
            return false
        }
    }

    var game_logic = function(){
        // convenience variables for clearing up logic
        ball_right_edge = ball.x + ball.width
        ball_left_edge = ball.x
        ball_top_edge = ball.y
        ball_bottom_edge = ball.y + ball.height
        paddle_right_edge = paddle.x + paddle.width
        paddle_top = paddle.y
        paddle_bottom = paddle.y + paddle.height

        /* boolean condition checkers */
        var is_ball_collide_with_top_wall = function(){
            return ball_top_edge === 0
        }
        var is_ball_collide_with_bottom_wall = function(){
            return ball_bottom_edge === SCREEN_HEIGHT
        }
        var is_ball_collide_with_back_wall = function(){
            return ball_right_edge === SCREEN_WIDTH
        }
        var is_ball_collide_with_paddle = function(){
            return paddle_right_edge === ball_left_edge && ball_bottom_edge >= paddle_top && ball_top_edge <= paddle_bottom
        }

        /* actions */
        var bounce_off_top_wall = function(){
            ball_y_direction = 1
        }

        var bounce_off_bottom_wall = function(){
            ball_y_direction = -1
        }

        var bounce_off_back_wall = function(){
            ball_x_direction = -1
        }

        var bounce_off_paddle = function(){
            ball_x_direction = 1
            paddle_center = paddle.y + (paddle.height / 2)
            if(ball.y > paddle_center){
                ball_y_direction = 1
            }
            else{
                ball_y_direction = -1
            }
        }


        if(game_over === false){
            if(is_ball_collide_with_top_wall()){
                bounce_off_top_wall()
            }

            else if(is_ball_collide_with_bottom_wall()){
                bounce_off_bottom_wall()
            }
            else if(is_ball_collide_with_back_wall()){
                bounce_off_back_wall()
            }

            else if(is_ball_collide_with_paddle()){
                bounce_off_paddle()
            }

            else if(ball.x < paddle.x){
                game_over = true
            }

            paddle.y = new_paddle_y
            ball.x += ball_x_direction
            ball.y += ball_y_direction
        }
    }

    var game_render = function(){
        // wipe slate
        cxt.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

        // paddle render
        cxt.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)

        // ball render
        cxt.fillRect(ball.x, ball.y, ball.width, ball.height)
    }

    var game_cycle = function(){
        game_logic()
        game_render()
    }

    setInterval(game_cycle, 4)

    mouse_action = function(evt){
        new_paddle_y = evt.pageY
    }

    window.onmousemove = mouse_action
}())