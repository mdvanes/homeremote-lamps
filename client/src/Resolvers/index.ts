import toggleAnimation from "./Mutation/toggleAnimation";
import toggleLamp from "./Mutation/toggleLamp";
import devices from "./Query/devices";
import vendors from "./Query/vendors";
import showVendor from "./Mutation/showVendor";

export const defaults = {
  animationItems: [
    {
      __typename: "AnimationItem",
      id: 1,
      name: "App-logo",
      isAnimating: false
    }
  ],
  logger: "Initial logger"
};

export const resolvers = {
  Mutation: {
    toggleAnimation,
    toggleLamp,
    showVendor
  },
  Query: {
    devices,
    vendors
  },
  // Lamp: {
  //   __typename: 'Lamp',
  //   isOn: () => false,
  // }
  Lamp: {
    isOn: (): boolean => false
  }
};
