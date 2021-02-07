
$(function() {
    function after_form_submitted(data)
    {
        if(data.result == 'success')
        {
            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' );
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });

        }//else
    }

	$('#reused_form').submit(function(e) {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' );
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });


        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: $form.serialize(),
            success: after_form_submitted,
            dataType: 'json'
        });

    });




    $('header a').click(function() {
        var id = $(this).attr('href');
        var position = $(id).offset().top;
        $('html,body').animate( {
        'scrollTop':position
        }, 'slow');       
    });

    var setImg = '#viewer';
    var fadeSpeed = 1000;
    var switchDelay = 5000;
  
    $(setImg).children('img').css({opacity:'0'});
    $(setImg + ' img:first').stop().animate({opacity:'1',zIndex:'-1'},fadeSpeed);
  
    setInterval(function(){
        $(setImg + ' :first-child').animate({opacity:'0',zIndex:'-2'},fadeSpeed).next('img').animate({opacity:'1',zIndex:'-1'},fadeSpeed).end().appendTo(setImg);
    },switchDelay);



/*     $('.slide').each(function() {
        // スライド（画像）の数を取得
        var $slides = $(this).find('img'),
            slideNum = $slides.length,
            currentIdx = 0; // 何番目か
     
        // 最初の画像をフェードイン
        $(".slide img").eq(currentIdx).fadeIn();
     
        // 3秒後に次のスライドを表示
        setTimeout(dispNextSlide, 3000);
     
        // 次のスライドを表示するメソッド
        function dispNextSlide() {
          var nextIdx = currentIdx + 1;
     
          // 最後のスライドの場合ははじめに戻る
          if (nextIdx > (slideNum - 1)) {
            nextIdx = 0;
          } else {
                      // 現在のスライドをフェードアウト
            $(".slide img").eq(currentIdx).fadeOut();
     
          // 次のスライドをフェードイン
            $(".slide img").eq(nextIdx).fadeIn();
            currentIdx = nextIdx;

          }
     
          // インデックスを更新
        }
    })
 　*/
});