const urlDevelopment = "https://kvax.live/radio/";
const urlProduction = "";

const activeUrl = urlDevelopment;

const config = {
    //getActiveUrl: activeUrl
    getActiveConfigUrl: () =>{
      return activeUrl;
    }
};

export default config;
