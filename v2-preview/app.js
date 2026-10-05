
const STORAGE_KEY="lkStickwerkV2PreviewOrders";
const CURRENT_VERSION={name:"2.0.0-preview",code:20000};
const WIX_CLIENT_ID="9c36e31a-ac19-41cb-a6e0-edd7eb9768cb";
const WIX_COLLECTION_ID="LKOrders";

function loadOrders(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}
  catch{return[]}
}
function saveOrders(orders){localStorage.setItem(STORAGE_KEY,JSON.stringify(orders))}
function makeId(){return "LK-"+new Date().getFullYear()+"-"+Math.floor(100000+Math.random()*900000)}
function nowIso(){return new Date().toISOString()}

async function getVisitorToken(){
  const r=await fetch("https://www.wixapis.com/oauth2/token",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({clientId:WIX_CLIENT_ID,grantType:"anonymous"})
  });
  if(!r.ok) throw new Error("Nie udało się uzyskać bezpiecznego połączenia z serwerem.");
  const data=await r.json();
  if(!data.access_token) throw new Error("Serwer nie zwrócił tokenu dostępu.");
  return data.access_token;
}

async function submitOnlineOrder(order){
  const token=await getVisitorToken();
  const item={
    orderId:order.id,
    status:"NEW",
    company:order.customer.company||"",
    contactName:order.customer.displayName||"",
    email:order.customer.email||"",
    phone:order.customer.phone||"",
    textile:order.items?.[0]?.textileType||"",
    quantity:Number(order.items?.[0]?.quantity||1),
    color:order.items?.[0]?.color||"",
    sizes:order.items?.[0]?.sizesText||"",
    placement:order.embroidery?.placement||"",
    dimensions:order.embroidery?.dimensionsText||"",
    notes:order.embroidery?.notes||"",
    logoUrl:"",
    source:"customer-portal",
    schemaVersion:1
  };
  const r=await fetch("https://www.wixapis.com/wix-data/v2/items",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },
    body:JSON.stringify({
      dataCollectionId:WIX_COLLECTION_ID,
      dataItem:{data:item}
    })
  });
  const body=await r.json().catch(()=>({}));
  if(!r.ok){
    const message=body?.message||body?.details?.applicationError?.description||"Nie udało się zapisać zamówienia online.";
    throw new Error(message);
  }
  return body.dataItem;
}

async function checkForUpdate(){
  const r=await fetch("manifest.json",{cache:"no-store"});
  if(!r.ok)throw new Error("Nie udało się pobrać informacji o wersji.");
  const remote=await r.json();
  return{
    current:CURRENT_VERSION,
    remote,
    available:Number(remote.versionCode||0)>CURRENT_VERSION.code,
    installable:Boolean(remote.apkUrl&&remote.sha256)
  }
}

window.LK={
  loadOrders,saveOrders,makeId,nowIso,checkForUpdate,submitOnlineOrder,
  CURRENT_VERSION,STORAGE_KEY
};
