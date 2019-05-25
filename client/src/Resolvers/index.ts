import toggleAnimation from "./Mutation/toggleAnimation";
import toggleLamp from "./Mutation/toggleLamp";

export const defaults = {
  animationItems: [{
    __typename: 'AnimationItem',
    id: 1,
    name: 'App-logo',
    isAnimating: true
  }],
  logger: 'Initial logger'
};

export const resolvers = {
  Mutation: {
    toggleAnimation,
    toggleLamp
  },
  // Lamp: {
  //   __typename: 'Lamp',
  //   isOn: () => false,
  // }
  Lamp: {
    isOn: () => false
  }
};