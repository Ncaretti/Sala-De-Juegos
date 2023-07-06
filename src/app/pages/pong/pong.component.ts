import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css']
})
export class PongComponent {
  @ViewChild('pongCanvas', { static: true }) pongCanvasRef!: ElementRef;
  context!: CanvasRenderingContext2D;

  canvasWidth: number = 800;
  canvasHeight: number = 400;
  paddleWidth: number = 10;
  paddleHeight: number = 60;
  paddleSpeed: number = 5;
  ballRadius: number = 5;
  ballSpeedX: number = 3;
  ballSpeedY: number = 3;

  paddle1Y: number = (this.canvasHeight - this.paddleHeight) / 2;
  paddle2Y: number = (this.canvasHeight - this.paddleHeight) / 2;
  ballX: number = this.canvasWidth / 2;
  ballY: number = this.canvasHeight / 2;

  keysPressed: Set<string> = new Set<string>();

  isGameRunning: boolean = false;
  player1Score: number = 0;
  player2Score: number = 0;
  maxScore: number = 5;

  constructor() { }

  ngOnInit() {
    this.context = this.pongCanvasRef.nativeElement.getContext('2d');
    setInterval(() => {
      if (this.isGameRunning) {
        this.move();
        this.draw();
        this.checkCollision();
        this.checkScore();
      }
    }, 10);
  }

  move() {
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;

    // Move paddles
    if (this.keysPressed.has('w')) {
      this.movePaddle1Up();
    }
    if (this.keysPressed.has('s')) {
      this.movePaddle1Down();
    }
    if (this.keysPressed.has('i')) {
      this.movePaddle2Up();
    }
    if (this.keysPressed.has('k')) {
      this.movePaddle2Down();
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw paddles
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, this.paddle1Y, this.paddleWidth, this.paddleHeight);
    this.context.fillRect(
      this.canvasWidth - this.paddleWidth,
      this.paddle2Y,
      this.paddleWidth,
      this.paddleHeight
    );

    // Draw ball
    this.context.beginPath();
    this.context.arc(this.ballX, this.ballY, this.ballRadius, 0, 2 * Math.PI);
    this.context.fillStyle = '#FFFFFF';
    this.context.fill();
    this.context.closePath();
  }

  checkCollision() {
    // Collision detection with paddles
    if (
      (this.ballX - this.ballRadius <= this.paddleWidth &&
        this.ballY >= this.paddle1Y &&
        this.ballY <= this.paddle1Y + this.paddleHeight) ||
      (this.ballX + this.ballRadius >= this.canvasWidth - this.paddleWidth &&
        this.ballY >= this.paddle2Y &&
        this.ballY <= this.paddle2Y + this.paddleHeight)
    ) {
      this.ballSpeedX =-this.ballSpeedX;
    }

    // Collision detection with walls
    if (this.ballY - this.ballRadius <= 0 || this.ballY + this.ballRadius >= this.canvasHeight) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    // Check if a point is scored
    if (this.ballX - this.ballRadius <= 0) {
      this.player2Score++;
      this.resetBall();
    } else if (this.ballX + this.ballRadius >= this.canvasWidth) {
      this.player1Score++;
      this.resetBall();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.keysPressed.add(event.key);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.keysPressed.delete(event.key);
  }

  movePaddle1Up() {
    if (this.paddle1Y - this.paddleSpeed >= 0) {
      this.paddle1Y -= this.paddleSpeed;
    }
  }

  movePaddle1Down() {
    if (this.paddle1Y + this.paddleHeight + this.paddleSpeed <= this.canvasHeight) {
      this.paddle1Y += this.paddleSpeed;
    }
  }

  movePaddle2Up() {
    if (this.paddle2Y - this.paddleSpeed >= 0) {
      this.paddle2Y -= this.paddleSpeed;
    }
  }

  movePaddle2Down() {
    if (this.paddle2Y + this.paddleHeight + this.paddleSpeed <= this.canvasHeight) {
      this.paddle2Y += this.paddleSpeed;
    }
  }

  startGame() {
    this.isGameRunning = true;
    this.player1Score = 0;
    this.player2Score = 0;
    this.resetPaddles();
    this.resetBall();
  }

  stopGame() {
    this.isGameRunning = false;
  }

  resetPaddles() {
    this.paddle1Y = (this.canvasHeight - this.paddleHeight) / 2;
    this.paddle2Y = (this.canvasHeight - this.paddleHeight) / 2;
  }

  resetBall() {
    this.ballX = this.canvasWidth / 2;
    this.ballY = this.canvasHeight / 2;
    this.ballSpeedX = -this.ballSpeedX;
    this.ballSpeedY = Math.random() > 0.5 ? -this.ballSpeedY : this.ballSpeedY;
  }

  checkScore() {
    if (this.player1Score === this.maxScore) {
      this.stopGame();
      alert('¡Ganador! Jugador 1');
    } else if (this.player2Score === this.maxScore) {
      this.stopGame();
      alert('¡Ganador! Jugador 2');
    }
  }
}
