/**
 * GBPMenu �� general b/s platform menu (ͨ��BSƽ̨�˵�����)
 *
 * �޸ģ���ʾ�˵���ʱ������select�����򣬲˵���ʧ������ʾ��
 * ֣���� 2005.8.4
 *
 *
 * ���������޸ģ�
 * 1��������GBPMenu�࣬�������ɶ༶�˵���
 * 2���޸���Ĭ��ֵ��ͼƬĬ��Ϊ"images/menu"����ͣģʽĬ������
 *   
 *  ֣���� 2004.10.15
 */

//�������������º����ṩ����/�ָ�ָ�������ܣ�������������

var arr_menu_hide_elements = new Array(); //��ű����صĶ�������
//����SELECT����
function menu_HideElement(){
  try{
    for(i=0;i<window.document.all.tags("SELECT").length; i++){
      var objTemp = window.document.all.tags("SELECT")[i];
      if(!objTemp||!objTemp.offsetParent)
         continue;
      arr_menu_hide_elements[arr_menu_hide_elements.length]=objTemp
      objTemp.style.visibility="hidden";
    }
  }catch(e){alert(e.message)}
}
//��ʾSELECT����
function menu_ShowElement(){
    var i;
    for(i=0;i<arr_menu_hide_elements.length; i++){
      var objTemp = arr_menu_hide_elements[i]
      if(!objTemp||!objTemp.offsetParent)
          continue;
      objTemp.style.visibility=''
    }
    arr_menu_hide_elements=new Array();
}
//���������� ����/�ָ�����ģ����� ��������������

// check browsers
var ua = navigator.userAgent;
var opera = /opera [56789]|opera\/[56789]/i.test(ua);
var ie = !opera && /MSIE/.test(ua);
var ie50 = ie && /MSIE 5\.[01234]/.test(ua);
var ie6 = ie && /MSIE [6789]/.test(ua);
var ieBox = ie && (document.compatMode == null || document.compatMode != "CSS1Compat");
var moz = !opera && /gecko/i.test(ua);
var nn6 = !opera && /netscape.*6\./i.test(ua);

//��������޸�
var webfxMenu_config = {
    'imagePath'			: "/images/gbp/menu/", //ͼƬ��ַ
    'useHover'			: true, //�Ƿ�������ͣģʽ
    'hideTime'			: 500, //�˵��Զ�����ʱ�䣬����
    'showTime'			: 100,//�˵��ӳ���ʾʱ�䣬����
    'width'         : 120, //�����˵��Ŀ��    
    'borderLeft'    : 1,
    'borderRight'   : 1,
    'borderTop'     : 1,
    'borderBottom'  : 1,
    'paddingLeft'   : 1,
    'paddingRight'  : 1,
    'paddingTop'    : 1,
    'paddingBottom' : 1,
    'shadowLeft'    : 0,
    'shadowRight'   : ie && !ie50 && /win32/i.test(navigator.platform) ? 4 :0,
    'shadowTop'     : 0,
    'shadowBottom'  : ie && !ie50 && /win32/i.test(navigator.platform) ? 4 : 0,
    'itemHeight'    : 20,
    'itemText'      : "Untitled",
    'itemHref'      : "javascript:void(0)",

    'separatorHeight' : 6,  //�˵��ָ����߶�

    'emptyText'       : "Empty",
    'useAutoPosition'	: nn6 ? false : true

};

