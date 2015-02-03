/* Copyright 2000-2008 Juniper Networks, Inc. All rights reserved.

   Warning: This computer program is protected by patent, copyright law
   and international treaties. Unauthorized reproduction or distribution
   of this program, or any portion of it, may result in severe civil and
   criminal penalties, and will be prosecuted to the maximum extent
   possible under the law.
*/
var timesessiontop;
var waitForLastAccessUpdate=0;
var xmlhttp=null;
determineTimeSessionTop();
function wait(millis) {
var date=new Date();
var curDate;
do {
curDate=new Date();
} while(curDate-date<millis);
}
function determineTimeSessionTop() 
{
if(typeof(top)!="unknown"&&
typeof(top)!="undefined"&&
typeof(top.DStimediff)!="undefined") 
{
timesessiontop=top;
}else {
if(typeof(window.opener)!="unknown"&&
window.opener&&
typeof(window.opener.top)!="undefined"&&
typeof(window.opener.top)!="unknown"&&
typeof(window.opener.top.DStimediff)!="undefined") 
{
timesessiontop=window.opener.top;
}else {
timesessiontop=window;
}
}
}
function getIVEHostnameV6()
{
if(location.hostname.indexOf(':')!=-1) {
if(location.hostname.match(/^\[.*\]/)) {
return location.hostname;
}else {
var v6host='['+location.hostname+']';
return v6host;
}
}
return location.hostname;
}
function getIVEHostname()
{
var r;
if(typeof(document.DSHost)!="undefined") r=document.DSHost;
else if(typeof(DSHost)!="undefined") r=DSHost;
if(typeof(r)!="undefined") {
var portstart=-1;
if(r.charAt(0)=='[') {
portstart=r.indexOf(':', r.indexOf(']')+1);
}else {
portstart=r.indexOf(':');
}
if(portstart!=-1) {
return r.substring(0, portstart);
}
return r;
}
return getIVEHostnameV6();
}
function getCookieVal (offset) {  
var endstr=document.cookie.indexOf (";", offset);
if(endstr==-1)    
endstr=document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}
function dsGetLastAccess() {
if(!xmlhttp) {
if(window.XMLHttpRequest) {
xmlhttp=new XMLHttpRequest();
}else {
var candidates=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
for(var a=0,c=candidates.length;a<c;a++) {
try{
xmlhttp= new ActiveXObject(candidates[a]);
if(xmlhttp) {
break;
}
} catch(d) {}
}
}
if(getIVEHostname().toUpperCase()!=(window.document.domain+"").toUpperCase()) {
xmlhttp=null;
} 
}
if(!xmlhttp) {
waitForLastAccessUpdate++;
var img=document.createElement("img");
img.src='https://'+getIVEHostname()+'/dana/home/norefr.cgi';
return;
}
xmlhttp.open("GET", "/dana/home/norefr.cgi", false);
xmlhttp.send();
return;
}
function dsgetCookieVal(arg) 
{
var alen=arg.length;
var clen=document.cookie.length;
var i=0;
while(i<clen) {    
var j=i+alen;
if(document.cookie.substring(i, j)==arg) {
return getCookieVal (j);
}
i=document.cookie.indexOf(" ", i)+1;
if(i==0) break;
}  
return null;
}
function dsCheckTimeout(timeout, access, timediff) 
{
wait (100);
var dc=document.cookie;
var prefix="DSID=";
var begin=dc.indexOf("; "+prefix);
var foundDSID=1;
var DSID;
if(begin==-1) {
begin=dc.indexOf(prefix);
if(begin==-1) {
foundDSID=0;
}
}else begin+=2;
if(foundDSID) {
var end=document.cookie.indexOf(";", begin);
if(end==-1) {
end=dc.length;
}
DSID=dc.substring(begin+prefix.length, end);
}
if(typeof(DSID)=="undefined") {
return 0;
}
var curdate=new Date();
var curtime=parseInt(""+curdate.getTime()/1000);
var offset= 30;
var curtimeout=curtime+timediff-access+offset;
if(curtimeout>=timeout) {
return 1;
}
else {
return 0;
}
}
function updateFirstAccess(){
var firstAccessCookieValue=dsgetCookieVal("DSFirstAccess=");
determineTimeSessionTop();
if(firstAccessCookieValue>timesessiontop.DSfirstAccess){
timesessiontop.DSfirstAccess=firstAccessCookieValue;
return true;
}
return false;
}
function getTimeoutString(appendSession){
var session_str=dsGetI18Msg("session")+"<br>";
var curdate=new Date();
var curtime=parseInt(""+curdate.getTime()/1000);
var curtimeout=curtime+timesessiontop.DStimediff-timesessiontop.DSfirstAccess;
var remainingTime=timesessiontop.DSmaxTimeout-curtimeout;
var days=0;
var hours=0;
var minutes=0;
var seconds=0;
if(remainingTime>0){
hours= Math.floor(remainingTime/3600);
var rem_seconds=remainingTime%3600;
minutes=Math.floor(rem_seconds/60);
seconds=Math.floor(rem_seconds%60);
if(hours>72) {
days=Math.floor(hours/24);
hours=hours % 24;
}
if((remainingTime % 30)==0) updateFirstAccess();
}else {
if(updateFirstAccess()){
if(appendSession){
return  session_str+getTimeoutString();
}else {
return  getTimeoutString();
}
}else {
if(appendSession){
return  session_str+"00:00:00";
}else {
return  "00:00:00";
}
}
}
if(hours<=9)
hours="0"+hours;
if(minutes<=9)
minutes="0"+minutes;
if(seconds<=9)
seconds="0"+seconds;
var myclock=hours+":"+minutes+":"+seconds;
if(days>0) {
myclock=days+"d "+myclock;
}
if(appendSession){
return session_str+myclock;
}else {
return myclock;
}
}
function showMaxSessionLimit_float(){
if(waitForLastAccessUpdate) {
if(waitForLastAccessUpdate<=5) {
waitForLastAccessUpdate++;
return;
}else {
waitForLastAccessUpdate=0;
}
}
var myclock=getTimeoutString(1);
var  dsbversion=parseInt(navigator.appVersion);
if(navigator.appName=="Netscape") {
if(dsbversion<=4) {
document.dsl0.document.liveclock.innerHTML=myclock;
}else {
if(document.getElementById&&(typeof(document.getElementById("dsl0"))!="undefined")){
var elements=document.getElementById("dsl0").getElementsByTagName("span");
elements["liveclock"].innerHTML=myclock;
}
}
}else {
if(document.all&&document.all.dsl0){
if(document.all.dsl0.document) {
document.all.dsl0.document.all.liveclock.innerHTML=myclock;
}else {
document.all.dsl0.all.liveclock.innerHTML=myclock;
}
}
}
}
function showMaxSessionLimit(elementId){
if(waitForLastAccessUpdate) {
if(waitForLastAccessUpdate<=5) {
waitForLastAccessUpdate++;
return;
}else {
waitForLastAccessUpdate=0;
}
}
var myclock=dsGetI18Msg("session")+"<br>"
myclock +="&nbsp;"
myclock+=getTimeoutString(0);
myclock +="&nbsp;"
var  dsbversion=parseInt(navigator.appVersion);
if(navigator.appName=="Netscape") {
if(dsbversion<=4) {
eval("document."+elementId+".innerHTML=myclock");
}else {
if(document.getElementById&&(typeof(document.getElementById(elementId))!="undefined")){
document.getElementById(elementId).innerHTML=myclock;
}
}
}else {
if(document.all){
eval("document.all."+elementId+".innerHTML=myclock");
}
}
}
function showMaxSessionExtendLimit(elementId){
if(waitForLastAccessUpdate) {
if(waitForLastAccessUpdate<=5) {
waitForLastAccessUpdate++;
return;
}else {
waitForLastAccessUpdate=0;
}
}
var myclock=dsGetI18Msg("extend")+"<br>"
myclock +="&nbsp;"
myclock+=getTimeoutString(0);
myclock +="&nbsp;"+"<br>"
myclock +=dsGetI18Msg("session");
var  dsbversion=parseInt(navigator.appVersion);
if(navigator.appName=="Netscape") {
if(dsbversion<=4) {
eval("document."+elementId+".innerHTML=myclock");
}else {
if(document.getElementById&&(typeof(document.getElementById(elementId))!="undefined")){
document.getElementById(elementId).innerHTML=myclock;
}
}
}else {
if(document.all){
eval("document.all."+elementId+".innerHTML=myclock");
}
}
}
function dsResetStatus()
{
if(typeof(self.status) !="undefined")
self.status="";
}
function dsGetI18Msg(id)
{
var lang="en";
if(typeof(DSLang)=="string") {
lang=DSLang;
lang=lang.replace(/-/g, "_");
}
if(!(lang=="en"||lang=="de"||lang=="fr"||lang=="ja"||lang=="zh"||lang=="zh_cn"||lang=="es"||lang=="ko")) lang="en";
var idle_msg1_en="Your session will expire in";
var idle_msg2_en="minute(s) due to inactivity.";
var idle_msg3_en="Please click [OK] to extend your session.";
var idle_msg4_en="Your session expired due to inactivity."
var max_msg1_en="Your session will expire in less than";
var max_msg2_en="minute(s) due to session length restrictions.";
var max_msg3_en="Your session expired due to session length restrictions.";
var max_msg4_en="Please click [OK] to login again.";
var session_en="Session";
var extend_en="Extend";
var idle_msg1_de="Ihre Sitzung l\u00E4uft in";
var idle_msg2_de="Minute(n) aufgrund von Inaktivit\u00E4t ab.";
var idle_msg3_de="Klicken Sie auf 'OK', um die Sitzung zu verl\u00E4ngern.";
var idle_msg4_de="Ihre Sitzung ist aufgrund von Inaktivit\u00E4t abgelaufen. Schlie\u00DFen Sie f\u00FCr erh\u00F6hte Sicherheit den Browser.";
var max_msg1_de="Ihre Sitzung l\u00E4uft in weniger als";
var max_msg2_de="Minute(n) aufgrund von Beschr\u00E4nkungen der Sitzungsdauer ab.";
var max_msg3_de="Ihre Sitzung ist aufgrund von Beschr\u00E4nkungen der Sitzungsdauer abgelaufen. Schlie\u00DFen Sie f\u00FCr erh\u00F6hte Sicherheit den Browser.";
var max_msg4_de="Klicken Sie auf 'OK', um sich wieder anzumelden.";
var session_de="Sitzung";
var extend_de="Verl\u00E4ngern";
var idle_msg1_fr="Votre session va expirer dans";
var idle_msg2_fr="minute(s) en raison de son inactivit\u00E9.";
var idle_msg3_fr="Cliquez sur [OK] pour prolonger votre session.";
var idle_msg4_fr="Votre session a expir\u00E9 en raison de son inactivit\u00E9. Pour une s\u00E9curit\u00E9 accrue, veuillez fermer votre navigateur.";
var max_msg1_fr="Votre session va expirer dans moins de";
var max_msg2_fr="minute(s) en raison de restrictions de dur\u00E9e de la session.";
var max_msg3_fr="Votre session a expir\u00E9 en raison de restrictions de dur\u00E9e de la session. Pour une s\u00E9curit\u00E9 accrue, veuillez fermer votre navigateur.";
var max_msg4_fr="Cliquez sur [OK] pour vous reconnecter.";
var session_fr="Session";
var extend_fr="Prolonger";
var idle_msg1_ja="\u4e00\u5b9a\u6642\u9593\u64cd\u4f5c\u3092\u3057\u306a\u304b\u3063\u305f\u305f\u3081\u3001\u3053\u306e\u30bb\u30c3\u30b7\u30e7\u30f3\u306f\u3001";
var idle_msg2_ja="\u5206\u5F8C\u306B\u7d42\u4e86\u3057\u307E\u3059";
var idle_msg3_ja="\u30bb\u30c3\u30b7\u30e7\u30f3\u3092\u5ef6\u9577\u3059\u308b\u306b\u306f\u3001\u005b\u004f\u004b\u005d\u0020\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
var idle_msg4_ja="\u4e00\u5b9a\u6642\u9593\u64cd\u4f5c\u3092\u3057\u306a\u304b\u3063\u305f\u305f\u3081\u3001\u30bb\u30c3\u30b7\u30e7\u30f3\u304c\u7d42\u4e86\u3057\u307e\u3057\u305f\u3002\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u5f37\u5316\u306e\u305f\u3081\u306b\u3001\u30d6\u30e9\u30a6\u30b6\u3092\u9589\u3058\u3066\u304f\u3060\u3055\u3044\u3002";
var max_msg1_ja="\u30bb\u30c3\u30b7\u30e7\u30f3\u9577\u5236\u9650\u306b\u3088\u308a\u3001\u3053\u306e\u30bb\u30c3\u30b7\u30e7\u30f3\u306f";
var max_msg2_ja="\u5206\u4ee5\u5185\u306b\u7d42\u4e86\u3057\u307e\u3059";
var max_msg3_ja="\u30bb\u30c3\u30b7\u30e7\u30f3\u6642\u9593\u5236\u9650\u306b\u3088\u308a\u3001\u30bb\u30c3\u30b7\u30e7\u30f3\u304c\u7d42\u4e86\u3057\u307e\u3057\u305f\u3002\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u5f37\u5316\u306e\u305f\u3081\u306b\u3001\u30d6\u30e9\u30a6\u30b6\u3092\u9589\u3058\u3066\u304f\u3060\u3055\u3044\u3002"
var max_msg4_ja="\u518d\u30ed\u30b0\u30a4\u30f3\u3059\u308b\u306b\u306f\u3001\u005b\u004f\u004b\u005d\u0020\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
var session_ja="\u30BB\u30C3\u30B7\u30E7\u30F3";
var extend_ja="\u9577\u5F15\u304B\u305B\u308B";
var idle_msg1_zh_cn="\u60a8\u7684\u4f1a\u8bdd\u5c06\u5728";
var idle_msg2_zh_cn="\u5206\u949f\u540e\u8fc7\u671f\uff08\u7531\u4e8e\u5b83\u5904\u4e8e\u975e\u6d3b\u52a8\u72b6\u6001\uff09\u3002";
var idle_msg3_zh_cn="\u8bf7\u5355\u51fb\u201c\u786e\u5b9a\u201d\u6765\u5ef6\u957f\u60a8\u7684\u4f1a\u8bdd\u65f6\u95f4\u3002";
var idle_msg4_zh_cn="\u7531\u4e8e\u5904\u4e8e\u975e\u6d3b\u52a8\u72b6\u6001\uff0c\u60a8\u7684\u4f1a\u8bdd\u5df2\u8fc7\u671f\u3002\u4e3a\u4e86\u63d0\u9ad8\u5b89\u5168\u6027\uff0c\u8bf7\u5173\u95ed\u60a8\u7684\u6d4f\u89c8\u5668\u3002";
var max_msg1_zh_cn="\u60a8\u7684\u4f1a\u8bdd\u5c06\u5728";
var max_msg2_zh_cn="\u5206\u949f\u540e\u8fc7\u671f\uff08\u7531\u4e8e\u4f1a\u8bdd\u7684\u957f\u5ea6\u9650\u5236\uff09\u3002";
var max_msg3_zh_cn="\u7531\u4e8e\u4f1a\u8bdd\u957f\u5ea6\u9650\u5236\uff0c\u60a8\u7684\u4f1a\u8bdd\u5df2\u8fc7\u671f\u3002\u4e3a\u4e86\u589e\u52a0\u5b89\u5168\u6027\uff0c\u8bf7\u5173\u95ed\u60a8\u7684\u6d4f\u89c8\u5668\u3002";
var max_msg4_zh_cn="\u8bf7\u5355\u51fb\u201c\u786e\u5b9a\u201d\u91cd\u65b0\u767b\u5f55\u3002";
var session_zh_cn="\u4F1A\u8BDD";
var extend_zh_cn="\u5EF6\u957F";
var idle_msg1_zh="\u60a8\u7684\u5de5\u4f5c\u968e\u6bb5\u5c07\u56e0\u7121\u6cd5\u4f5c\u7528\uff0c\u800c\u65bc";
var idle_msg2_zh="\u5206\u9418\u5167\u904e\u671f\u3002";
var idle_msg3_zh="\u8acb\u6309\u4e00\u4e0b\u0020\u005b\u78ba\u5b9a\u005d\u0020\u5ef6\u9577\u60a8\u7684\u5de5\u4f5c\u968e\u6bb5\u3002";
var idle_msg4_zh="\u60a8\u7684\u5de5\u4f5c\u968e\u6bb5\u5c07\u56e0\u7121\u6cd5\u4f5c\u7528\u800c\u904e\u671f\u3002\u70ba\u63d0\u9ad8\u5b89\u5168\u6027\uff0c\u8acb\u95dc\u9589\u700f\u89bd\u5668\u3002";
var max_msg1_zh="\u60a8\u7684\u5de5\u4f5c\u968e\u6bb5\u5c07\u904e\u671f\uff0c\u5728";
var max_msg2_zh="\u5206\u9418\u5167\u904e\u671f\u0020\u0028\u56e0\u5de5\u4f5c\u968e\u6bb5\u9577\u5ea6\u9650\u5236\u0029\u3002";
var max_msg3_zh="\u60a8\u7684\u5de5\u4f5c\u968e\u6bb5\u56e0\u5de5\u4f5c\u968e\u6bb5\u9577\u5ea6\u9650\u5236\u800c\u904e\u671f\u3002\u70ba\u63d0\u9ad8\u5b89\u5168\u6027\uff0c\u8acb\u95dc\u9589\u700f\u89bd\u5668\u3002";
var max_msg4_zh="\u8acb\u6309\u4e00\u4e0b\u0020\u005b\u78ba\u5b9a\u005d\u0020\u518d\u6b21\u767b\u5165\u3002";
var session_zh="\u5DE5\u4F5C\u968E\u6BB5";
var extend_zh="\u5EF6\u9577";
var idle_msg1_es="La sesi\u00f3n caducar\u00e1 en";
var idle_msg2_es="minuto(s) por inactividad.";
var idle_msg3_es="Haga clic en [Aceptar] para ampliar la sesi\u00f3n.";
var idle_msg4_es="La sesi\u00f3n ha caducado por inactividad.  Para mayor seguridad, cierre su explorador.";
var max_msg1_es="La sesi\u00f3n caducar\u00e1 en menos de";
var max_msg2_es="minuto(s) por restricciones de longitud de sesiones.";
var max_msg3_es="La sesi\u00f3n ha caducado por restricciones de longitud de sesiones.  Para mayor seguridad, cierre su explorador.";
var max_msg4_es="Seleccione [Aceptar] para volver a iniciar sesi\u00f3n.";
var session_es="Sesi\u00F3n";
var extend_es="Prolongar";
var idle_msg1_ko="\uc138\uc158\uc740";
var idle_msg2_ko="\ubd84\u0020\ub3d9\uc548\u0020\uc0ac\uc6a9\ud558\uc9c0\u0020\uc54a\uc73c\uba74\u0020\ub9cc\ub8cc\ub429\ub2c8\ub2e4\u002e";
var idle_msg3_ko="\uc138\uc158\uc744\u0020\uc5f0\uc7a5\ud558\ub824\uba74\u0020\u005b\ud655\uc778\u005d\uc744\u0020\ub204\ub974\uc2ed\uc2dc\uc624\u002e";
var idle_msg4_ko="\ud65c\ub3d9\uc774\u0020\uc5c6\uc5b4\uc11c\u0020\uc138\uc158\uc774\u0020\ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4\u002e\u0020\u0020\ubcf4\uc548\uc744\u0020\uac15\ud654\ud558\uae30\u0020\uc704\ud558\uc5ec\u002c\u0020\ube0c\ub77c\uc6b0\uc800\ub97c\u0020\ub2eb\uc544\u0020\uc8fc\uc2ed\uc2dc\uc624\u002e";
var max_msg1_ko="\uc138\uc158\u0020\uae38\uc774\u0020\uc81c\ud55c\uc73c\ub85c\u0020\uc778\ud574\u0020\uc138\uc158\uc774";
var max_msg2_ko="\ubd84\u0020\ud6c4\uc5d0\u0020\ub9cc\ub8cc\ub429\ub2c8\ub2e4\u002e";
var max_msg3_ko="\uc138\uc158\u0020\uae38\uc774\u0020\uc81c\ud55c\uc73c\ub85c\u0020\uc778\ud574\u0020\uc138\uc158\uc774\u0020\ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4\u002e\u0020\u0020\ubcf4\uc548\uc744\u0020\uac15\ud654\ud558\uae30\u0020\uc704\ud558\uc5ec\u002c\u0020\ube0c\ub77c\uc6b0\uc800\ub97c\u0020\ub2eb\uc544\u0020\uc8fc\uc2ed\uc2dc\uc624\u002e";
var max_msg4_ko="\u005b\ud655\uc778\u005d\uc744\u0020\ub20c\ub7ec\u0020\ub2e4\uc2dc\u0020\ub85c\uadf8\uc778\ud574\u0020\uc8fc\uc2ed\uc2dc\uc624\u002e";
var session_ko="\uC138\uC158";
var extend_ko="\uC5F0\uC7A5";
var r;
eval("r="+id+"_"+lang);
return r;
}
var dsSessionTimeoutReLoginWindow;
var tAboutToExpireID, tExpiredID, tNoRefrID;
var dsFirstAccess=0;
var g_dsLastAccess=0;
function dsConfirmIdleTimeout(reminder, timeoutRelogin)  
{
var msg;
var statusmsg;
if(reminder) { 
msg=dsGetI18Msg("idle_msg1")+" "+reminder/60+" "+dsGetI18Msg("idle_msg2")+" "+dsGetI18Msg("idle_msg3");
statusmsg=dsGetI18Msg("idle_msg1")+" "+reminder/60+" "+dsGetI18Msg("idle_msg2");
}
else {
msg=dsGetI18Msg("idle_msg4");
if(timeoutRelogin) {
msg+=" "+dsGetI18Msg("max_msg4");
}
statusmsg=dsGetI18Msg("idle_msg4");
}
if(typeof(self.status) !="undefined")
self.status=statusmsg;
parent.setTimeout("dsResetStatus();", 10000);
self.focus();
return (confirm(msg));
} 
function dsConfirmMaxTimeout(reminder, timeoutRelogin)  
{
var msg;
var statusmsg;
if(reminder){ 
msg=dsGetI18Msg("max_msg1")+" "+reminder/60+" "+dsGetI18Msg("max_msg2");
if(timeoutRelogin) {
msg+=" "+dsGetI18Msg("max_msg4");
}
statusmsg=dsGetI18Msg("max_msg1")+" "+reminder/60+" "+dsGetI18Msg("max_msg2");
}
else {
msg=dsGetI18Msg("max_msg3");
if(timeoutRelogin) {
msg+=" "+dsGetI18Msg("max_msg4");
}
statusmsg=dsGetI18Msg("max_msg3");
}
if(typeof(self.status) !="undefined")
self.status=statusmsg;
setTimeout("dsResetStatus();", 10000);
self.focus();
return (confirm(msg));
}
function dsSetTimers(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin, fromJs, leaveIdleExpiredTimer) 
{
if(top.opener!=null&&top.name=="dsSessionTimeoutReLoginWindow") {
top.opener._dsstw=0;
top.opener.dsFirstAccess=0;
top.opener.g_dsLastAccess=0;
top.opener.dsClearTimers();
top.opener.dsSetTimers(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin, 1);
top.close();
return;
}
var lastCheck=5;
if(typeof(document)!="object")return;
document.expando=true;
if(typeof(top)!="object") top=window;
if((!top._dsstw||top._dsstw ==0)||(typeof(fromJs)!="undefined")){
top._dsstw=1;
var curdate=new Date();
if(!dsFirstAccess) {
dsFirstAccess=firstAccess;
}
var curtime=parseInt(""+curdate.getTime()/1000)+timediff-dsFirstAccess;
var o=top;
o.dsSessionTimeoutReLoginWindow=null;
o.dsClearTimers(leaveIdleExpiredTimer);
var idleTimeoutReminder=timeout-reminder;
var maxTimeoutReminder=maxtimeout-reminder;
if((typeof(fromJs)=="undefined"||fromJs==1)) {
if(curtime+idleTimeoutReminder<=maxTimeoutReminder) {
if(typeof(leaveIdleExpiredTimer)=="undefined") {
o.tNoRefrID=o.parent.setTimeout("dsGetLastAccess()", (idleTimeoutReminder-lastCheck)*1000);
o.tAboutToExpireID=o.parent.setTimeout("dsSessionAboutToExpire(" +
firstAccess+","+lastAccess+"," +
timeout +","+maxtimeout+","+reminder+","+timediff+","+timeoutRelogin+")", 
idleTimeoutReminder*1000);
}
}else {
var t=maxTimeoutReminder-curtime;
if(t>0) {
if(t-lastCheck>0) o.tNoRefrID=o.parent.setTimeout("dsGetLastAccess()", (t-lastCheck)*1000);
o.tAboutToExpireID=o.parent.setTimeout("dsSessionAboutToExpire(" +
firstAccess+","+lastAccess+"," +
timeout +","+maxtimeout+","+reminder+","+timediff+","+timeoutRelogin+")", 
t*1000);
}
}
}
if(typeof(leaveIdleExpiredTimer)!="undefined") {
return;
}
if(curtime+timeout<maxtimeout) {
o.tNoRefrID=o.parent.setTimeout("dsGetLastAccess()", (timeout-lastCheck)*1000);
o.tExpiredID=o.parent.setTimeout("dsSessionExpired(" +
firstAccess+","+lastAccess+"," +
timeout +","+maxtimeout+","+reminder+","+timediff+","+timeoutRelogin+")", 
timeout*1000);
}else {
var t=maxtimeout-curtime;
if(t>0) {
if(t-lastCheck>0) o.tNoRefrID=o.parent.setTimeout("dsGetLastAccess()", (t-lastCheck)*1000);
o.tExpiredID=o.parent.setTimeout("dsSessionExpired(" +
firstAccess+","+lastAccess+"," +
timeout +","+maxtimeout+","+reminder+","+timediff+","+timeoutRelogin+")", 
t*1000);
}
}
}
}
function dsClearTimers(leaveIdleExpiredTimer)
{
if(typeof(tNoRefrID)!="undefined") tNoRefrID=clearTimeout(tNoRefrID);
if(typeof(tAboutToExpireID)!="undefined") tAboutToExpireID=clearTimeout(tAboutToExpireID);
if(typeof(leaveIdleExpiredTimer)=="undefined") {
if(typeof(tExpiredID)!="undefined") tExpiredID=clearTimeout(tExpiredID);
}
}
function dsCheckMaxSessionTimeout(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin) 
{
var timedout=0;
var firstAccessCookieValue=dsgetCookieVal("DSFirstAccess=");
updateFirstAccess();
if(top.DSfirstAccess>firstAccess){
firstAccess=top.DSfirstAccess;
}
if(dsCheckTimeout(maxtimeout, firstAccess, timediff) ) {
dsClearTimers();
if(dsConfirmMaxTimeout(0, timeoutRelogin)&&timeoutRelogin==1) {
if(dsSessionTimeoutReLoginWindow==null) {
var url='https://'+getIVEHostname()+"/dana-na/auth/welcome.cgi";
dsSessionTimeoutReLoginWindow=top.open(url, "dsSessionTimeoutReLoginWindow", "toobar=no,location=yes,directories=no,status=1,menubar=no,scrollbars=1,resizable=1,width=640,height=480");
}else {
dsSessionTimeoutReLoginWindow.focus();
}
}
timedout=2;
}else if(dsCheckTimeout(maxtimeout-reminder, firstAccess, timediff)) {
if(dsConfirmMaxTimeout(reminder, timeoutRelogin)&&timeoutRelogin==1) {
if(dsSessionTimeoutReLoginWindow==null) {
var url='https://'+getIVEHostname()+"/dana-na/auth/welcome.cgi";
dsSessionTimeoutReLoginWindow=top.open(url, "dsSessionTimeoutReLoginWindow", "toobar=no,location=yes,directories=no,status=1,menubar=no,scrollbars=1,resizable=1,width=640,height=480");
}else {
dsSessionTimeoutReLoginWindow.focus();
}
}
timedout=1;
}
return timedout;
}
function dsSessionAboutToExpire(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin) 
{
if(typeof(lastAccess)!="undefined"&&lastAccess!=null ) { 
var dslastaccess=dsgetCookieVal("DSLastAccess=");
if(dslastaccess>g_dsLastAccess){
g_dsLastAccess=dslastaccess;
} 
if(dslastaccess!=null&&lastAccess<dslastaccess) { 
lastAccess=dslastaccess;
}
var t=dsCheckMaxSessionTimeout(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin);
if(!t) {
if(dsCheckTimeout(timeout-reminder, lastAccess, timediff)) {
if(dsConfirmIdleTimeout(reminder, timeoutRelogin)){ 
if(!dsCheckMaxSessionTimeout(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin)) {
var dslastaccess2=dsgetCookieVal("DSLastAccess=");
if(dslastaccess2>g_dsLastAccess){
g_dsLastAccess=dslastaccess2;
} 
if(dslastaccess2==dslastaccess) { 
var img=new Image();
img.src='https://'+getIVEHostname()+"/dana/home/space.gif";
if(typeof(self.status) !="undefined")
self.status="Your session has been extended...";
}
dsSetTimers(firstAccess, dslastaccess2, timeout, maxtimeout, reminder, timediff, timeoutRelogin, 1);
}
}else {
dsSetTimers(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin, 1, 1);
}
}else {
dsSetTimers(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin, 1, 1);
}
}else if(t!=2) {
dsSetTimers(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin, 1, 1);
}
}
}
function dsSessionExpired(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin) 
{
var url='https://'+getIVEHostname()+"/dana/home/starter.cgi";
var dslastaccess=dsgetCookieVal("DSLastAccess=");
if(dslastaccess>g_dsLastAccess){
g_dsLastAccess=dslastaccess;
} 
if(dslastaccess!=null&&lastAccess<dslastaccess) { 
lastAccess= dslastaccess;
}
if(dsCheckTimeout(timeout, lastAccess, timediff)) {
dsClearTimers();
if(dsConfirmIdleTimeout(0, timeoutRelogin)&&timeoutRelogin==1){ 
if(dsSessionTimeoutReLoginWindow==null) {
var url='https://'+getIVEHostname()+"/dana-na/auth/welcome.cgi?p=timed-out";
dsSessionTimeoutReLoginWindow=top.open(url, "dsSessionTimeoutReLoginWindow", "toobar=no,location=yes,directories=no,status=1,menubar=no,scrollbars=1,resizable=1,width=640,height=480");
}else {
dsSessionTimeoutReLoginWindow.focus();
}
}
return;
}else {
var t=dsCheckMaxSessionTimeout(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin);
if(!t) {
dsSetTimers(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin, 1);
}else if(t!=2) dsSetTimers(firstAccess, lastAccess, timeout, maxtimeout, reminder, timediff, timeoutRelogin, 2);
}
}
