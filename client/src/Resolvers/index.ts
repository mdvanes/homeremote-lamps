import toggleAnimation from "./Mutation/toggleAnimation";
import toggleLamp from "./Mutation/toggleLamp";
import devices from "./Query/devices";

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
  Query: {
    devices
  },
  // Lamp: {
  //   __typename: 'Lamp',
  //   isOn: () => false,
  // }
  Lamp: {
    isOn: () => false
  }
};