var webFXMenuHandler = {
	idCounter		:	0,
	idPrefix		:	"webfx-menu-object-",
	all				:	{},
	getId			:	function () { return this.idPrefix + this.idCounter++; },
	overMenuItem	:	function (oItem) {
		if (this.showTimeout != null)
			window.clearTimeout(this.showTimeout);
		if (this.hideTimeout != null)
			window.clearTimeout(this.hideTimeout);
		var jsItem = this.all[oItem.id];
		if (webfxMenu_config["showTime"] <= 0)
			this._over(jsItem);
		else
			//this.showTimeout = window.setTimeout(function () { webFXMenuHandler._over(jsItem) ; }, webfxMenu_config["showTime"]);
			// I hate IE5.0 because the piece of shit crashes when using setTimeout with a function object
			this.showTimeout = window.setTimeout("webFXMenuHandler._over(webFXMenuHandler.all['" + jsItem.id + "'])", webfxMenu_config["showTime"]);
	},
	outMenuItem	:	function (oItem) {
		if (this.showTimeout != null)
 window.clearTimeout(this.showTimeout);
		if (this.hideTimeout != null) window.clearTimeout(this.hideTimeout);
		var jsItem = this.all[oItem.id];
		if (webfxMenu_config["hideTime"] <= 0)
			this._out(jsItem);
		else
			//this.hideTimeout = window.setTimeout(function () { webFXMenuHandler._out(jsItem) ; }, webfxMenu_config["hideTime"]);
			this.hideTimeout = window.setTimeout("webFXMenuHandler._out(webFXMenuHandler.all['" + jsItem.id + "'])", webfxMenu_config["hideTime"]);
	},
	blurMenu		:	function (oMenuItem) {
		window.setTimeout("webFXMenuHandler.all[\"" + oMenuItem.id + "\"].subMenu.hide();", webfxMenu_config["hideTime"]);
	},
	_over	:	function (jsItem) {
		if (jsItem.subMenu) {
			jsItem.parentMenu.hideAllSubs();
			jsItem.subMenu.show();
		}
		else
			jsItem.parentMenu.hideAllSubs();
	},
	_out	:	function (jsItem) {
		// find top most menu
		var root = jsItem;
		var m;
		if (root instanceof WebFXMenuButton)
			m = root.subMenu;
		else {
			m = jsItem.parentMenu;
			while (m.parentMenu != null && !(m.parentMenu instanceof WebFXMenuBar))
				m = m.parentMenu;
		}
		if (m != null)	
			m.hide();	
	},
	hideMenu	:	function (menu) {
		if (this.showTimeout != null)
			window.clearTimeout(this.showTimeout);
		if (this.hideTimeout != null)
			window.clearTimeout(this.hideTimeout);

		this.hideTimeout = window.setTimeout("webFXMenuHandler.all['" + menu.id + "'].hide()", webfxMenu_config["hideTime"]);
	},
	showMenu	:	function (menu, src, dir) {
		if (this.showTimeout != null)
			window.clearTimeout(this.showTimeout);
		if (this.hideTimeout != null)
			window.clearTimeout(this.hideTimeout);
		if (arguments.length < 3)
			dir = "vertical";
		
		menu.show(src, dir);
	}
};

function WebFXMenu() {
	this._menuItems	= [];
	this._subMenus	= [];
	this.id			= webFXMenuHandler.getId();
	this.top		= 0;
	this.left		= 0;
	this.shown		= false;
	
	this.parentMenu	= null;
	webFXMenuHandler.all[this.id] = this;
}

WebFXMenu.prototype.width			= webfxMenu_config["width"];
WebFXMenu.prototype.emptyText		= webfxMenu_config["emptyText"];
WebFXMenu.prototype.useAutoPosition	= webfxMenu_config["useAutoPosition"];

WebFXMenu.prototype.borderLeft		= webfxMenu_config["borderLeft"];
WebFXMenu.prototype.borderRight		= webfxMenu_config["borderRight"];
WebFXMenu.prototype.borderTop		= webfxMenu_config["borderTop"];
WebFXMenu.prototype.borderBottom	= webfxMenu_config["borderBottom"];

WebFXMenu.prototype.paddingLeft		= webfxMenu_config["paddingLeft"];
WebFXMenu.prototype.paddingRight	= webfxMenu_config["paddingRight"];
WebFXMenu.prototype.paddingTop		= webfxMenu_config["paddingTop"];
WebFXMenu.prototype.paddingBottom	= webfxMenu_config["paddingBottom"];

