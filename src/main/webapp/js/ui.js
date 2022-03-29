var UI = UI || {};

UI.window = $(window);
UI.doc = $(document);
UI.body = $('body');


//modal
UI.modal = (function () {

    return {
        open : function(el) {
            $(el).fadeIn();
        },
        close : function(el) {
            $(el).fadeOut();
        }
    }

})();

//file remove
UI.file = function () {
/*
    const $target = $('.table-edit .add-file-names').find('.ico-cancel');

    $target.off("click").on("click", function() {
        $(this).closest('.file').hide();
    });
*/
};

//textarea
UI.textarea  = function () {

    $('.comment-wrap textarea').off("keyup").on("keyup", function() {
        const $counter = $('.counter');
        let _target = $(this).val();
        let _max = _target.length;

        $counter.html(_max + ' <span>/ 300</span>');
        if ( _max >= 300 ) {
        	$counter.html('300 <span>/ 300</span>');
        };
    });

};

//navToggle
UI.navToggle = function () {

    const $el =  $('.nav-toggle');
    const $target = $el.next('.nav');

    $el.off("click").on("click", function() {
        $(this).toggleClass('on');
        $target.toggleClass('on');

        if ( $(this).hasClass('on') ){
            $('.wrap').addClass('fixed');
        } else {
            $('.wrap').removeClass('fixed');
        }
    });

};

//tableM
UI.tableM = function () {

    if ( $('.show-right').length == 0 ) {
        $('.show-top2').css('width','90%');
    } else {
        $('.show-top2').css('width','70%');
    }

    $('.table-list .tr').each(function() {

        var winW = $(window).width();
        if ( winW < 1024 ) {    //모바일 ver일때만


            const $width1 = $(this).find('.show-bottom1').width() + 12;
            const $width2 = $(this).find('.show-bottom2').width() + 13;

            if ( $(this).find('.td').hasClass('show-bottom2') ) {
                $(this).find('.show-bottom2').css('left',$width1);
            }
            if ( $(this).find('.td').hasClass('show-bottom3') ) {
                $(this).find('.show-bottom3').css('left',$width1 + $width2);
            }
        }

    });
};

//commentDel
UI.commentDel = function () {
/*
    $('.comment-item').find('.del').off("click").on("click", function() {
        $(this).closest('.comment-item').hide();
    });
*/

};

//통합검색 mobile
UI.searchSelect  = function () {

   var winW = $(window).width();

    if ( winW < 1024 ) {    //모바일 ver일때만
        $('.result-aside').find('.tit').on("click", function() {
            $(this).next().toggle();

            if ($(this).next().css('display') == 'block'){
                $('body').css('position','fixed');
            }
            if ($(this).next().css('display') == 'none'){
                $('body').css('position','static');
            }
        });

        $("body").click(function(e) {
            if( !$(".box-white").has(e.target).length ) {
                $('.result-aside').find('dd:not(.first)').hide();
                $('body').css('position','static');
            }
        });
    }

};

//dropDown
UI.dropDown = function () {

    $('.nav-menu > li > a').off("click").on("click", function(e) {

        if ( $('.nav-toggle').hasClass('on') ) {
            e.preventDefault()

            let _open = $(this).hasClass("on");

            $('.nav-menu > li > a').removeClass('on');

            if ( !_open ) {
                $(this).toggleClass('on');
            }

            $(this).next().slideToggle(300);
            $(".sub-menu").not($(this).next()).slideUp(300);
        }

    });

};

//search
UI.search = function () {
/*
    $('.loop').each(function() {
        $(this).find('.ico-search').off("click").on("click", function() {

            let _class = 'plus';
            let _target= `<div class="loop">
                            <div class="select-wrap w160">
                                <select class="select">
                                    <option>전체</option>
                                    <option>ENG</option>
                                    <option>CHN</option>
                                </select>
                            </div>
                            <div class="input-wrap w323 ml1">
                                <input type="text" class="input">
                            </div>
                            <button type="button" class="ico-search ${_class}"><em class="blind">플러스 마이너스 아이콘</em></button>
                        </div>`

            if ( $(this).hasClass('plus') ) {
                $(this).removeClass('plus');
                $(this).addClass('minus');
                $('.add').append(_target);
            }

        });
    });
    */

};

//datepicker
UI.datepicker = function () {

    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd'
        ,showOtherMonths: true
        ,showMonthAfterYear:true
        ,yearSuffix: "년"
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12']
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
        ,dayNamesMin: ['일','월','화','수','목','금','토']
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
    });

    $( ".datepicker" ).datepicker();

    //skin
    $( ".datepicker" ).datepicker('widget').wrap('<div class="ll-skin-santiago"/>');

};

