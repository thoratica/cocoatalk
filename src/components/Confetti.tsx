import React from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

export default class Confetti extends React.Component {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.animationInstance = null;
  }

  makeShot = (particleRatio: any, opts: any) => {
    // @ts-ignore
    this.animationInstance &&
      // @ts-ignore
      this.animationInstance({
        origin: { y: 1 },
        decay: 0.88,
        particleCount: Math.floor(333 * particleRatio),
        ...opts,
      });
  };

  componentDidMount() {
    this.fire();
  }

  fire = () => {
    const params = {
      particleRatio: {
        min: 0.1,
        max: 0.35,
      },
      spread: {
        min: 20,
        max: 120,
      },
      startVelocity: {
        min: 55,
        max: 65,
      },
      decay: {
        min: 0.82,
        max: 0.91,
      },
      scalar: {
        min: 0.5,
        max: 1.2,
      },
    };
    let repeat = 6;
    while (repeat) {
      const getRandom = (min: number, max: number) => {
        return (Math.random() * (max - min) + min).toFixed(2);
      };
      this.makeShot(getRandom(params.particleRatio.min, params.particleRatio.max), {
        spread: getRandom(params.spread.min, params.spread.max),
        startVelocity: getRandom(params.startVelocity.min, params.startVelocity.max),
        decay: getRandom(params.decay.min, params.decay.max),
        scalar: getRandom(params.scalar.min, params.scalar.max),
      });
      repeat -= 1;
    }
  };

  handlerFire = () => {
    this.fire();
  };

  getInstance = (instance: any) => {
    // @ts-ignore
    this.animationInstance = instance;
  };

  render() {
    return (
      <>
        {/* @ts-ignore */}
        <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles} />
      </>
    );
  }
}
