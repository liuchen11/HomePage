/**
 * ҳ���ϳ��õ�һЩ�ű�������������checkbox��ȫѡ����ѡ���ı���ɫ�ȡ�  
 */

/** �����û��¼������س���ת��Ϊtab�� */
window.document.onkeydown = function(evt){
  if(evt == null) evt = window.event;

  if(evt && evt.srcElement.type && evt.srcElement.type != 'submit' && evt.srcElement.type != 'button' && evt.srcElement.type != 'textarea' && evt.keyCode == 13){
    try{
      evt.keyCode = 9;
    }catch(e){
    }
  }
}

/**
 * ���ѡ��ʱ�ı������еı�����ɫ��
 * TODO: TR����ʽ��д���ˣ���̫��
 * @ck ������checkbox����
 */
function changRowColor(ck){
  var styleName;  
	if (ck.checked){
		styleName = "infoDisTR_Selected"
	}else{
	  styleName = "infoDisTR"
	}
	while (ck.tagName!="TR"){
		ck = ck.parentElement;
	}
	if(ck.tagName=="TR"){
	  ck.className = styleName;
	}	
}

/**
 * ȫѡ����ѡ
 * @ck ���õ�checkbox����
 * @state ״̬��true/false
 */
function checkAll(ck,state){
  if(ck.type == "checkbox"){//checkboxֻ��һ��Ԫ��ʱ
    ck.checked = state;
    //changRowColor(ck);
    return;
  }
  for(var i=0; i<ck.length; i++){
    ck[i].checked = state;
    //changRowColor(ck[i]);
  }
}

/**
 * �����ѡ��ѡ�еĸ�����
 * @ck checkbox����
 */
function getCheckedCount(ck){
  if(ck.type == "checkbox") return ck.checked ? 1 : 0 ; //ֻ��һ��Ԫ��
  var num = 0;
  for(var i=0;i<ck.length;i++){
    if(ck[i].checked) num += 1;
  }
  return num;
}

/**
 * ��ֹ������ύ����
 * ����ǵ�һ���ύ������������true����ʾ�����ύ���������ύ
 * frm - �����󡣵�һ���ύ���󣬻Ὣ���ڵ����е�button��Ϊ������
 * added by ZhengWangLi 2004.11.30
 */
var FRM_SUBMITED = false;
function confirmSubmited(frm){
  
  if(!FRM_SUBMITED){
    FRM_SUBMITED = true;
    //Ϊ���Ӿ�Ч�������������еİ�ť��Ϊ������    
    if(frm){   
      var eles = frm.elements;
      for(var i=0; i < eles.length; i++) {    
        obj= eles.item(i);
        type=obj.type;
        if((type == "button" || type == "submit" || type == "reset") && obj.disabled == false){        
          obj.disabled = true;
        }
      }
    }     
    return true;
  }
  return false;
}

//ģ��MSN����Ϣ��ʾ���ڡ�only use in IE
var oPopup;
var popTop = 50;
function showMsg(msg){
  oPopup = null;
	try{
	  oPopup = window.createPopup();
	  popmsg(msg);
	}catch(e){
	  alert(msg);
	}
}

function popmsg(msgstr){
	
	var winstr="<table style='border: 1 solid  #FFA6CA'  width='241' height='172' border='0' cellpadding='0' cellspacing='0'  >";
	winstr+="<tr><td height='30'> </td></tr><tr><td align='center'><table width='90%' height='110' border='0' cellpadding='0' cellspacing='0'>";
	winstr+="<tr><td valign='top' align='center' style='font-size:12px; color: red; face: Tahoma'>"+msgstr+"</td></tr></table></td></tr></table>";
	oPopup.document.body.innerHTML = winstr;
	//alert(winstr);
	popshow();
}

function popshow(){
	//window.status=popTop;
//	if(popTop>1720){
//		clearTimeout(mytime);
//		oPopup.hide();
//		return;
//	}else if(popTop>1520&&popTop<1720){
//		oPopup.show(screen.width-250,screen.height,241,1720-popTop);
//	}else if(popTop>1500&&popTop<1520){
//		oPopup.show(screen.width-250,screen.height+(popTop-1720),241,172);
//	}else if(popTop<180){
//		oPopup.show(screen.width-250,screen.height,241,popTop);
//	}else if(popTop<220){
//		oPopup.show(screen.width-250,screen.height-popTop,241,172);
//	}
//	popTop+=10;
//	var mytime=setTimeout("popshow();",50);
	oPopup.show(screen.width-250,screen.height-popTop,241,172,document.body);
}