const SteinStore = require("stein-js-client");
const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

async function getAllByRange(harga = null, size = null, tanggal = null){
  const searchObj = {};

  if(harga !== null){
    searchObj.price = harga.toString();
  }

  if(size !== null){
    searchObj.size = size.toString()
  }

  if(tanggal !== null){
    if(typeof tanggal === 'string'){
      searchObj.tgl_parsed = tanggal;
    }else if(tanggal instanceof Date){
      searchObj.tgl_parsed = tanggal.toISOString()
    }
  }

  const data = await store.read("list", {
    search: searchObj
  });
  console.log({ data });
  return data;
}

getAllByRange(90000,null, '2022-05-02T08:02:28Z')