/**
Ϊ��ť��ѡ�������id���ԡ���Ϊfirefoxֻ��ͨ��id��ÿؼ�������ͨ��name��
ZhengWangli 2006.10.5

����ѡ�����ࡣ��Ҫ���ܣ�
1> �ṩ���ַ����ͨ����״������״���ʱ��ѡ���ϼ����Զ����������¼���ѡ���¼����ϼ�Ĭ�ϰ�ѡ�У���������¼���ѡ�У����ϼ�ѡ��
2> �����û�Ϊ�ڵ㸽��������Ϣ��ͨ��getSelectedRows()�������Եõ��ڵ��ȫ����Ϣ
ZhengWangli 2006.3.30
*/
function GBPSelectList(items,size,useTreeStyle,showCode) {

    this.multiple       = true;     //�Ƿ������ѡ
    this.listSize        = size ? size : 20;        //ѡ���ĳ���
    this.treeStyle  = Boolean(useTreeStyle);     //�Ƿ�����״��ʽ��ʾ����
    this.showCode   = Boolean(showCode);     //�������״��ʽ���Ƿ���ʾ�����
    
    this.needOrder = true;	//�Ƿ���Ҫ���򡣣�ֻ����ͨ��ʽ�������ã���״ʱ��������
    
    this.itemList =  items;    //�������ѡ��Ԫ�ص�����

    this.leftSelect = null;     //��ߵ�ѡ���ؼ�
    this.rightSelect = null;    //�ұߵ�ѡ���ؼ�
    this.leftDiv    = null;     //��߷����б��Ĳ�
    this.rightDiv   = null;     //�ұ߷����б��Ĳ�
    this.leftDiv_innerHTML = ""; //���ѡ������ڲ�Ԫ�أ�
    this.rightDiv_innerHTML = ""; //�Ҳ�ѡ������ڲ�Ԫ��
    this.leftLabel = null;  //��ߵ����ֱ�ǩ�ؼ�
    this.rightLabel = null; //�ұߵ����ֱ�ǩ�ؼ�
    
    this.namespace = "gbp_sl_"; //�ؼ����Ƶ�ǰ׺
    this.leftDivName = "divAll"; //��߷����б��Ĳ������
    this.rightDivName = "divChecked"; //�ұ߷����б��Ĳ������
    this.leftSelectName = "sltAll"; //����б�������
    this.rightSelectName = "sltChecked";    //�ұ��б�������
    this.selectButton = "btnSelect";        //ѡ�а�ť������
    this.selectAllButton = "btnSelectAll";        //ѡ�����а�ť������
    this.cancelButton = "btnCancel";        //ȡ��ѡ��ť������
    this.cancelAllButton = "btnCancelAll";        //ȡ�����а�ť������
    
    this.o_children = [];
    this.root = this;
    this.nodes = {};    //������нڵ�
    var o_this = this;
    this.buildNode  = function(){ //�������ڵ�
        if(this.treeStyle){ 
            _build(o_this,0);
        }else{
            for(var i=0; i< this.itemList.length; i++){
                new GBP_SL_Item(o_this,this.itemList[i]);
            }
        }
    };
    
    function _build(father,level,start){ //֮����������ݹ麯���������������������Ϊ��Ч�ʿ���
        if(!start) start = 0
        for(var i=start; i< o_this.itemList.length; i++){
            curLevel = o_this.itemList[i][4];
            if(curLevel == (level+1)){
                var obj = new GBP_SL_Item(father,o_this.itemList[i]);
                _build(obj, curLevel, i + 1);
            }else if(curLevel <= level){
                 break;
            }
        }
    }
}

GBPSelectList.prototype.prepareData = function() { //�����ݽ���׼��������
    var list = new Array();
    var arrays = this.itemList;
    var _pre;
    
    function _sortByName(a,b){  //����ʾ������
        if(a[1] == b[1]) return 0
        return (a[1] > b[1]) ? 1 : -1;
    }
    function _sortByTreeCode(a,b){  //�����������
        if(a[3] == b[3]) return 0
        return (a[3] > b[3]) ? 1 : -1;
    }
    
    for(var n = 0; n < arrays.length; n++){
        var len = list.length;
        if((!this.treeStyle && arrays[n].length >= 2) || (this.treeStyle && arrays[n].length >= 5)){
            list[len] = arrays[n];
        }
    }

    if(this.treeStyle){
        list.sort(_sortByTreeCode);
    }else if(this.needOrder){
        list.sort(_sortByName);
    }
    this.itemList = list;
}

