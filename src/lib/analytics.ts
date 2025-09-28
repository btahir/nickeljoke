declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackJokeGeneration = (topic: string, isRandom: boolean) => {
  trackEvent('joke_generation_attempt', {
    topic: topic || 'random',
    is_random: isRandom,
  });
};

export const trackJokeSuccess = (topic: string, isRandom: boolean) => {
  trackEvent('joke_generation_success', {
    topic: topic || 'random',
    is_random: isRandom,
  });
};

export const trackJokeError = (error: string, topic: string) => {
  trackEvent('joke_generation_error', {
    error_message: error,
    topic: topic || 'random',
  });
};

export const trackWalletConnection = (address: string) => {
  trackEvent('wallet_connected', {
    wallet_address: address.slice(0, 8) + '...' + address.slice(-6), // Anonymized
  });
};

export const trackChainSwitch = (chainName: string) => {
  trackEvent('chain_switch', {
    chain_name: chainName,
  });
};

export const trackShareGeneration = (topic?: string) => {
  trackEvent('share_link_generated', {
    topic: topic || 'random',
  });
};

export const trackInfoModalOpen = () => {
  trackEvent('info_modal_opened');
};

export const trackRandomTopicClick = () => {
  trackEvent('random_topic_clicked');
};