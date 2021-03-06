<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover">
    <title>PUMPKIN HWANG front </title>
    <link rel="stylesheet" type="text/css" href="/css/usr/style.css">
    <link rel="stylesheet" type="text/css" href="/css/incpro/osiu.css"/>
    <link rel="shortcut icon" type="image/x-icon" href="/img/usr/common/pumpkin.png">
    <script type="text/javascript" src="/js/vendor/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="/js/vendor/library.js"></script>
    <script type="text/javascript" src="/js/ui.js"></script>

    <script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/js/commonFn.js"></script>

    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="/js/incpro/osiu.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {

            //검색어 동적으로 구현 로직
            $(document).on("click", ".ico-search", function () {
                var innerHtml = '';
                var html = '';
                if ($(this).hasClass('plus')) {		//더하기버튼 클릭하였을 경우
                    if ($('.loop').length < 5) {
                        //최대 다섯개까지 그려지게 처리
                        innerHtml = $(this).parents('.loop').html().replace('plus', 'minus');
                        html = '<div class="loop">' + innerHtml + '</div>';
                        $(".add").append(html);
                        $('.loop:last').find('input, select').val('');
                    }

                } else if ($(this).hasClass('minus')) {			//빼기버튼 클릭하였을 경우
                    $(this).parents('.loop').remove();
                }
            });
            UI.init(); //ui.js 선언

            $(window).resize(function () {
                UI.tableM();
            });

        });

    </script>
</head>