WebFXMenu.prototype.shadowLeft		= webfxMenu_config["shadowLeft"];
WebFXMenu.prototype.shadowRight		= webfxMenu_config["shadowRight"];
WebFXMenu.prototype.shadowTop		= webfxMenu_config["shadowTop"];
WebFXMenu.prototype.shadowBottom	= webfxMenu_config["shadowBottom"];

WebFXMenu.prototype.add = function (menuItem) {
	this._menuItems[this._menuItems.length] = menuItem;
	if (menuItem.subMenu) {
		this._subMenus[this._subMenus.length] = menuItem.subMenu;
		menuItem.subMenu.parentMenu = this;
	}
	
	menuItem.parentMenu = this;
};

WebFXMenu.prototype.show = function (relObj, sDir) {
	if (this.useAutoPosition)
		this.position(relObj, sDir);
	
	var divElement = document.getElementById(this.id);
	divElement.style.left = opera ? this.left : this.left + "px";
	divElement.style.top = opera ? this.top : this.top + "px";
	divElement.style.visibility = "visible";
	this.shown = true;
	if (this.parentMenu){
		this.parentMenu.show();
	}
	menu_HideElement(); //����input�����
 };

WebFXMenu.prototype.hide = function () {
	this.hideAllSubs();
	var divElement = document.getElementById(this.id);
	divElement.style.visibility = "hidden";
	this.shown = false;
	menu_ShowElement(); //��ʾinput�����
};

WebFXMenu.prototype.hideAllSubs = function () {
	for (var i = 0; i < this._subMenus.length; i++) {
		if (this._subMenus[i].shown)
			this._subMenus[i].hide();
	}
};
WebFXMenu.prototype.toString = function () {
	var top = this.top + this.borderTop + this.paddingTop;
	var str = "<div id='" + this.id + "' class='webfx-menu' style='" + 
	"width:" + (!ieBox  ?
		this.width - this.borderLeft - this.paddingLeft - this.borderRight - this.paddingRight  : 
		this.width) + "px;" +
	(this.useAutoPosition ?
		"left:" + this.left + "px;" + "top:" + this.top + "px;" :
		"") +
	(ie50 ? "filter: none;" : "") +
	"'>";
	
	if (this._menuItems.length == 0) {
		str +=	"<span class='webfx-menu-empty'>" + this.emptyText + "</span>";
	}
	else {	
		// loop through all menuItems
		for (var i = 0; i < this._menuItems.length; i++) {
			var mi = this._menuItems[i];
			str += mi;
			if (!this.useAutoPosition) {
				if (mi.subMenu && !mi.subMenu.useAutoPosition)
					mi.subMenu.top = top - mi.subMenu.borderTop - mi.subMenu.paddingTop;
				top += mi.height;
			}
		}

	}
	
	str += "</div>";

	for (var i = 0; i < this._subMenus.length; i++) {
		this._subMenus[i].left = this.left + this.width - this._subMenus[i].borderLeft;
		str += this._subMenus[i];
	}
	
	return str;
};
// WebFXMenu.prototype.position defined later
function WebFXMenuItem(sText, sHref, sToolTip, oSubMenu) {
	this.text = sText || webfxMenu_config["itemText"];
	this.href = (sHref == null || sHref == "") ? webfxMenu_config["itemHref"] : sHref;
	this.subMenu = oSubMenu;
	if (oSubMenu)
		oSubMenu.parentMenuItem = this;
	this.toolTip = sToolTip;
	this.id = webFXMenuHandler.getId();
	webFXMenuHandler.all[this.id] = this;
};
WebFXMenuItem.prototype.height = webfxMenu_config["itemHeight"];
WebFXMenuItem.prototype.toString = function () {
	return	"<a" +
			" id='" + this.id + "'" +
			" href=\"" + this.href + "\"" +
			(this.toolTip ? " title=\"" + this.toolTip + "\"" : "") +
			" onmouseover='webFXMenuHandler.overMenuItem(this)'" +
			(webfxMenu_config["useHover"] ? " onmouseout='webFXMenuHandler.outMenuItem(this)'" : "") +
			(this.subMenu ? " unselectable='on' tabindex='-1'" : "") +
			" >" +
			this.text + 
			"</a>";
};