//sticky
UI.sticky = function () {
	const $target = $('.result-aside');
    const $foot = $('footer:last').find('.inner');
    const $top = 20;
    let _offsetTop;
    let _offsetBottom;
    if($target.length > 0){
    	_offsetTop = $target.offset().top - $top;
    	_offsetBottom = $foot.offset().top - ( $top*2 + $target.height() );
    }

    $(window).scroll(function () {
        var winW = $(window).width();

        if ( winW > 1024 ) {
            let _scrollTop = $(window).scrollTop();

            if ( _scrollTop > _offsetTop && $target.hasClass('default') ) {
                $target.removeClass('default').addClass('fixed').css('top', $top);
            }
            if ( _offsetTop > _scrollTop && $target.hasClass('fixed') ) {
                $target.removeClass('fixed').addClass('default').css('top', 'auto');
            }
            if ( _scrollTop > _offsetBottom && $target.hasClass('fixed') ) {
                $target.css('top', $top - 220);
            }
        }
    });
};

//Nav
UI.Nav = function () {

    const $bg =  $('#nav');
    const $bgType2 =  $('.search1');
    const $bgType3 =  $('.search2');
    const $close = $('.btn-close');

    $bg
        .on('mouseover', function () {

            $('#header').addClass('on');
            $('#header').removeClass('type2');
        })
        .on('mouseout', function () {
            $('#header').removeClass('on');
        });

    $bgType2
        .on('mouseover', function () {
            $('#header').addClass('type2');
            $('#header').removeClass('on');
            $bgType2.find('> div').css('display','block');
        })
        .on('mouseout', function () {
            $('#header').removeClass('type2');
            $bgType3.addClass('on');
            $bgType2.removeClass('on');
            $bgType2.find('> div').css('display','none');
        });

    $bgType3
        .on('mouseover', function () {
            $('#header').addClass('type2');
            $('#header').removeClass('on');
            $bgType3.find('> div').css('display','block');
        })
        .on('mouseout', function () {
            $('#header').removeClass('type2');
            $bgType2.addClass('on');
            $bgType3.removeClass('on');
            $bgType3.find('> div').css('display','none');
        });

    $close.off("click.close").on("click.close", function() {
        $('#header').removeClass('type2');
        $(this).closest('div').css('display','none');
        $(this).closest('div').sliblings().css('display','block');
    });

};


UI.quickSearch = function() {
    if($('#quickSrchDepth1').length==0) return false;
    var param = {'tagId': 'quickSrch'};
    var saveUrl = '/common/itemComboChangeAjax';
    $.ajax({
        type :"POST",
        contentType: 'application/json;charset=UTF-8',
        url : saveUrl,
        data:  JSON.stringify(param),
        dataType : 'json',
        async: false,
        success:function(result){
            if(result.code == "0000") {
                var list = result.list;
                var optionHtml = '<option value="">선택</option>';
                if(list.length > 0){
                    for(var j =0; j<list.length; j++){
                        optionHtml += '<option value="'+list[j].cd+'">'+list[j].nm+'</option>';
                    }
                }
                $('#quickSrchDepth1').append(optionHtml);
            }
        }
    });
}


UI.quickSearchChange = function() {
    //제품카테고리 콤보박스가 변경되었을 경우
    $("#quickSrchDepth1, #quickSrchDepth2").on("change", function(){
        depth1 = '';
        depth2 = '';
        depth3 = '';
        var tagId = $(this).attr('id');
        var gubn = '';
        if(tagId=='quickSrchDepth1'){
            //첫번째 제품카테고리 콤보박스를 변경하엿을경우
            var thisCdId = $(this).val();
            fnSrchItemComboAjax(tagId,thisCdId,'');

        }else if(tagId=='quickSrchDepth2'){
            //두번째 제품카테고리 콤보박스를 변경하엿을경우
            var thisCdId = $(this).val();
            var codeOther = $('#quickSrchDepth1').val();
            fnSrchItemComboAjax(tagId,codeOther,thisCdId);
        }
    });
}

UI.init = function(){
    UI.Nav();
    UI.navToggle();
    UI.dropDown();
    UI.search();
    UI.file();
    UI.textarea();
    UI.commentDel();
    UI.datepicker();
    UI.tableM();
    UI.sticky();
    UI.modal.open();
    UI.searchSelect();
    //UI.moTable();
    UI.quickSearch();
    UI.quickSearchChange();
};

//init
(function(){
    UI.init();
})();
