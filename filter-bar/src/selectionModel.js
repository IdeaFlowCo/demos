//@Name=SelectionModel
import rangy from 'rangy'
import rangyHighlight from 'rangy/lib/rangy-highlighter';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';
import rangyTextRange from 'rangy/lib/rangy-textrange';
import rangySerializer from 'rangy/lib/rangy-serializer';
import rangySaveRestore from 'rangy/lib/rangy-selectionsaverestore';
import Immutable from 'immutable'


// window.rangy = rangy
// rangy.rangePrototype.insertCursorAtEnd = function() {
//   var range = this.cloneRange();
//   range.collapse(false);
//   range.insertNode(node);
//   range.detach();
//   this.setEndAfter(node);
// };

// rangy.rangePrototype.insertCursorAtStart = function() {
//   var range = this.cloneRange();
//   range.collapse(true);
//   range.insertNode(node);
//   range.detach();
//   this.setEndAfter(node);
// };

export class Selection {
  getRangy() {
    return rangy
  }
}

export const getRangy = () => {
  return rangy;
}

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

// export const collapseNode = (domElem, charRange) => {
//   let sel = rangy.getSelection();
//   let {start, end} = charRange;
//   sel.selectCharacters(domElem, start, end)
// }

export const getRootNodeSelection = (charRange) => {
  // const {start, end} = charRange
  // let selectionCharRange = {
  //   isInline: false,
  //   parentPrefix: constantsMain.rootNode,
  //   edgeIds: Immutable.List(),
  //   nodeId: '',
  //   start,
  //   end
  // }
  // return selectionCharRange;
}

export const getNullSelectionObj = () => {
  // return {
  //   isInline: null,
  //   parentPrefix: null,
  //   edgeIds: Immutable.List(),
  //   nodeId: null,
  //   start: null,
  //   end: null
  // }
}

// http://jsfiddle.net/KZqNj/
export const rangeFromCaret = (x, y) => {
  var range;

  // Try the standards-based way first
  if (document.caretPositionFromPoint) {
    var pos = document.caretPositionFromPoint(x, y);
    range = document.createRange();
    range.setStart(pos.offsetNode, pos.offset);
    // range.collapse();
  }
  // Next, the WebKit way
  else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(x, y);

    let textNode = range.startContainer;
    let offset = range.startOffset;
    range = document.createRange()
    range.setStart(textNode, offset)
  }
  // Finally, the IE way
  else if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToPoint(x, y);
  }
  return range
}

export const getSelectionCoords = (win) => {
  win = win || window;
  var doc = win.document;
  var sel = doc.selection, range, rects, rect;
  var x = 0, y = 0;
  if (sel) {
    if (sel.type != "Control") {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } 
  else if (win.getSelection) {
    sel = win.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        range.collapse(true);
        rects = range.getClientRects();
        if (rects.length > 0) {
            rect = rects[0];
        }
        x = rect ? rect.left : 0;
        y = rect ? rect.top : 0;
      }
      // Fall back to inserting a temporary element
      if (x == 0 && y == 0) {
        var span = doc.createElement("span");
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild( doc.createTextNode("\u200b") );
          range.insertNode(span);
          rect = span.getClientRects()[0];
          x = rect.left;
          y = rect.top;
          var spanParent = span.parentNode;
          spanParent.removeChild(span);

          // Glue any broken text nodes back together
          spanParent.normalize();
        }
      }
    }
  }
  return { x: x, y: y };
}

export const selectionIsEmpty = (selection) => {
  return !selection.anchorNode;
}

export const setSelectionFromCoordinates = (coordinates) => {
  let selection = rangy.getSelection()
  let range = rangeFromCaret(coordinates.x, coordinates.y)
  selection.setSingleRange(range)
}

export const removeSpecialChars = (text) => {
  return text.replace(/^\s/, '').replace(/[,]+$/, '')
}

export const removeZeroWidthSpace = (text) => {
  return text.replace('\u200b', '')
}

