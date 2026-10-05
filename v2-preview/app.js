
const STORAGE_KEY="lkStickwerkV2PreviewOrders";
const CURRENT_VERSION={name:"2.0.0-preview",code:20000};
function loadOrders(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch{return[]}}
function saveOrders(orders){localStorage.setItem(STORAGE_KEY,JSON.stringify(orders))}
function makeId(){return "LK-"+new Date().getFullYear()+"-"+Math.floor(1000+Math.random()*9000)}
function nowIso(){return new Date().toISOString()}
async function checkForUpdate(){const r=await fetch("manifest.json",{cache:"no-store"});if(!r.ok)throw new Error("Nie udało się pobrać informacji o wersji.");const remote=await r.json();return{current:CURRENT_VERSION,remote,available:Number(remote.versionCode||0)>CURRENT_VERSION.code,installable:Boolean(remote.apkUrl&&remote.sha256)}}
window.LK={loadOrders,saveOrders,makeId,nowIso,checkForUpdate,CURRENT_VERSION,STORAGE_KEY};
