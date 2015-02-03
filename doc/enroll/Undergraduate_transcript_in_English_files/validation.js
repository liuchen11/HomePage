//ȥ���ַ������ߵĿո�����ַ���Ϊnull,�򷵻�""
function trim(str){
    return rtrim(ltrim(str));
}

//ȥ���ַ�����ߵĿո�
function ltrim(s){
    if(s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j=0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1){
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}

//ȥ���ַ����ұߵĿո�
function rtrim(s){
    if(s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(str.length-1)) != -1){
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){
            i--;
        }
        str = str.substring(0, i+1);
    }
    return str;
}

//У���Ƿ�Ϊ��
function isEmpty (s) {
  if (s == null || trim(s) == "") return true;
  return false;
}

//У���Ƿ�Ϊ����
//sign - ���ҪУ��Ķ���Ϊ�գ����ظ�ֵ(����Ϊboolean��)��Ĭ��Ϊfalse
function isInt(s,sign) {
	if (isEmpty(s)) return (arguments.length == 2 && sign == true);
	var re = new RegExp("^-?\\d+$");
	return re.test(s);
}

//У���Ƿ�Ϊ������
//sign - ���ҪУ��Ķ���Ϊ�գ����ظ�ֵ(����Ϊboolean��)��Ĭ��Ϊfalse
function isFloat(s,sign) {
	if (isEmpty(s)) return (arguments.length == 2 && sign == true);
	var re = new RegExp("^-?\\d+\\.?\\d*$");
	return re.test(s);
}

//У���Ƿ�ȫ�����������
//sign - ���ҪУ��Ķ���Ϊ�գ����ظ�ֵ(����Ϊboolean��)��Ĭ��Ϊfalse
function isDigit(s,sign){
	if (isEmpty(s)) return (arguments.length == 2 && sign == true);
	var re = new RegExp("^-?\\d+\\.?$");
	return re.test(s);
}

//У���Ƿ�ȫ������ĸ�����֣��»������
//sign - ���ҪУ��Ķ���Ϊ�գ����ظ�ֵ(����Ϊboolean��)��Ĭ��Ϊfalse
function isChar(s,sign) {
	if (isEmpty(s)) return (arguments.length == 2 && sign == true);
	var re = new RegExp("^[A-Za-z0-9_]*$");
	return re.test(s);
}

//У���Ƿ�Ϊemail��ַ
//sign - ���ҪУ��Ķ���Ϊ�գ����ظ�ֵ(����Ϊboolean��)��Ĭ��Ϊfalse
function isEmail(s,sign) {
	if (isEmpty(s)) return (arguments.length == 2 && sign == true);
  var emailPat=/^(.+)@(.+)$/;
  var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
  var validChars="\[^\\s" + specialChars + "\]";
  var quotedUser="(\"[^\"]*\")";
  var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
  var atom=validChars + '+';
  var word="(" + atom + "|" + quotedUser + ")";
  var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
  var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
  var matchArray=s.match(emailPat);
  if (matchArray == null)  return false;
  var user=matchArray[1];
  var domain=matchArray[2];
  if (user.match(userPat) == null)   return false;
  var IPArray = domain.match(ipDomainPat);
  if (IPArray != null) {
    for (var i = 1; i <= 4; i++) {
      if (IPArray[i] > 255) return false;
    }
    return true;
  }
  var domainArray=domain.match(domainPat);
  if (domainArray == null)  return false;
  var atomPat=new RegExp(atom,"g");
  var domArr=domain.match(atomPat);
  var len=domArr.length;
  if ((domArr[domArr.length-1].length < 2) || (domArr[domArr.length-1].length > 3)) {
    return false;
  }
  if (len < 2) return false;
  return true;
}                     

//�ж�����ֵ�Ƿ����
//��������������Ϊ�����ͣ����ͻ򸡵��ͣ������򷵻�false
function isEqual(one,two){
	if (!isFloat(one) && !isFloat(two)) return false;
	var p1 = parseFloat(one);
	var p2 = parseFloat(two);
	return (p1 == p2);
}

//�жϵ�һ��ֵ�Ƿ���ڵڶ���ֵ����һ����Ҫ���Ƚϵ�ֵ���ڶ����ǲ�����
//��������������Ϊ�����ͣ����ͻ򸡵��ͣ������򷵻�false
function isGreaterThan(one,two){
	if (!isFloat(one) && !isFloat(two)) return false;
	var p1 = parseFloat(one);
	var p2 = parseFloat(two);
	return (p1 > p2);
}

//�жϵ�һ��ֵ�Ƿ���ڵڶ���ֵ����һ����Ҫ���Ƚϵ�ֵ���ڶ����ǲ�����
//��������������Ϊ�����ͣ����ͻ򸡵��ͣ������򷵻�false
function isGreaterEqual(one,two){
	if (!isFloat(one) && !isFloat(two)) return false;
	var p1 = parseFloat(one);
	var p2 = parseFloat(two);
	return (p1 >= p2);
}

//�����ַ����ĳ��ȣ�һ�������������ַ�
String.prototype.realLength = function()
{
  return this.replace(/[^\x00-\xff]/g,"**").length;
}

//���㳤��Ϊ8���ַ����Ƿ�������
function IsDate(DateString){
	var tempy=""; 
	var tempm=""; 
	var tempd=""; 
	
	tempy = DateString.substr(0,4);
  tempm = DateString.substr(4,2);
  tempd = DateString.substr(6,2);
	var tDateString = tempy + "/" +tempm + "/"+tempd+" 8:0:0";//�Ӱ�Сʱ����Ϊ���Ǵ��ڶ����� 
	var tDate = new Date(tDateString);
	
	//�ж��Ƿ�������ڸ�ʽ
	if(isNaN(tDate)){
		return true;	
	}
	var year = tDate.getUTCFullYear();
	var month = tDate.getMonth() + 1;
	var day = tDate.getDate();
	
	if(year == tempy && month == tempm && day == tempd){
		return false;
	}else{
		return true;
	}
}