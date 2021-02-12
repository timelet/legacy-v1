var GC_TIMEOUT = 1000 * 60; // 1 min
/**
 * Save a file from Blob or object url
 * We achieve this by using the HTML5 download attr of <a>.
 * Check https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Browser_compatibility
 * for browser compatibility.
 *
 * @param data
 * @param filename
 * @param gcTimeout - When to remove the data uri
 */
function saveFile(data, filename, gcTimeout) {
    if (gcTimeout === void 0) { gcTimeout = GC_TIMEOUT; }
    var isBlob = data instanceof Blob;
    var url = isBlob ? URL.createObjectURL(data) : data;
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    var click = new MouseEvent('click');
    // Push the download operation on the next tick
    requestAnimationFrame(function () {
        a.dispatchEvent(click);
    });
    // Revoke the object url later in time
    // when the download of the file is completed (or so we assume)
    if (isBlob) {
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, gcTimeout);
    }
}

export default saveFile;
