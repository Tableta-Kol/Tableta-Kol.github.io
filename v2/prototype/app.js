
const STORAGE_KEY = "lkStickwerkV2Orders";
const CURRENT_VERSION = { name: "2.0.0-preview", code: 20000 };

function loadOrders(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveOrders(orders){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}
function makeId(){
  const y = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random()*9000);
  return `LK-${y}-${n}`;
}
function nowIso(){ return new Date().toISOString(); }

async function checkForUpdate(){
  const response = await fetch("../update/latest.json", { cache: "no-store" });
  if(!response.ok) throw new Error("Nie udało się pobrać informacji o wersji.");
  const remote = await response.json();
  return {
    current: CURRENT_VERSION,
    remote,
    available: Number(remote.versionCode || 0) > CURRENT_VERSION.code,
    installable: Boolean(remote.apkUrl && remote.sha256)
  };
}

window.LK = {
  loadOrders, saveOrders, makeId, nowIso, checkForUpdate,
  CURRENT_VERSION, STORAGE_KEY
};