GBPSelectList.prototype.make = function() {    //�������������ʾ��ҳ����
    this.prepareData(); //����ʱ�ٵ������ݴ���
    
    var txt , obj;
    txt = "<table width='100%' height='100' border='0' align='center' cellpadding='0' cellspacing='0'>"
             + " <tr align='center'>"
             + "   <td valign='top' width='45%'><div align='left'>���п����б�</div><br>"
             + "     <div id='" + this.namespace + this.leftDivName + "'></div>"
             + "   </td>"
             + "   <td valign='middle' width='10%' >"
             + "     <input type='button' id='" + this.namespace + this.selectButton + "' name='" + this.namespace + this.selectButton + "' value='  >  '><br><br>"
             + "     <input type='button' id='" + this.namespace + this.selectAllButton + "' name='" + this.namespace + this.selectAllButton + "' value='  >> '><br><br>"
             + "     <input type='button' id='" + this.namespace + this.cancelButton + "' name='" + this.namespace + this.cancelButton + "' value='  <  '><br><br>"
             + "     <input type='button' id='" + this.namespace + this.cancelAllButton + "' name='" + this.namespace + this.cancelAllButton + "' value=' <<  '>"
             + "   </td>"
             + "   <td valign='top' width='45%'><div align='left'>��ѡ���б�</div><br>"
             + "     <div id='" + this.namespace + this.rightDivName + "' align='left'></div>"
             + "   </td>"
             + " </tr>"
             + "</table>" ;
    //container.innerHTML = txt;
    document.write(txt);

    var oThis = this; 
    this.leftDiv    = document.getElementById(this.namespace + this.leftDivName);
    this.rightDiv    = document.getElementById(this.namespace + this.rightDivName);

    obj = document.getElementById(this.namespace + this.selectButton);
    obj.onclick = function() { oThis.doSelect(1) };
    
    obj = document.getElementById(this.namespace + this.cancelButton);
    obj.onclick = function() { oThis.doSelect(-1) };
    
    obj = document.getElementById(this.namespace + this.selectAllButton);
    obj.onclick = function() { oThis.doAll(1) };
    
    obj = document.getElementById(this.namespace + this.cancelAllButton);
    obj.onclick = function() { oThis.doAll(-1) };

    this.buildNode();
    
    this.update();
};

GBPSelectList.prototype.update = function(){ //����selectԪ�صĽ�����ʾ
    //��innerHTML������selectԪ�أ����Լӿ��ٶȣ�������Ļ��˸
    
    //����Ԫ�ظ���ֵ
    this.rightDiv_innerHTML = "<select id='" + this.namespace + this.rightSelectName + "' name='" + this.namespace + this.rightSelectName + "' " + (this.multiple ? "multiple" : "") + " size='" + this.listSize + "' style='width:100%'>";
    this.leftDiv_innerHTML = "<select id='" + this.namespace + this.leftSelectName + "' name='" + this.namespace + this.leftSelectName + "' " + (this.multiple ? "multiple" : "") + " size='" + this.listSize + "' style='width:100%'>";

    //�����ӽڵ�״̬�������ӽڵ��״̬���ø��ڵ�״̬
    for(var i=0; i < this.o_children.length; i++){
        this.o_children[i].doStatus();
    }       
    for(var i=0; i < this.o_children.length; i++){
            this.o_children[i].update();
    }
    //ֱ����innerHTML���ٶ����
    this.leftDiv.innerHTML = this.leftDiv_innerHTML + "</select>";
    this.rightDiv.innerHTML = this.rightDiv_innerHTML + "</select>";
    
    //���»�ȡ����selectԪ�أ���Ϊ���˫���¼�
    var oThis = this;
    this.leftSelect = document.getElementById(this.namespace + this.leftSelectName);
    this.leftSelect.ondblclick = function() { oThis.doSelect(1) };
    
    this.rightSelect  = document.getElementById(this.namespace + this.rightSelectName);
    this.rightSelect .ondblclick = function() { oThis.doSelect(-1) };    
};

