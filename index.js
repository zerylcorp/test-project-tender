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
  return data;
}

async function getAllByCommodity(commodity){
  const data = await store.read("list", {
    search: {
      komoditas: commodity.toUpperCase()
    }
  });
  return data;
}

async function getByArea(province, kota = null){
  const searchObj = {};
  searchObj.area_provinsi = province.toUpperCase()

  if(kota !== null){
    searchObj.area_kota = kota
  }

  const data = await store.read("list", {
    search: searchObj
  });
  return data;
}

async function getById(id){
  const data = await store.read("list", {
    search: {
      uuid: id
    }
  });

  if(data && data.length > 0){
    return data[0]
  }
  return null

}

async function addRecords(listData){
  const result = await store.append('list', listData)
  return result;
}

async function updateRecords(id, newValues){
  const result = await store.edit('list', {
    search: { uuid: id },
    set: newValues
  })
  return result
}

async function deleteRecords (id){
  const result = await store.delete('list', {
    search: { uuid: id }
  })
  return result;
}
