/*
* Author:antianlu
* Date:2013-12-05
* Plugin name:jQuery.Contextmenu
* Address��http://www.oschina.net/code/snippet_153403_9880
* Version:0.22
* Email:atlatl333@126.com
* Modify:����������������⣺1.һ��ҳ��֧�ֶ���Ҽ��˵���2.���Ҽ��˵��ϵ���Ҽ��˵�����������˵����⡣
*/
(function(cm){
    jQuery.fn.WinContextMenu=function(options){
        var defaults={
            contextMenuID:'#wincontextMenu',
            offsetX:2,//�����X��ƫ����
            offsetY:2,//�����Y��ƫ����
            speed:300,//��Ч�ٶ�
            flash:!1,//��Ч�Ƿ�����Ĭ�ϲ�����
            flashMode:'',//��Чģʽ,��flashΪ��ʱʹ��
            cancel:!1,//�ų��������Ҽ��˵�����
            items:[],//�˵���
            action:$.noop()//���ɲ˵���ص��¼�
        };
        var opt=cm.extend(true,defaults,options);
        function create(e){
            var m=cm('<ul class="WincontextMenu"></ul>').appendTo(document.body);
            cm.each(opt.items,function(i,itm){
                if(itm){
                    var row=cm('<li><a class="'+(itm.disable?'cmDisable':'')+'" ref="sitem" href="javascript:void(0)"><span></span></a></li>').appendTo(m);
                    itm.icon?cm('<img src="'+itm.icon+'">').insertBefore(row.find('span')):'';
                    itm.text?row.find('span').text(itm.text):'';
                    if(itm.action) {
                        row.find('a').click(function(){this.className!='cmDisable'?itm.action(e):null;});}
                }
            });
            if(cm(opt.contextMenuID).html()!=null){
                cm(cm(opt.contextMenuID).html().replace(/#/g,'javascript:void(0)')).appendTo(m);}
            return m;
        }
        if(opt.cancel){//�ų��������Ҽ��˵�����
                cm(opt.cancel).live('contextmenu',function(e){return false});}
        this.live('contextmenu',function(e){
            var m=create(e).show();
            var l = e.pageX + opt.offsetX,
            t = e.pageY+opt.offsetY,
            p={
                wh:cm(window).height(),
                ww:cm(window).width(),
                mh:m.height(),
                mw:m.width()
            }
            t=(t+p.mh)>=p.wh?(t-=p.mh):t;//���˵��������ڱ߽�ʱ����
            l=(l+p.mw)>=p.ww?(l-=p.mw):l;
            m.css({zIndex:1000001, left:l, top:t}).bind('contextmenu', function() { return false; });
            m.find('a').click(function(e){//�����´�ҳ�����ӵĲ˵���
                var b=$(this).attr('ref');
                if(b!='sitem'){this.className!='cmDisable'?opt.action(this):null;}
                e.preventDefault();
            });
            cm(document.body).live('contextmenu click', function() {//��ֹ�ж�̬���صı�ǩʧЧ����
              m.remove();
            });
            return false;
        });
        return this;
    }
})(jQuery);