function WebFXMenuSeparator() {
	this.id = webFXMenuHandler.getId();
	webFXMenuHandler.all[this.id] = this;
};
WebFXMenuSeparator.prototype.height = webfxMenu_config["separatorHeight"];
WebFXMenuSeparator.prototype.toString = function () {
	return	"<div" +
			" id='" + this.id + "'" +
			(webfxMenu_config["useHover"] ? 
			" onmouseover='webFXMenuHandler.overMenuItem(this)'" +
			" onmouseout='webFXMenuHandler.outMenuItem(this)'"
			:
			"") +
			"></div>"
};

function WebFXMenuBar() {
	this._parentConstructor = WebFXMenu;
	this._parentConstructor();
}
WebFXMenuBar.prototype = new WebFXMenu;
WebFXMenuBar.prototype.toString = function () {
	var str = "<div id='" + this.id + "' class='webfx-menu-bar'>";
	
	// loop through all menuButtons
	for (var i = 0; i < this._menuItems.length; i++)
		str += this._menuItems[i];
	
	str += "</div>";

	for (var i = 0; i < this._subMenus.length; i++)
		str += this._subMenus[i];
	
	return str;
};

function WebFXMenuButton(sText, sHref, sToolTip, oSubMenu) {
	this._parentConstructor = WebFXMenuItem;
	this._parentConstructor(sText, sHref, sToolTip, oSubMenu);
}
WebFXMenuButton.prototype = new WebFXMenuItem;
WebFXMenuButton.prototype.toString = function () {
	return	"<a" +
			" id='" + this.id + "'" +
			" href='" + this.href + "'" +
			(this.toolTip ? " title='" + this.toolTip + "'" : "") +
			(webfxMenu_config["useHover"] ?
				(" onmouseover='webFXMenuHandler.overMenuItem(this)'" +
				" onmouseout='webFXMenuHandler.outMenuItem(this)'") :
				(
					" onfocus='webFXMenuHandler.overMenuItem(this)'" +
					(this.subMenu ?
						" onblur='webFXMenuHandler.blurMenu(this)'" :
						""
					)
				)) +
			" >" +
			this.text + 
			"</a>";
};


/* Position functions */

function getInnerLeft(el) {
	if (el == null) return 0;
	if (ieBox && el == document.body || !ieBox && el == document.documentElement) return 0;
	return getLeft(el) + getBorderLeft(el);
}

function getLeft(el) {
	if (el == null) return 0;
	return el.offsetLeft + getInnerLeft(el.offsetParent);
}

function getInnerTop(el) {
	if (el == null) return 0;
	if (ieBox && el == document.body || !ieBox && el == document.documentElement) return 0;
	return getTop(el) + getBorderTop(el);
}

function getTop(el) {
	if (el == null) return 0;
	return el.offsetTop + getInnerTop(el.offsetParent);
}

function getBorderLeft(el) {
	return ie ?
		el.clientLeft :
		parseInt(window.getComputedStyle(el, null).getPropertyValue("border-left-width"));
}

function getBorderTop(el) {
	return ie ?
		el.clientTop :
		parseInt(window.getComputedStyle(el, null).getPropertyValue("border-top-width"));
}

function opera_getLeft(el) {
	if (el == null) return 0;
	return el.offsetLeft + opera_getLeft(el.offsetParent);
}

function opera_getTop(el) {
	if (el == null) return 0;
	return el.offsetTop + opera_getTop(el.offsetParent);
}

