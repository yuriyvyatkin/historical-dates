export default function findPointNumber(e: MouseEvent): Element | undefined {
  const overlapped = document.elementsFromPoint(e.pageX, e.pageY);

  const result = overlapped.find((element) => element.classList.contains('point-number'));

  return result;
}