export const isZeroWidthSpace = (text) => {
  return text === '\u200b';
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

export const charRangeIsSingleAtOffset = (charRange, offset) => {
  if (!charRange) return false;
  return charRange.start === offset && charRange.end === offset
}

export const charRangeOffsetsTheSame = (charRange, charRange2) => {
  if (!charRange) return false;
  if (!charRange2) return false;
  return charRange.start === charRange2.start && charRange.end === charRange2.end
}

export const bookmarksTheSame = (bookmark, bookmark2) => {
  if (!bookmark) return false
  if (!bookmark2) return false
  let anchorsTheSame = bookmark.anchorNode === bookmark2.anchorNode
  let offsetsTheSame = charRangeOffsetsTheSame(bookmark, bookmark2)
  return anchorsTheSame && offsetsTheSame;
}

export const handleArrowDown = () => {
  let sel = rangy.getSelection()
  let bookmark = getCustomBookMark(sel)

  let error = null
  let tryDownArrow = (additionalX) => {
    try {

      let selectionCoords = getSelectionCoords();
      selectionCoords.y = selectionCoords.y + constants.heights.line/2 + constants.heights.line;
      // console.log('selectionCoords', selectionCoords)
      if (additionalX) selectionCoords.x = selectionCoords.x + additionalX
      // console.log('selectionCoords', selectionCoords)
      setSelectionFromCoordinates(selectionCoords)
      error = null
    }
    catch(e) {
      // console.log('e', e)
      error = e
    }
  }

  tryDownArrow()

  sel = rangy.getSelection();
  if (error) {
    scrollBy(0, constants.heights.line)
    restoreCustomBookMark(bookmark)
    tryDownArrow()
  }

  if (selectionIsEmpty(sel)) {
    restoreCustomBookMark(bookmark)
    return false
  }
  return true
}


export const selectStart = (node) => {
  var range = rangy.createRange();
  range.selectNodeContents(node);
  range.collapse(true)
  var sel = rangy.getSelection();

  sel.setSingleRange(range);
  // sel.collapseToStart()
}


export const selectEndOfWord = (node) => {
  var selection = rangy.getSelection();

  //create a range object to set the caret positioning for
  var range = rangy.createRange();
  range.expand('word', 1)

  //apply this range to the selection object
  selection.setSingleRange(range);
  // selection.collapseToEnd()
}





// http://jsfiddle.net/j1LLmr5b/22/
// http://stackoverflow.com/questions/3189812/creating-a-collapsed-range-from-a-pixel-position-in-ff-webkit
// if (!document.caretRangeFromPoint) {
//     document.caretRangeFromPoint = function(x, y) {
//         var log = "";

//         function inRect(x, y, rect) {
//             return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
//         }

//         function inObject(x, y, object) {
//             var rects = object.getClientRects();
//             for (var i = rects.length; i--;)
//                 if (inRect(x, y, rects[i]))
//                     return true;
//             return false;
//         }

//         function getTextNodes(node, x, y) {
//             if (!inObject(x, y, node))
//                 return [];

//             var result = [];
//             node = node.firstChild;
//             while (node) {
//                 if (node.nodeType == 3)
//                     result.push(node);
//                 if (node.nodeType == 1)
//                     result = result.concat(getTextNodes(node, x, y));

//                 node = node.nextSibling;
//             }

//             return result;
//         }

//         var element = document.elementFromPoint(x, y);
//         var nodes = getTextNodes(element, x, y);
//         if (!nodes.length)
//             return null;
//         var node = nodes[0];

//         var range = document.createRange();
//         range.setStart(node, 0);
//         range.setEnd(node, 1);

//         for (var i = nodes.length; i--;) {
//             var node = nodes[i],
//                 text = node.nodeValue;


//             range = document.createRange();
//             range.setStart(node, 0);
//             range.setEnd(node, text.length);

//             if (!inObject(x, y, range))
//                 continue;

//             for (var j = text.length; j--;) {
//                 if (text.charCodeAt(j) <= 32)
//                     continue;

//                 range = document.createRange();
//                 range.setStart(node, j);
//                 range.setEnd(node, j + 1);

//                 if (inObject(x, y, range)) {
//                     range.setEnd(node, j);
//                     return range;
//                 }
//             }
//         }

//         return range;
//     };
// }

// http://jsfiddle.net/TjXEG/900/
// function getCaretCharacterOffsetWithin(element) {
//   var caretOffset = 0;
//   var doc = element.ownerDocument || element.document;
//   var win = doc.defaultView || doc.parentWindow;
//   var sel;
//   if (typeof win.getSelection != "undefined") {
//     sel = win.getSelection();
//     if (sel.rangeCount > 0) {
//       var range = win.getSelection().getRangeAt(0);
//       var preCaretRange = range.cloneRange();
//       preCaretRange.selectNodeContents(element);
//       preCaretRange.setEnd(range.endContainer, range.endOffset);
//       caretOffset = preCaretRange.toString().length;
//     }
//   } 
//   else if ((sel = doc.selection) && sel.type != "Control") {
//     var textRange = sel.createRange();
//     var preCaretTextRange = doc.body.createTextRange();
//     preCaretTextRange.moveToElementText(element);
//     preCaretTextRange.setEndPoint("EndToEnd", textRange);
//     caretOffset = preCaretTextRange.text.length;
//   }
//   return caretOffset;
// }