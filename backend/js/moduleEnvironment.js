var environment=(function () {
    var data={};

    function register_Public(key, value) {
       data[key]=value;
    }
  function remove_Public(key) {
       if(key in data){
           delete data[key];
       }
    }
  function get_Public(key) {
        if(data[key]=="undefined"){
            console.error("get_Public~>:"+key);
        }
        return data[key];
    }
  return{
        register:register_Public,
        remove:remove_Public,
        get:get_Public
    }
})();

