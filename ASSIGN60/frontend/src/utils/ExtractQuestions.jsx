
export const ExtractQuestions = (text) => {
    
  const matches = text.match(
     /\d+\.\s+Problem Statement[\s\S]*?(?=\n\d+\.\s+Problem Statement|$)/g
  );

  return matches || [];
};