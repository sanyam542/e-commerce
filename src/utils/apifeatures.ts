import Product from "@/models/productModel";


const search = (query:any, queryStr:any) => {
    const keyword = queryStr
      ? {
          name: {
            $regex: queryStr,
            $options: "i",
          },
        }
      : {};
  console.log(keyword);

  
    return  query.find({ ...keyword });
  };
  
  const filter = (query:any, queryStr:any) => {
    const queryCopy = { ...queryStr };
    // removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

// filter for price and rating
  

    let queryStrJSON = JSON.stringify(queryCopy);
    queryStrJSON = queryStrJSON.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
    return query.find(JSON.parse(queryStrJSON));
  };
  
  const pagination = (query:any, queryStr:any, resultPerPage:any) => {
    const currentPage = Number(queryStr.get("page")) || 1;
    const skip = resultPerPage * (currentPage - 1);
  

    return  query.find().limit(resultPerPage).skip(skip);
  };
  
  export { search, filter, pagination };
  