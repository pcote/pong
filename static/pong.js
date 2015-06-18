var controller = function($scope, $interval, $log){
    var cxt = document.getElementById("canv").getContext("2d")
    var new_paddle_y;
    var ball_direction = 1
    var game_over = false

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

        if(ball_right_edge === 800){
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

        if(game_over === false){
            if(bounce_detected()){
                ball_direction = -ball_direction
            }

            if(ball.x < paddle.x){
                game_over = true
            }

            paddle.y = new_paddle_y
            ball.x += ball_direction
        }
    }

    var game_render = function(){
        // wipe slate
        cxt.clearRect(0, 0, 800, 800)

        // paddle render
        cxt.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)

        // ball render
        cxt.fillRect(ball.x, ball.y, ball.width, ball.height)
    }

    var game_cycle = function(){
        game_logic()
        game_render()
    }

    $interval(game_cycle, 4)

    $scope.mouse_action = function(evt){
        new_paddle_y = evt.pageY
    }
}

var app = angular.module("app", [])
app.controller("controller", controller)