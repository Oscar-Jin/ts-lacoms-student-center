export function isHiragana(text: string) {
  const hiragana = /^[\u3040-\u309f]+$/;

  return hiragana.test(text);
}
