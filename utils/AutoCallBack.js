import _ from lodash;


export const AutoCallBack = {
  
  sleep : function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  
  retryCall: async (asyncFunc, count = 3) => {
    try {
      let res = await asyncFunc();
      const errors = _.isEmpty(res);
  
      if (errors) {
        if (count === 0) return res;
        await sleep(500);
        return await retryCall(asyncFunc, count - 1);
      }
      if (!errors) {
        return res;
      }
    } catch (err) {
      if (count === 0) throw err;
      await sleep(500);
      return await retryCall(asyncFunc, count - 1);
    }
  }
} 


export default AutoCallBack;