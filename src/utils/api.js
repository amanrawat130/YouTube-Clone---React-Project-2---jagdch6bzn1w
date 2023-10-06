import axios from "axios";


const BASE_URL = "https://academics.newtonschool.co/api/v1/ott/show";


const options = {
    headers: {
        "projectId": "f104bi07c490"
    },
};

export const fetchDataFromApiById = async (id) => {
    console.log("Api first")
     
    let url = BASE_URL
    url += `?_id=${id}`;

    try {
        const { data } = await axios.get(url, options);
        console.log(url, "inside by id axios")
        return data;
    } catch (error) {
        console.log(url, "inside catch axios")
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const fetchDataFromApi = async (Category,userToken) => {
    console.log("Api first")

    console.log(Category)

    if(Category === "watch later"){
        return
    }
  
    let url = BASE_URL

    if (Category!=null) {
        let selectedCategory = Category.toLowerCase()
        console.log(selectedCategory,"sdfgewrgfrhgdfh")
        url += `?limit=100&filter={"type":"${selectedCategory}"}`;
    }else{
         url += `?limit=100`;
    }

    try {
        const { data } = await axios.get(url, options);
        return data;
    } catch (error) {
        console.log(url, "inside catch axios")
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

