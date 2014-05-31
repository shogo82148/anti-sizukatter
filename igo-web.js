$(function() {
    function event(data) {
        if(data.event=='downloaded') {
            $('#loading').text('辞書を展開中・・・');
        } else if(data.event=='load') {
            $('#loading').hide();
            $('#inputform').show();
        } else if(data.event=="result" && data.method=="parse") {
            var nodes = data.morpheme;
            var result = '';
            for(var i=0;i<nodes.length;i++) {
                if( nodes[i].feature == "*" ) {
                    result += nodes[i].surface;
                } else {
                    result += nodes[i].feature;
                }
            }
            $('#result').text(result);
        } else if(data.event=="error") {
            $('#loading').text('エラー発生');
        }
    }

    var post;
    var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
    var worker = new Worker('web.js');
    igo.getServerFileToArrayBufffer("anti-dict-igo.zip", function(buffer) {
        try {
            event({event: 'downloaded'});
            var blob = new Blob([new Uint8Array(buffer)]);
            worker.postMessage({method: 'setdic', dic: blob});
        } catch(e) {
            console.error(e.toString());
            event({event:"error"});
        }
    });
    post = function(data) {
        worker.postMessage(data);
    }
    worker.addEventListener("message", function(e) {event(e.data);});
    worker.addEventListener("error", function() {event({event:"error"});});

    $('#morph').click(function() {
        post({method: 'parse', text: $('#input').val(), best: 3});
    });
});