GBPSelectList.prototype.doSelect = function(isSelect) {  //ѡ��/ȡ��ѡ��
    var values = new Array();
    var obj = (isSelect == 1) ? this.leftSelect : this.rightSelect;    //�����ĸ�����
    if(this.multiple){
        for(var i=0;i < obj.options.length; i++){
            if(obj.options[i].selected){
                values[values.length] = obj.options[i].value;
            }
        }
    }else{
        if(obj.selectedIndex > -1){
            values[0] = obj[obj.selectedIndex].value;
        }
    }
        
    if( values.length == 0) return;
    for(var n=0;n < values.length; n++){
        this.nodes[values[n]].doSelect(isSelect);  
    }

    this.update()
};

GBPSelectList.prototype.doAll = function(isSelect) {  //ȫ��ѡ��/ȡ��
    for(var i=0; i < this.o_children.length; i++){
        this.o_children[i].doSelect(isSelect);
    }
    this.update()
};

GBPSelectList.prototype.getSelectedValues = function() {  //���ѡ�е�ֵ������
    var values = new Array();
    for(var n = 0; n < this.rightSelect.options.length; n++){
        values[n] = this.rightSelect.options[n].value;
    }
    return values;
};

GBPSelectList.prototype.getRows = function() {  //�鿴�Ҳ��¼����ϸ��Ϣ�����ص��Ǹ���ά����
    var values = new Array();
    for(var n = 0; n < this.rightSelect.options.length; n++){
        values[values.length] = this.root.nodes[this.rightSelect.options[n].value].info;
    }
    return values;
};

GBPSelectList.prototype.getSelectedRows = function() {  //�鿴ѡ�м�¼����ϸ��Ϣ�����ص��Ǹ���ά����
    var values = new Array();
    for(var n = 0; n < this.rightSelect.options.length; n++){
        if(this.rightSelect[n].selected) 
            values[values.length] = this.root.nodes[this.rightSelect.options[n].value].info;
    }
    return values;
};

function GBP_SL_Item(o_parent, o_item){ //�ڵ����
    this.father = o_parent;
    this.root   = o_parent.root;
    this.o_children = [];
    this.info = o_item;
    this.status = o_item[2] ?  1 : -1 ;
    this.level = this.root.treeStyle ? o_item[4] : 1;
    this.value = o_item[0];
    this.showText = o_item[1];
    if(this.root.showCode) this.showText = o_item[3] + " " + this.showText;
    if(this.level > 0) this.showText = "__________________".substr(0,(this.level-1)).replace(/_/g,"&nbsp;&nbsp;") + this.showText;
    
    o_parent.o_children[o_parent.o_children.length] = this;
    this.root.nodes[this.value] = this;

}

GBP_SL_Item.prototype.doSelect = function(isSelected){   //�ڵ��ѡ����
    this.status = isSelected;
    for(var i=0; i < this.o_children.length; i++){ //ѡ���ϼ����Զ�ѡ���������¼�
        this.o_children[i].doSelect(isSelected);
    }
};

GBP_SL_Item.prototype.doStatus = function(){ //����ڵ�״̬
    if(this.o_children.length == 0) return this.status;
    var len1=0,len2=0,len3=0;
    var s;
    for(var i = 0; i < this.o_children.length; i++){
        s = this.o_children[i].doStatus();
        if(s == 1) len1 +=1;
        if(s == 0) len2 +=1;
        if(s == -1) len3 +=1;
    }
    if(len1 > 0 && len3 == 0 && len2 == 0){
        this.status = 1;
    }else if(len3 > 0 && len1 == 0 && len2 == 0){
        this.status = -1;
    }else{
        this.status = 0;
    }
    return this.status;
};

GBP_SL_Item.prototype.update = function(){   //���½�����ʾ
    if(this.status == 1 || this.status == 0){
        this.root.rightDiv_innerHTML += "<option value='" + this.value + "'>" + this.showText + "</option>\n";
        //this.root.rightSelect.add (new Option(this.showText, this.value));
    }
    if(this.status == -1 || this.status == 0){
        this.root.leftDiv_innerHTML += "<option value='" + this.value + "'>" + this.showText + "</option>\n";
        //this.root.leftSelect.add (new Option(this.showText, this.value));
    }
    
    for(var i = 0; i < this.o_children.length; i++){
        this.o_children[i].update();
    }
};