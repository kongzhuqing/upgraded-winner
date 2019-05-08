var src = mediaURLData['4113']
// var src = 'https://apd-520f170d688691842b7803404a3372e7.v.smtcdns.com/vcloud1022.tc.qq.com/1022_8a962a1c3dbd41afaec20353741fff69.f0.mp4?vkey=A9CF3BAE28C14E5B4856DD64C7540704C324290C97F991EC76190EFB924714F8CE65346298117402F0267DCC6757A475A98B7782D769E5AC1F7832BFB2006231584E7939E73CB9CFF1C4E525A8E9DB7C96FFFD5C8BE9707B&sha=0&locid=22441b68-3bac-4da3-b8f9-987693fc77cd&size=29270234&ocid=215228332'
var $landPage = $('#landPage')
var $skip = $('#skip')
var videoPlayer = new MMD.VideoPlayer(
    {
        videoElement: document.getElementById('video'),//[必填],video元素;
        src: src,//[必填],video src;
        loop: false,//[可选],是否循环,默认false,true为循环;
        muted: false,//[可选],是否静音,默认false;
        poster: '',//[可选],video默认图片;
        timesParam: [
            { name: 'start', time: 1 },
            { name: 'skip', time: 17 },
            { name: 'skipHide', time: 128 },
            { name: 'end', time: 142 }
        ],//[可选],video currenttime时间点;
        onTimes: function (name) {
            switch (name) {
                case 'skip':
                    // $('.loading').addClass('fadeDown');
                    // setTimeout(function () {
                    //     $('.loading').hide();
                    // }, 3000)
                    $skip.show()
                    break;

                case 'skipHide':
                    // $('.loading').addClass('fadeDown');
                    // setTimeout(function () {
                    //     $('.loading').hide();
                    // }, 3000)
                    $skip.css('opacity', 0)
                    setTimeout(function () {
                        $skip.hide()
                    }, 1000);
                    break;
                case 'end':
                    // $('.loading').addClass('fadeDown');
                    // setTimeout(function () {
                    //     $('.loading').hide();
                    // }, 3000)
                    $landPage.show()
                    break;
            }
        },//[可选],video currenttime回调;
        onStart: function () {
            if (videoPlayer.isVideoCanAutoPlay) {
                $processInner.css('width', '100%')
                $loading.hide()
            }
        },//[可选],video第一个画面出现回调;
        onEnd: function () {
            $landPage.show()
        }//[可选],video播放完成回调;
    }
);



// loading
var imgPath = 'Ti_files/images/images/';
var arrImgOne = ['loading_text.png', 'luodi.jpg', 'share.png', 'start_btn_active.png', 'start_btn.png',  'share_btn.png', 'again.png', ];
var percent = 0;
var $processInner = $('#processInner')
var $playBtn = $('#playBtn')
var $shareBar = $('#shareBar')
var $loading = $('#loading')

var width = window.innerWidth
var height = window.innerHeight

if (width / height < 750 / 1334) {
    $landPage.css("backgroundSize", "auto 100%")
}
$playBtn.on('click', function () {
    videoPlayer.play()
    $loading.hide()
})

$skip.on('click', function () {
    videoPlayer.pause()
    $landPage.show()
})

$('#share').on('click', function () {
    $shareBar.show(0)
})

$shareBar.on('click', function () {
    $shareBar.hide(0)
})

$('#replay').on('click', function () {
    videoPlayer.replay()
    setTimeout(function () {
        $landPage.hide()
    }, 300);

})
var isIphoneX = false
if (navigator.userAgent.indexOf('iPhone X') != -1) {
    isIphoneX = true
}
function loadFn (arrimg) {
    for (var i = 0; i < arrimg.length; i++) {
        arrimg[i] = (imgPath + arrimg[i]);
    };
    var time = +new Date
    var loadImage = function (path, callback) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            callback(path);
        }
        img.src = path;
    }

    var imgLoader = function (imgs, callback) {
        var len = imgs.length, i = 0;
        while (imgs.length) {
            loadImage(imgs.shift(), function (path) {
                callback(path, ++i, len);
            })
        }
    }

    imgLoader(arrimg, function (path, curNum, total) {
        percent = curNum / total;
        $processInner.css('width', percent * 90 + '%')
        if (percent == 1) {
            var now = +new Date
            var delta = now - time
            console.log(delta)
            delta > 3000 && (delta = 3000)
            setTimeout(function () {
                if (videoPlayer.isVideoCanAutoPlay && !isIphoneX) {
                    // $loading.hide()
                    videoPlayer.play()
                    setTimeout(function () {
                        // if (!videoPlayer.paused) {
                        //     return;
                        // }
                        $processInner.css('width', '100%')
                        setTimeout(function () {
                            $('#loadingInner').hide()
                            $playBtn.show()
                        }, 500);
                    }, 3000);
                } else {
                    // qq iphoneX useragent中带有iphoneX字段，不支持自动播放
                    $processInner.css('width', '100%')
                    setTimeout(function () {
                        $('#loadingInner').hide()
                        $playBtn.show()
                    }, 500);

                }
            }, 3000 - delta);
        }
    })
};
loadFn(arrImgOne);

// ending
$('.ending .btn-box a').on('click', function () {
    var idx = $('.ending .btn-box a').index($(this));
    console.log(idx)
    $('.ending .btn-box a').removeClass('on').eq(idx).addClass('on');
})

// 页面禁止下拉
$(window).on('scroll.elasticity', function (e) {
    e.preventDefault();
}).on('touchmove.elasticity', function (e) {
    e.preventDefault();
});

// var changeTime = '2018/12/19 00:00:00'
// changeTime = new Date(changeTime).getTime()
// var now = +new Date
// if (now > changeTime) {
//     $('#gift').hide()
//     $('#replay').show()
//     // $landPage.css('backgroundImage', 'url(' + imgPath + 'luodi_19.jpg)');
// }