function getOuterRect(el) {
	return {
		left:	(opera ? opera_getLeft(el) : getLeft(el)),
		top:	(opera ? opera_getTop(el) : getTop(el)),
		width:	el.offsetWidth,
		height:	el.offsetHeight
	};
}

// mozilla bug! scrollbars not included in innerWidth/height
function getDocumentRect(el) {
	return {
		left:	0,
		top:	0,
		width:	(ie ?
					(ieBox ? document.body.clientWidth : document.documentElement.clientWidth) :
					window.innerWidth
				),
		height:	(ie ?
					(ieBox ? document.body.clientHeight : document.documentElement.clientHeight) :
					window.innerHeight
				)
	};
}

function getScrollPos(el) {
	return {
		left:	(ie ?
					(ieBox ? document.body.scrollLeft : document.documentElement.scrollLeft) :
					window.pageXOffset
				),
		top:	(ie ?
					(ieBox ? document.body.scrollTop : document.documentElement.scrollTop) :
					window.pageYOffset
				)
	};
}

/* end position functions */

WebFXMenu.prototype.position = function (relEl, sDir) {
	var dir = sDir;
	// find parent item rectangle, piRect
	var piRect;
	if (!relEl) {
		var pi = this.parentMenuItem;
		if (!this.parentMenuItem)
			return;
		
		relEl = document.getElementById(pi.id);
		if (dir == null)
			dir = pi instanceof WebFXMenuButton ? "vertical" : "horizontal";
		
		piRect = getOuterRect(relEl);
	}
	else if (relEl.left != null && relEl.top != null && relEl.width != null && relEl.height != null) {	// got a rect
		piRect = relEl;
	}
	else
		piRect = getOuterRect(relEl);
	
	var menuEl = document.getElementById(this.id);
	var menuRect = getOuterRect(menuEl);
	var docRect = getDocumentRect();
	var scrollPos = getScrollPos();
	var pMenu = this.parentMenu;
	
	if (dir == "vertical") {
		if (piRect.left + menuRect.width - scrollPos.left <= docRect.width)
			this.left = piRect.left;
		else if (docRect.width >= menuRect.width)
			this.left = docRect.width + scrollPos.left - menuRect.width;
		else
			this.left = scrollPos.left;
			
		if (piRect.top + piRect.height + menuRect.height <= docRect.height + scrollPos.top)
			this.top = piRect.top + piRect.height;
		else if (piRect.top - menuRect.height >= scrollPos.top)
			this.top = piRect.top - menuRect.height;
		else if (docRect.height >= menuRect.height)
			this.top = docRect.height + scrollPos.top - menuRect.height;
		else
			this.top = scrollPos.top;
	}
	else {
		if (piRect.top + menuRect.height - this.borderTop - this.paddingTop <= docRect.height + scrollPos.top)
			this.top = piRect.top - this.borderTop - this.paddingTop;
		else if (piRect.top + piRect.height - menuRect.height + this.borderTop + this.paddingTop >= 0)
			this.top = piRect.top + piRect.height - menuRect.height + this.borderBottom + this.paddingBottom + this.shadowBottom;
		else if (docRect.height >= menuRect.height)
			this.top = docRect.height + scrollPos.top - menuRect.height;
		else
			this.top = scrollPos.top;

		var pMenuPaddingLeft = pMenu ? pMenu.paddingLeft : 0;
		var pMenuBorderLeft = pMenu ? pMenu.borderLeft : 0;
		var pMenuPaddingRight = pMenu ? pMenu.paddingRight : 0;
		var pMenuBorderRight = pMenu ? pMenu.borderRight : 0;
		
		if (piRect.left + piRect.width + menuRect.width + pMenuPaddingRight +
			pMenuBorderRight - this.borderLeft + this.shadowRight <= docRect.width + scrollPos.left)
			this.left = piRect.left + piRect.width + pMenuPaddingRight + pMenuBorderRight - this.borderLeft;
		else if (piRect.left - menuRect.width - pMenuPaddingLeft - pMenuBorderLeft + this.borderRight + this.shadowRight >= 0)
			this.left = piRect.left - menuRect.width - pMenuPaddingLeft - pMenuBorderLeft + this.borderRight + this.shadowRight;
		else if (docRect.width >= menuRect.width)
			this.left = docRect.width  + scrollPos.left - menuRect.width;
		else
			this.left = scrollPos.left;
	}
};

