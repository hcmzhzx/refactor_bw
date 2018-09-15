class CheckForm {
   constructor(obj, error, callback) {
      this.defaultRule = {
         "*": /^[\w\W]+$/,
         "*6-16": /^[\w\W]{6,16}$/,
         "n": /^\d+$/,
         "m": /^1[3456789]\d{9}$/,
         "e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
         "qq": /^\d[1-9][0-9]{4,14}/,
         "cname": /^[\u4e00-\u9fa5]{2,4}$/,
         "idcard": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
         "card": /^\d{13,21}$/,
         "pwd": /^[^\s]{6,16}$/,
         "domain": /^[^\s]{3,6}$/,
         "code": /^\d{6}/
      };
      var inputs = obj.target.querySelectorAll('input,textarea,select'), posts = {}, data = {};
      for (var i = 0; i < inputs.length; i++) {
         var ele = inputs[i], value = ele.value, name = ele.getAttribute('name'), rule = ele.getAttribute('data-rule'), sync = ele.getAttribute('data-sync');
         // 是否开启验证
         if (sync) {
            // 判断是否属于下拉框
            if(inputs[i].localName == 'select'){
               var errmsg = ele.getAttribute('data-errmsg');
               if (value == '0' || value != '') {
                  return error(errmsg)
               } else {
                  posts[name] = value
               }
            } else {
               var ruleReg = this.defaultRule[rule], errmsg = ele.getAttribute('data-errmsg');
               if (!ruleReg.test(value)) {
                  ele.focus();
                  return error(errmsg)
               } else {
                  posts[name] = value
               }
            }
         } else {
            posts[name] = value
         }
      }
      // 过滤掉没有 name 的值
      for(let[key,val] of Object.entries(posts)){
         if(key != 'null'){
            data[key] = val;
         }
      }
      return callback(data)
   }
}

export {CheckForm};
