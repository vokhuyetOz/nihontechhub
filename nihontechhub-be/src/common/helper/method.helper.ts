export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isHTML = (content: string) => /<\/?[a-z][\s\S]*>/i.test(content);
