//@Name=SelectionModel
import rangy from 'rangy'
import rangyTextRange from 'rangy/lib/rangy-textrange';
import rangySaveRestore from 'rangy/lib/rangy-selectionsaverestore';

export const getSelection = () => {
  return rangy.getSelection();
}

export const getCharRange = (body) => {
  let sel = rangy.getSelection();
  try {
    let charRange = sel.getRangeAt(0).toCharacterRange(body);
    return charRange;
  }
  catch(e) {
    return null
  }
}

export const setCharRange = (body, charRange) => {
  let sel = rangy.getSelection();
  let {start, end} = charRange;

  sel.selectCharacters(body, start, end)

  sel = rangy.getSelection()
  if (selectionIsEmpty(sel)) {
    let start = charRange.start + 2
    let end = charRange.end + 2
    sel.selectCharacters(body, start, end)
    sel.move('character', -2)
  }

}

export const selectionIsEmpty = (selection) => {
  return !selection.anchorNode;
}

export const getCustomBookMark = (sel) => {
  if (selectionIsEmpty(sel)) return {
    anchorNode: null,
    start: null,
    end: null
  }
  let anchorNode = sel.anchorNode
  let {start, end} = getCharRange(anchorNode)
  return {
    anchorNode,
    start,
    end
  }
}

export const restoreCustomBookMark = (bookmark) => {
  setCharRange(bookmark.anchorNode, bookmark)
}