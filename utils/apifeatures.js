class ApiFeatures {
    constructor(method, query) {
        this.method = method;
        this.query = query;
    }

    search() {
        const condition = this.query.keyword ? {
            name: {
                $regex: this.query.keyword,
                $options: "i",
            },
        } : {};
        // console.log(condition)
        // console.log("Condition : "+JSON.stringify(condition))
        this.method.find({ ...condition })
        return this;
    }

    filter() {
        const queryCopy = { ...this.query }
        // console.log(queryCopy)
        //since query can have multiple keys like keyword,page,limit so we have to remove these keys except category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key])
        // console.log(queryCopy)
        let query = JSON.stringify(queryCopy);
        query = query.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`)
        // console.log(query);
        query = JSON.parse(query);
        // console.log(query);
        this.method.find(query);
        return this;
    }

    pagenation(productPerPage){
        const currentPage = this.query.page ?? 1;
        const skipProduct = (currentPage-1)*productPerPage;
        this.method.find().limit(productPerPage).skip(skipProduct);
        return this;
    }
};

module.exports = ApiFeatures;