/** cssexpr begin  */
function constExpression(x) {
	return x;
}

function simplifyCSSExpression() {
	try {
		var ss,sl, rs, rl;
		ss = document.styleSheets;
		sl = ss.length
	
		for (var i = 0; i < sl; i++) {
			simplifyCSSBlock(ss[i]);
		}
	}
	catch (exc) {
		alert("Got an error while processing css. The page should still work but might be a bit slower");
		throw exc;
	}
}

function simplifyCSSBlock(ss) {
	var rs, rl;
	
	for (var i = 0; i < ss.imports.length; i++)
		simplifyCSSBlock(ss.imports[i]);
	
	if (ss.cssText.indexOf("expression(constExpression(") == -1)
		return;

	rs = ss.rules;
	rl = rs.length;
	for (var j = 0; j < rl; j++)
		simplifyCSSRule(rs[j]);
	
}

function simplifyCSSRule(r) {
	var str = r.style.cssText;
	var str2 = str;
	var lastStr;
	do {
		lastStr = str2;
		str2 = simplifyCSSRuleHelper(lastStr);
	} while (str2 != lastStr)

	if (str2 != str)
		r.style.cssText = str2;
}

function simplifyCSSRuleHelper(str) {
	var i, i2;
	i = str.indexOf("expression(constExpression(");
	if (i == -1) return str;
	i2 = str.indexOf("))", i);
	var hd = str.substring(0, i);
	var tl = str.substring(i2 + 2);
	var exp = str.substring(i + 27, i2);
	var val = eval(exp)
	return hd + val + tl;
}

if (/msie/i.test(navigator.userAgent) && window.attachEvent != null) {
	window.attachEvent("onload", function () {
		simplifyCSSExpression();
	});
}

/** cssexpr begin  */


//�Զ���Ĳ˵���
//menu_items    �˵������飬ÿ���˵���������������ţ����Σ���ʾ�������ӵ�ַ����ʾ��Ϣ
function GBPMenu(menu_items){
    
    this.menu_items = menu_items;
        
    //�õ��¼��˵����Ϊ�˵�����ֱ࣬�ӵݹ�����
    this.getSubMenu = function(code,level){
        var submenu = new WebFXMenu;
        var hasSubmenu = 0;
        
        for(var i=0;i < this.menu_items.length;i++){
            if(this.menu_items[i][1]==level+1 && this.menu_items[i][0].indexOf(code) == 0){
                if(this.menu_items[i][2] == ""){//������Ϊ�գ��������ӷָ���
                    submenu.add(new WebFXMenuSeparator());
                }else{
                    submenu.add(new WebFXMenuItem(this.menu_items[i][2],
                                        this.menu_items[i][3],
                                        this.menu_items[i][4],
                                        this.getSubMenu(this.menu_items[i][0],level+1))
                                );
                }
                if(!hasSubmenu) hasSubmenu = 1;
            }
        }
        if(hasSubmenu){ //������¼��˵����ŷ��ء����򷵻ؿ�
            return submenu;
        }        
    };
    
    //����˵�
    this.make = function(doc) {
        var myBar = new WebFXMenuBar; 
	    for(var i=0; i < this.menu_items.length; i++){
            if(this.menu_items[i][1] == 1){
                myBar.add(new WebFXMenuButton(this.menu_items[i][2], 
                                    this.menu_items[i][3], 
                                    this.menu_items[i][4],
                                    this.getSubMenu(this.menu_items[i][0],1))
                  );
            }
        }
        document.write(myBar);
    };
}