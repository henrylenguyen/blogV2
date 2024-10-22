import http from "@/utils/http";

const repositoryAPI = {
  getAllSiteCollection: async () => {
    try {
      const res = await http.get('/sharepoint/get-all/site-collections')
      if (res.status === 200) {
        return res.data.data
      }
    } catch (error) {
      throw new Error(error as string);
      
    }
  }
}
export default repositoryAPI;